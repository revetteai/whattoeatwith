const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");

const source = path.join(__dirname, "_site", "pagefind-build");
const destination = path.join(__dirname, "_site", "pagefind");

async function copyDir(src, dest) {
  await fsp.mkdir(dest, { recursive: true });
  const entries = await fsp.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fsp.copyFile(srcPath, destPath);
    }
  }
}

copyDir(source, destination)
  .then(() => console.log("✅ Pagefind assets copied to _site/pagefind"))
  .catch((err) => {
    console.error("❌ Error copying Pagefind assets:", err);
    process.exit(1);
  });
