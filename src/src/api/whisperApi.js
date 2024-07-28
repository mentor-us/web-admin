import { WHISPER_API_URL } from "config";

import AxiosClient from "./AxiosClient";

const WhisperApi = {
  transcribeAudio: (audioFile) => {
    const formData = new FormData();
    formData.append("audio_file", audioFile);

    return AxiosClient.post(
      `${WHISPER_API_URL}/asr?encode=true&task=transcribe&language=vi&output=json`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  }
};

export default WhisperApi;
