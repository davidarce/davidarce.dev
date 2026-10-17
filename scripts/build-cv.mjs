// Generates public/David-Arce-CV.pdf from the same data files the site uses.
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

const DETAILED_ROLES = 4;
const MAX_BULLETS = 4;
const ACCENT = "#2f4bc7";
const INK = "#16171a";
const MUTED = "#555a62";
const RULE = "#d4d4d0";

const M = 42;
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 40, bottom: 40, left: M, right: M },
  info: { Title: `${profile.name} - CV`, Author: profile.name, Subject: profile.headline },
});
const W = doc.page.width - M * 2;
const BOTTOM = () => doc.page.height - doc.page.margins.bottom;

mkdirSync(resolve(root, "public"), { recursive: true });
doc.pipe(createWriteStream(resolve(root, "public/David-Arce-CV.pdf")));

const ensure = (h) => {
  if (doc.y + h > BOTTOM()) doc.addPage();
};

function section(title) {
  ensure(60);
  doc.moveDown(0.9);
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(ACCENT).text(title.toUpperCase(), M, doc.y, { characterSpacing: 1 });
  const y = doc.y + 2;
  doc.moveTo(M, y).lineTo(M + W, y).lineWidth(0.6).strokeColor(RULE).stroke();
  doc.y = y + 6;
}

function bullet(text) {
  ensure(24);
  const y = doc.y;
  doc.font("Helvetica").fontSize(9.2).fillColor(INK);
  doc.text("•", M + 2, y, { lineBreak: false });
  doc.text(text, M + 14, y, { width: W - 14, lineGap: 1 });
}

// Header
doc.font("Helvetica-Bold").fontSize(24).fillColor(INK).text(profile.name, M, 40);
doc.font("Helvetica").fontSize(11.5).fillColor(ACCENT).text(profile.headline, M, doc.y + 1);
doc.moveDown(0.35);
doc.font("Helvetica").fontSize(8.2).fillColor(MUTED);
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
  const w = doc.widthOfString(label);
  doc.text(label, cx, cy, { lineBreak: false, link: c.l, underline: false });
  cx += w;
});
doc.y = cy + 14;

section("Summary");
doc.font("Helvetica").fontSize(9.4).fillColor(INK).text(profile.summary, M, doc.y, { width: W, lineGap: 1.5 });

section("Core skills");
for (const g of skillsData) {
  ensure(30);
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(9).fillColor(INK).text(`${g.title}: `, M, y, { continued: true, width: W });
  doc.font("Helvetica").fillColor(MUTED).text(g.skills.join(", "), { width: W, lineGap: 1 });
  doc.moveDown(0.25);
}

section("Experience");
experienceData.forEach((job, i) => {
  const detailed = i < DETAILED_ROLES;
  ensure(detailed ? 110 : 40);
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK).text(job.title, M, y, { continued: true });
  doc.font("Helvetica").fillColor(MUTED).text(`  ·  ${job.company}`, { continued: false });
  doc.font("Helvetica").fontSize(8.6).fillColor(MUTED).text(job.date.replace(" - ", " – "), M, y + 1, { width: W, align: "right" });
  doc.font("Helvetica").fontSize(8.6).fillColor(MUTED).text(job.location, M, doc.y);
  doc.moveDown(0.15);
  const summary = job.summary ?? job.description;
  if (summary) doc.font("Helvetica").fontSize(9.2).fillColor(INK).text(summary, M, doc.y, { width: W, lineGap: 1 });
  if (detailed && job.responsibilities?.length) {
    doc.moveDown(0.15);
    job.responsibilities.slice(0, MAX_BULLETS).forEach(bullet);
  }
  if (detailed && job.technologies?.length) {
    doc.moveDown(0.15);
    doc.font("Helvetica-Bold").fontSize(8.6).fillColor(MUTED).text("Stack: ", M, doc.y, { continued: true, width: W });
    doc.font("Helvetica").text(job.technologies.join(", "), { width: W });
  }
  doc.moveDown(0.6);
});

section("Education");
{
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(10).fillColor(INK).text(educationData.degree, M, y, { continued: true });
  doc.font("Helvetica").fillColor(MUTED).text(`  ·  ${educationData.school}`);
  doc.font("Helvetica").fontSize(8.6).fillColor(MUTED).text(educationData.year, M, y + 1, { width: W, align: "right" });
}

section("Certifications");
doc.font("Helvetica").fontSize(9.2).fillColor(INK).text(
  certificationsData.map((c) => `${c.name} (${c.issuer})`).join("  ·  "),
  M,
  doc.y,
  { width: W, lineGap: 2 },
);

doc.end();
console.log("CV written to public/David-Arce-CV.pdf");
