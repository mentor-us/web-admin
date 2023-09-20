import * as XLSX from "xlsx";

const readDataFromExcelToArray = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    const readedData = XLSX.read(data, { type: "binary" });
    const wsname = readedData.SheetNames[0];
    const ws = readedData.Sheets[wsname];

    return XLSX.utils.sheet_to_json(ws, { header: 1 });
  };
  reader.readAsBinaryString(file);
};

export default readDataFromExcelToArray;
