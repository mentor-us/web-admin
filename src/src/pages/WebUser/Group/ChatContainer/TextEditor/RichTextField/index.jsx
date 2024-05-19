import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { $generateNodesFromDOM } from "@lexical/html";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { AutoLinkPlugin, createLinkMatcherWithRegExp } from "@lexical/react/LexicalAutoLinkPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import LexicalClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useQueryClient } from "@tanstack/react-query";

import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  CLEAR_EDITOR_COMMAND,
  CLEAR_HISTORY_COMMAND
} from "lexical";
import { v4 as uuidv4 } from "uuid";

import SocketService from "service/socketService";
import { useMessageQueryState } from "hooks/channels/queries";
import { GetAllChatMessageInfinityKey } from "hooks/chats/keys";
import { useEditMessageMutation } from "hooks/chats/mutation";
import useChatStore from "hooks/client/useChatStore";
import useMyInfo from "hooks/useMyInfo";
import { MESSAGE_TYPE } from "utils/constants";

import EnterCommand from "./EnterCommand";
import ReplyMessage from "./ReplyMessage";
import SendButton from "./SendButton";
import "./styles.css";

const theme = {
  // Theme styling goes here
  link: "notwp editor-link"
};

const URL_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const MATCHERS = [
  createLinkMatcherWithRegExp(URL_REGEX, (text) => {
    return text;
  }),
  createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
    return `mailto:${text}`;
  })
];

function EditMessageListener() {
  const [editor] = useLexicalComposerContext();
  const chatStore = useChatStore();

  useEffect(() => {
    if (chatStore.isEditMessage) {
      editor.update(() => {
        // Clear the editor
        $getRoot().clear();
        const selection = $getSelection();
        if (selection) {
          const parser = new DOMParser();
          const dom = parser.parseFromString(chatStore?.editMessage?.content, "text/html");
          const nodes = $generateNodesFromDOM(editor, dom);
          const paragraphNode = $createParagraphNode();
          nodes.forEach((n) => paragraphNode.append(n));
          $getRoot().append(paragraphNode);
          $getRoot().selectEnd();
        }
      });
    }
  }, [chatStore?.isEditMessage, chatStore?.editMessage]);

  return null;
}

function RichTextField() {
  const { channelId } = useParams();
  const myInfo = useMyInfo();
  const { addNewestMessage, updateChannelState } = useMessageQueryState(channelId);
  const chatStore = useChatStore();
  const { mutateAsync: editMessageMutateAsync } = useEditMessageMutation();
  const queryClient = useQueryClient();

  const initialConfig = {
    namespace: "MyEditor",
    nodes: [ListNode, ListItemNode, LinkNode, AutoLinkNode],
    theme
  };
  const editorRef = useRef(null);

  const onSend = (html) => {
    const message = {
      id: uuidv4().toString(),
      content: html ?? "",
      groupId: channelId,
      senderId: myInfo.id,
      createdDate: new Date(),
      type: MESSAGE_TYPE.TEXT,
      reactions: [],
      totalReaction: {
        data: [],
        ownerReacted: [],
        total: 0
      },
      reply: chatStore?.replyMessage ? chatStore.replyMessage.id : null,
      sender: myInfo
    };

    // Send message
    SocketService.sendMessage(message);
    updateChannelState();

    // Clear the editor
    editorRef?.current?.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    editorRef?.current?.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);

    // Clear reply state if reply message
    if (chatStore.isReplyMessage) {
      message.reply = {
        senderName: chatStore?.replyMessage?.sender.name,
        content: chatStore?.replyMessage?.content
      };
      chatStore.clearReplyMessage();
    }

    addNewestMessage(message);
  };

  const onEditMessage = (html) => {
    if (!chatStore.isEditMessage) {
      return;
    }

    editMessageMutateAsync(
      {
        messageId: chatStore?.editMessage?.id,
        newContent: html
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: GetAllChatMessageInfinityKey(channelId)
          });
          chatStore.clearEditMessage();
        }
      }
    );
  };

  useEffect(() => {
    chatStore.setRichTextRef(editorRef);
  }, [editorRef]);

  useEffect(() => {
    chatStore.clearReplyMessage();
    chatStore.clearEditMessage();
    editorRef?.current?.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
  }, [channelId]);

  return (
    <div className="editor-container-parent">
      {chatStore.isReplyMessage && <ReplyMessage message={chatStore.replyMessage} />}
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container">
          <div className="notwp editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-content-editable" />}
              placeholder={<div className="editor-placeholder">Soạn tin nhắn</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <LinkPlugin />
            <ListPlugin />
            <CheckListPlugin />
            <AutoLinkPlugin matchers={MATCHERS} />
            <LexicalClickableLinkPlugin />
            <ClearEditorPlugin />
            <AutoFocusPlugin />
            <EditorRefPlugin editorRef={editorRef} />
            <EnterCommand onEnter={chatStore.isEditMessage ? onEditMessage : onSend} />
            <EditMessageListener />
          </div>
          <SendButton onSend={chatStore.isEditMessage ? onEditMessage : onSend} />
        </div>
      </LexicalComposer>
    </div>
  );
}

RichTextField.propTypes = {};

export default RichTextField;
