import fs from "fs";
import path from "path";

export const fileUtils = {
  saveJSON: (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  },

  readJSON: (filePat) => {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  },

  deleteFile: (filePath) => {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  },

  getFileExtension: (filename) => path.extname(filename).slice(1),
};
