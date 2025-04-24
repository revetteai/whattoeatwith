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

// ✅ Copy Pagefind index (already inside _site)
const indexSource = path.join(__dirname, "_site", "pagefind-build");
const indexDest = path.join(__dirname, "_site", "pagefind");

copyDir(indexSource, indexDest)
  .then(() => console.log("✅ Pagefind index copied"))
  .catch((err) => {
    console.error("❌ Failed to copy Pagefind index:", err);
    process.exit(1);
  });

// ✅ Copy Pagefind frontend runtime
const frontendSource = path.join(__dirname, "node_modules", "pagefind", "lib", "pagefind-frontend");
const frontendDest = path.join(__dirname, "_site", "pagefind");

copyDir(frontendSource, frontendDest)
  .then(() => console.log("✅ Pagefind frontend copied"))
  .catch((err) => {
    console.error("❌ Failed to copy Pagefind frontend:", err);
    process.exit(1);
  });
