import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
const root = new URL("../", import.meta.url);
const output = new URL("dist/site/", root);
await mkdir(output, {recursive: true});
for (const page of ["support", "privacy", "terms", "account-deletion"]) {
 const original = await readFile(new URL(`site/${page}.html`, root), "utf8");
 const html = original.replace("<head>", `<head><base href="/"><link rel="canonical" href="https://pacepick.kolcu.ai/${page}/">`);
 await writeFile(new URL(`${page}.html`, output), html);
 await mkdir(new URL(`${page}/`, output), {recursive: true});
 await writeFile(new URL(`${page}/index.html`, output), html);
 if (page === "support") await writeFile(new URL("index.html", output), html);
}
await copyFile(new URL("site/style.css", root), new URL("style.css", output));
await copyFile(new URL("apps/mobile/assets/brand/symbol.png", root), new URL("brand-symbol.png", output));
console.log("PacePick public support site built; no app binary or API included.");
