import fs from "fs";
import path from "path";

const dir = "./build/client";
const version = "1.0.0"; // change this for each release

function walk(dirPath, fileList = []) {
  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath, fileList);
    } else {
      fileList.push(filePath.replace(`${dir}/`, "").replace(/\\/g, "/"));
    }
  });
  return fileList;
}

const files = walk(dir);
const manifest = {
  version,
  bundled: true,
  files,
};

fs.writeFileSync(
  path.join(dir, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);
console.log("✅ manifest.json generated with", files.length, "files.");
