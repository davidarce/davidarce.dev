// Generates public/David-Arce-CV.pdf (one A4 page) from the same data files the site uses.
// Run with: node --experimental-strip-types scripts/build-cv.mjs
import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { profile } = await import("../src/data/profile.ts");
const { experienceData } = await import("../src/data/experience.ts");
const { skillsData } = await import("../src/data/skills.ts");
const { educationData, certificationsData } = await import("../src/data/education.ts");

// What goes on the single page
const DETAILED_ROLES = 2; // most recent roles shown with bullets
const BULLETS = 3;
const STACK_ITEMS = 9;
const SKILL_LIMITS = [8, 4, 6, 4, 7]; // per skill group, same order as skills.ts

const ACCENT = "#2f4bc7";
const INK = "#16171a";
const MUTED = "#555a62";
const RULE = "#d4d4d0";

const M = 46;
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 40, bottom: 24, left: M, right: M },
  bufferPages: true,
  info: { Title: `${profile.name} - CV`, Author: profile.name, Subject: profile.headline },
});
const W = doc.page.width - M * 2;

mkdirSync(resolve(root, "public"), { recursive: true });
const out = createWriteStream(resolve(root, "public/David-Arce-CV.pdf"));
doc.pipe(out);

const years = (date) => {
  const ys = date.match(/\d{4}/g) ?? [];
  const end = /present/i.test(date) ? "Present" : ys[ys.length - 1];
  return ys[0] === end ? ys[0] : `${ys[0]} – ${end}`;
};

function section(title) {
  doc.y += 14;
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(ACCENT).text(title.toUpperCase(), M, doc.y, { characterSpacing: 1.2 });
  const y = doc.y + 3;
  doc.moveTo(M, y).lineTo(M + W, y).lineWidth(0.6).strokeColor(RULE).stroke();
  doc.y = y + 9;
}

function bullet(text) {
  const y = doc.y;
  doc.font("Helvetica").fontSize(9.2).fillColor(INK);
  doc.text("•", M + 2, y, { lineBreak: false });
  doc.text(text, M + 14, y, { width: W - 14, lineGap: 2.2 });
  doc.y += 3;
}

// Header
doc.font("Helvetica-Bold").fontSize(25).fillColor(INK).text(profile.name, M, 40);
doc.font("Helvetica").fontSize(12).fillColor(ACCENT).text(profile.headline, M, doc.y + 2);
doc.y += 6;
doc.font("Helvetica").fontSize(8.4).fillColor(MUTED);
const contact = [
  { t: profile.location },
  { t: profile.email, l: `mailto:${profile.email}` },
  { t: "linkedin.com/in/davidarce92", l: profile.linkedin },
  { t: "github.com/davidarce", l: profile.github },
  { t: "davidarce.dev", l: profile.site },
];
const cy = doc.y;
let cx = M;
contact.forEach((c, i) => {
  const label = c.t + (i < contact.length - 1 ? "  |  " : "");
  doc.text(label, cx, cy, { lineBreak: false, link: c.l, underline: false });
  cx += doc.widthOfString(label);
});
doc.y = cy + 12;

section("Summary");
doc.font("Helvetica").fontSize(9.4).fillColor(INK).text(profile.cvSummary, M, doc.y, { width: W, lineGap: 2.4 });

section("Core skills");
skillsData.forEach((g, i) => {
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(9).fillColor(INK).text(`${g.title}: `, M, y, { continued: true, width: W });
  doc.font("Helvetica").fillColor(MUTED).text(g.skills.slice(0, SKILL_LIMITS[i] ?? 6).join(", "), { width: W, lineGap: 2 });
  doc.y += 3;
});

section("Experience");
experienceData.slice(0, DETAILED_ROLES).forEach((job) => {
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK).text(job.title, M, y, { continued: true });
  doc.font("Helvetica").fillColor(MUTED).text(`  ·  ${job.company}`, { continued: false });
  doc.font("Helvetica").fontSize(8.6).fillColor(MUTED).text(job.date.replace(" - ", " – "), M, y + 1, { width: W, align: "right" });
  doc.y += 4;
  (job.responsibilities ?? []).slice(0, BULLETS).forEach(bullet);
  if (job.technologies?.length) {
    doc.font("Helvetica-Bold").fontSize(8.6).fillColor(MUTED).text("Stack: ", M, doc.y, { continued: true, width: W });
    doc.font("Helvetica").text(job.technologies.slice(0, STACK_ITEMS).join(", "), { width: W });
  }
  doc.y += 9;
});

// Earlier roles: one line each
doc.font("Helvetica-Bold").fontSize(8.6).fillColor(MUTED).text("EARLIER", M, doc.y, { characterSpacing: 1 });
doc.y += 5;
experienceData.slice(DETAILED_ROLES).forEach((job) => {
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(9).fillColor(INK).text(job.title, M, y, { continued: true });
  doc.font("Helvetica").fillColor(MUTED).text(`  ·  ${job.company}`, { continued: false });
  doc.font("Helvetica").fontSize(8.6).fillColor(MUTED).text(years(job.date), M, y + 0.5, { width: W, align: "right" });
  doc.y = y + 15;
});

section("Education & certifications");
{
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(9.4).fillColor(INK).text(educationData.degree, M, y, { continued: true });
  doc.font("Helvetica").fillColor(MUTED).text(`  ·  ${educationData.school}`, { continued: false });
  doc.font("Helvetica").fontSize(8.6).fillColor(MUTED).text(educationData.year, M, y + 0.5, { width: W, align: "right" });
  doc.y = y + 18;
  doc.font("Helvetica").fontSize(9).fillColor(MUTED).text(
    certificationsData.slice(0, 5).map((c) => `${c.name} (${c.issuer})`).join("  ·  "),
    M,
    doc.y,
    { width: W, lineGap: 2.4 },
  );
}

// Pointer to the full portfolio
doc.y += 10;
doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("Full detail, projects and AI enablement work at ", M, doc.y, { continued: true, link: profile.site });
doc.font("Helvetica-Bold").fillColor(ACCENT).text("davidarce.dev", { link: profile.site, underline: true });

const pages = doc.bufferedPageRange().count;
doc.end();
out.on("finish", () => {
  if (pages > 1) {
    console.error(`CV overflowed to ${pages} pages. Trim content in scripts/build-cv.mjs.`);
    process.exit(1);
  }
  console.log("CV written to public/David-Arce-CV.pdf (1 page)");
});
