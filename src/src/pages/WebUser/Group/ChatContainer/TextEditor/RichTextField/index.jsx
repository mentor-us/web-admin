/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { AutoLinkPlugin, createLinkMatcherWithRegExp } from "@lexical/react/LexicalAutoLinkPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import LexicalClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

// import PropTypes from "prop-types";
import { CLEAR_EDITOR_COMMAND } from "lexical";
import { v4 as uuidv4 } from "uuid";

import SocketService from "service/socketService";
import { useMessageQueryState } from "hooks/channels/queries";
import useMyInfo from "hooks/useMyInfo";
import { MESSAGE_TYPE } from "utils/constants";

import EnterCommand from "./EnterCommand";
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

function RichTextField() {
  const { channelId } = useParams();
  const myInfo = useMyInfo();
  const { addNewestMessage, updateChannelState } = useMessageQueryState(channelId);

  const initialConfig = {
    namespace: "MyEditor",
    nodes: [ListNode, ListItemNode, LinkNode, AutoLinkNode],
    theme,
    onError: (error) => {
      console.error(error);
    }
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
      reply: null,
      sender: myInfo
    };

    // Send message
    SocketService.sendMessage(message);
    addNewestMessage(message);
    updateChannelState();

    // Clear the editor
    editorRef?.current?.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
  };

  return (
    <div>
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
            <EnterCommand onEnter={onSend} />
          </div>
          <SendButton onSend={onSend} />
        </div>
      </LexicalComposer>
    </div>
  );
}

RichTextField.propTypes = {};

export default RichTextField;
