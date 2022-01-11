import * as fs from "fs";
import * as path from "path";

const getData = (filePath: string) => {
  const data = fs.readFileSync(path.join(__dirname, filePath), "utf-8");

  return JSON.parse(data.toString());
};

const setData = (filePath: string, data: string) => {
  fs.writeFileSync(path.join(__dirname, filePath), data);
};

export { getData, setData };
