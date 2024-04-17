import { API_URL } from "config";

const getBase64Image = async (res) => {
  try {
    // Check if image base64 string
    if ((typeof res === "string" || res instanceof String) && res.startsWith("data:image/")) {
      return res;
    }

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

    // Check if image base64 string
    if (key.startsWith("data:image/")) {
      return Promise.resolve(key);
    }

    // Check if simple https call
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
