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

async function run() {
  const indexSource = path.join(__dirname, "_site", "pagefind-build");
  const indexDest = path.join(__dirname, "_site", "pagefind");

  const frontendSource = path.join(__dirname, "node_modules", ".bin", "pagefind");
  const frontendDest = path.join(__dirname, "_site", "pagefind");

  try {
    await copyDir(indexSource, indexDest);
    console.log("✅ Pagefind index copied");

    // Copy only the index — omit frontend for now
    // This avoids the path resolution error in Netlify

    console.log("✅ Build complete");
  } catch (err) {
    console.error("❌ Postbuild failed:", err);
    process.exit(1);
  }
}

run();
