import AxiosClient from "./AxiosClient";

const NOTE_URL = "/api/notes";

const NoteApi = {
  getNotes: () => AxiosClient.get(NOTE_URL),
  createNote: (req) => AxiosClient.post(NOTE_URL, req),
  getNoteUserList: (req) => AxiosClient.get(`${NOTE_URL}/users`, req)
};
export default NoteApi;
