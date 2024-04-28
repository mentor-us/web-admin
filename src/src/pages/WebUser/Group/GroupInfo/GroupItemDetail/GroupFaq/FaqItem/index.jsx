import React, { useState } from "react";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

import CreateFAQ from "pages/WebUser/Group/ChatContainer/TextEditor/EditorToolbar/CreateFAQ";

function FaqItem({ faq }) {
  const [openDialogTask, setOpenDialogTask] = useState(false);

  // Function to truncate long text with ellipsis
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <Box className="!px-2">
      <Box
        onClick={() => setOpenDialogTask(true)}
        className="w-full max-w-screen-md hover:shadow-lg border-2 border-gray-300 my-1 rounded-xl cursor-pointer"
      >
        <Box className=" px-2 py-2 rounded-r-md flex justify-between items-center">
          <Box className="flex items-center space-x-2">
            <Brightness1Icon className="mx-2" color="info" sx={{ width: "0.5rem" }} />
            <Tooltip title={faq.question}>
              <p className="text-black text-base overflow-hidden whitespace-nowrap overflow-ellipsis">
                {truncateText(faq.question, 24)} {/* Adjust `20` to your desired maximum length */}
              </p>
            </Tooltip>
          </Box>

          <Tooltip title="Cài đặt thêm">
            <MoreVertIcon
              fontSize="small"
              className="hover:shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </Tooltip>
        </Box>
      </Box>
      {openDialogTask && (
        <CreateFAQ
          open={openDialogTask}
          handleClose={() => setOpenDialogTask(false)}
          faqId={faq.id}
        />
      )}
    </Box>
  );
}

FaqItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  faq: PropTypes.object.isRequired
};

export default FaqItem;
