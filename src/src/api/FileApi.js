import { API_URL } from "config";

const getBase64Image = async (res) => {
  try {
    const blob = await res.blob();

    return URL.createObjectURL(blob);
  } catch (e) {
    return null;
  }
};

const FileApi = {
  getFileWithKey(key) {
    return FileApi.fetchFileWithKey(key).then(getBase64Image);
  },

  fetchFileWithKey(key) {
    if (!key) {
      return Promise.resolve("");
    }

    if (key.startsWith("https")) {
      return fetch(key);
    }

    const searchParams = new URLSearchParams();
    searchParams.append("key", key);
    return fetch(`${API_URL}api/files?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    });
  }
};

export default FileApi;
