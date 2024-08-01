import { WHISPER_API_URL } from "config";

import AxiosClient from "./AxiosClient";

const WhisperApi = {
  transcribeAudio: (audioFile) => {
    const formData = new FormData();
    formData.append("audio_file", audioFile);

    const searchParams = new URLSearchParams();
    searchParams.append("encode", true);
    searchParams.append("task", "transcribe");
    searchParams.append("language", "vi");
    searchParams.append("output", "json");

    return AxiosClient.post(`${WHISPER_API_URL}/asr?${searchParams.toString()}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
};

export default WhisperApi;
