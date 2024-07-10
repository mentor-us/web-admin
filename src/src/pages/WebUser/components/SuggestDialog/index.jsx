/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line simple-import-sort/imports
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

import dayjs from "dayjs";

import CreateTaskDialog from "pages/WebUser/Group/ChatContainer/TextEditor/EditorToolbar/CreateTaskIconButton/CreateTaskDialog";
import { useGetChannelMembers } from "hooks/channels/queries";
import { AI_API_KEY } from "config";

function SuggestDialog(props) {
  const { open, onClose, content } = props;
  const { channelId } = useParams();
  const { data: channelMembers, isLoading: isLoadingMembers } = useGetChannelMembers(
    channelId || "",
    (members) => members ?? []
  );
  const [generatedContent, setGeneratedContent] = useState({});
  const [isSuggested, setIsSuggested] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentDate = dayjs().format("L LT");
  console.log("Current date", currentDate);
  const genAI = new GoogleGenerativeAI(AI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `Imagine you are an AI assistant, and you are helping summarize a task based on the sentence or paragraph you are given. The task should include a title, a description, the deadline (you can calculate based on current date ${currentDate}), and the people(the subject of the sentence) who are assigned for the task. For example:\nTwo months from now, Jackie must complete his graduation thesis\nTitle: Complete graduation thesis\nDescription: Prepare and finish all the works related to the final graduation thesis\nAssignee: Jackie\nDeadline: 2 months from now\n\nSummarize in Vietnamese with JSON string format and REMEMBER don't put the answer in markdown block: {"title": ExampleAbove, "description": ExampleAbove, "assignee": [ExampleName], "deadline": time and date ISO format}`,
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
      },
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
      }
    ],
    generationConfig: {
      maxOutputTokens: 100,
      topP: 0.98,
      temperature: 0.5
    }
  });
  const handleSuggest = async () => {
    setIsLoading(true);
    const result = await model.generateContent(content);
    const response = await result.response;
    console.log("RESPONSE", response.text());
    const stringData = JSON.parse(response.text());

    const fullNames = channelMembers?.map((member) => member.name);
    const assigneeFullname = [];
    for (const assigneeName of stringData.assignee) {
      for (const fullName of fullNames) {
        if (fullName.includes(assigneeName)) {
          assigneeFullname.push(fullName);
        }
      }
    }
    stringData.assignee = assigneeFullname;
    setGeneratedContent(stringData);

    setIsSuggested(true);
    setIsLoading(false);
  };
  const handleCreateTask = () => {
    setOpenTaskDialog(true);
  };
  const newDate = new Date(generatedContent.deadline).toLocaleString("vi-VN", {
    dateStyle: "short",
    timeStyle: "short"
  });

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle alignSelf="center">Hãy đề xuất tạo công việc!</DialogTitle>
        <DialogContent>
          <DialogContentText className="!mx-5">
            <div className="mb-3">
              <Typography variant="h7">{content}</Typography>
            </div>
            {/* {!isSuggested && <Button onClick={handleSuggest}>Đề xuất</Button>} */}
            <div className="flex justify-center items-end">
              {isLoading && <CircularProgress color="secondary" />}
            </div>
            {isSuggested && (
              <div className="mt-10">
                <Typography variant="h4">Công việc được đề xuất:</Typography>
                <div className="flex justify-start items-end">
                  <Typography variant="h5" className="!mr-2">
                    Tiêu đề:
                  </Typography>
                  <Typography variant="inherit">{generatedContent.title}</Typography>
                </div>
                <div className="flex justify-start items-end">
                  <Typography variant="h5" className="!mr-2">
                    Mô tả:
                  </Typography>
                  <Typography variant="inherit">{generatedContent.description}</Typography>
                </div>
                <div className="flex justify-start items-end">
                  <Typography variant="h5" className="!mr-2">
                    Người thực hiện:
                  </Typography>
                  <Typography variant="inherit">{generatedContent.assignee.join(", ")}</Typography>
                </div>
                <div className="flex justify-start items-end">
                  <Typography variant="h5" className="!mr-2">
                    Deadline:
                  </Typography>
                  <Typography variant="inherit">{newDate}</Typography>
                </div>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={onClose}>
            Hủy
          </Button>
          {!isSuggested ? (
            <Button onClick={handleSuggest}>Đề xuất</Button>
          ) : (
            <Button onClick={handleCreateTask}>Tạo công việc</Button>
          )}
        </DialogActions>
      </Dialog>
      {openTaskDialog && (
        <CreateTaskDialog
          open={openTaskDialog}
          handleClose={() => setOpenTaskDialog(false)}
          suggestedTask={generatedContent}
          onClose={() => {
            onClose();
          }}
        />
      )}
    </>
  );
}
SuggestDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired
};
export default SuggestDialog;
