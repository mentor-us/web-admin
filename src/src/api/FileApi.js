import { API_URL } from "config";

const getBase64Image = async (res) => {
  const blob = await res.blob();

  // const reader = new FileReader();

  // await new Promise((resolve, reject) => {
  //   reader.onload = resolve;
  //   reader.onerror = reject;
  //   reader.readAsDataURL(blob);
  // });

  // return reader.result;
  return URL.createObjectURL(blob);
};

const FileApi = {
  getFileWithKey(key) {
    if (!key) {
      return "";
    }

    if (key.startsWith("https")) {
      return fetch(key).then(getBase64Image);
    }

    const searchParams = new URLSearchParams();
    searchParams.append("key", key);
    return fetch(`${API_URL}api/files?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    }).then(getBase64Image);
  }
};

export default FileApi;
