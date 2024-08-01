import WhisperApi from "api/whisperApi";

const ErrorWrapper = (service) => {
  const wrappedService = {};

  Object.keys(service).forEach((method) => {
    wrappedService[method] = async (...args) => {
      try {
        return await service[method](...args);
      } catch (error) {
        console.error(`Error in service method ${method}:`, error);
        throw error; // Re-throw the error after logging it
      }
    };
  });

  return wrappedService;
};

const transcribeAudio = (audioFile) => WhisperApi.transcribeAudio(audioFile);

const whisperService = {
  transcribeAudio
};

export default ErrorWrapper(whisperService);
