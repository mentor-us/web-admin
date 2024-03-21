/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { Box, TextField } from "@mui/material";
import JoditEditor from "jodit-react";
import PropTypes from "prop-types";

import "./styles.css";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }]
  }
];

function RichTextField() {
  const editor = useRef(null);
  const [content, setContent] = useState(null);
  const config = {
    readonly: false,
    preset: "inline",
    height: "auto",
    toolbarButtonSize: "small",
    // editorClassName: "!h-full !min-h-full",
    // className: "!h-full !min-h-full [&_.jodit-workplace]:!h-full [&_.jodit-workplace]:!min-h-full",
    toolbar: false,
    statusbarstatusbar: false,
    useSearch: false,
    enter: "DIV",
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    style: {
      font: "12px Arial",
      color: "#0c0c0c"
    },
    showPlaceholder: true,
    containerStyle: {
      // font: "12px Arial",
      // color: "#0c0c0c"
    },
    placeholder: "Soạn tin nhắn"
  };
  const handleUpdate = (event) => {
    const editorContent = event.target.innerHTML;
    setContent(editorContent);
  };

  return (
    <Box
      className="h-[58px] w-full max-w-full border-t px-4 my-2"
      display="flex"
      justifyContent="start"
      alignItems="center"
    >
      <JoditEditor
        className="wrap-block"
        ref={editor}
        value={content}
        config={config}
        // onBlur={handleUpdate}
        // onChange={(newContent) => {
        //   handleUpdate(newContent);
        // }}
      />
    </Box>
  );
}

RichTextField.propTypes = {};

export default RichTextField;
