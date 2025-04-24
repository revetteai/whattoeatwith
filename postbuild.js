const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");

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

(async () => {
  const source = path.join(__dirname, "_site", "pagefind-build");
  const destination = path.join(__dirname, "_site", "pagefind");

  try {
    await copyDir(source, destination);
    console.log("✅ All Pagefind assets (index + frontend) copied to _site/pagefind");
  } catch (err) {
    console.error("❌ Failed to copy Pagefind assets:", err);
    process.exit(1);
  }
})();
