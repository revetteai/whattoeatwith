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

// ✅ Copy the index (from _site/pagefind-build → _site/pagefind)
const indexSource = path.join(__dirname, "_site", "pagefind-build");
const indexDest = path.join(__dirname, "_site", "pagefind");

copyDir(indexSource, indexDest)
  .then(() => console.log("✅ Pagefind index copied"))
  .catch((err) => {
    console.error("❌ Failed to copy Pagefind index:", err);
    process.exit(1);
  });

// ✅ Use Pagefind’s own helper to copy frontend assets
const { copyPagefindAssets } = require("pagefind");

copyPagefindAssets({
  outputPath: path.join(__dirname, "_site", "pagefind"),
})
  .then(() => console.log("✅ Pagefind frontend copied"))
  .catch((err) => {
    console.error("❌ Failed to copy Pagefind frontend:", err);
    process.exit(1);
  });
