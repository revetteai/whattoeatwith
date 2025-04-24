const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");

async function copyDir(src, dest) {
  try {
    await fsp.mkdir(dest, { recursive: true });
    const entries = await fsp.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fsp.copyFile(srcPath, destPath);
        console.log(`✅ Copied ${entry.name}`);
      }
    }
  } catch (err) {
    console.error(`❌ Failed to copy from ${src} to ${dest}:`, err.message);
    process.exit(1);
  }
}

(async () => {
  const source = path.join(__dirname, "_site", "pagefind-build");
  const destination = path.join(__dirname, "_site", "pagefind");

  if (!fs.existsSync(source)) {
    console.error("❌ pagefind-build directory does not exist. Something went wrong in Pagefind step.");
    process.exit(1);
  }

  console.log("📦 Copying from _site/pagefind-build to _site/pagefind...");
  await copyDir(source, destination);
  console.log("🎉 Pagefind assets copied successfully!");
})();
