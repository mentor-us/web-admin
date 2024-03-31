import { useEffect } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { CLEAR_EDITOR_COMMAND, COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND } from "lexical";

function EnterCommand({ onEnter = () => {} }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        const { shiftKey, key } = event;

        if (key === "Enter" && shiftKey === false) {
          event.preventDefault();

          const editorState = editor.getEditorState();

          editorState.read(() => {
            const htmlString = $generateHtmlFromNodes(editor);
            onEnter(htmlString);
          });

          editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
        }

        return true;
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor, onEnter]);

  return null;
}

export default EnterCommand;
