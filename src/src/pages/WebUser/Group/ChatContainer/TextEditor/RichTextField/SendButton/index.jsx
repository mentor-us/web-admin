import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalIsTextContentEmpty } from "@lexical/react/useLexicalIsTextContentEmpty";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

import SendIcon from "components/Icons/SendIcon";

function SendButton({ onSend }) {
  const [editor] = useLexicalComposerContext();
  const isEmpty = useLexicalIsTextContentEmpty(editor);

  const onSendClick = () => {
    const editorState = editor.getEditorState();

    editorState.read(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      onSend(htmlString);
    });
  };

  return (
    <IconButton className="!w-[30px] !h-[30px] !p-1" onClick={isEmpty ? null : onSendClick}>
      <SendIcon focused={!isEmpty} />
    </IconButton>
  );
}

SendButton.propTypes = {
  onSend: PropTypes.func.isRequired
};

export default SendButton;
