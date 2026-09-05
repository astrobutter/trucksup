// Generates local placeholder SVG images so the app has no external/network
// image dependencies. Each file is a simple labelled rectangle; real photos
// (referenced via <img alt="..."> in the components) can be dropped in later
// under the same filenames without touching any component code.
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "public", "images");
fs.mkdirSync(outDir, { recursive: true });

const items = [
  { name: "hero-driver-trucks", w: 900, h: 700, label: "Brand Ambassador + Truck Fleet", bg: "#1b1240" },
  { name: "kawach-vehicle-tracking", w: 500, h: 360, label: "Vehicle Tracking Map UI", bg: "#0f1a2a" },
  { name: "kawach-vehicle-verification", w: 500, h: 360, label: "Vehicle Verification Photo", bg: "#1b3a52" },
  { name: "kawach-dl-verification", w: 500, h: 360, label: "DL Verification Photo", bg: "#3a2a1b" },
  { name: "kawach-safety-360", w: 500, h: 360, label: "Safety 360 Trucks", bg: "#123a5e" },
  { name: "fastag-idfc", w: 700, h: 420, label: "IDFC FASTag Toll Plaza", bg: "#2a2a3a" },
  { name: "fastag-livquik", w: 700, h: 420, label: "LivQuik FASTag Toll Plaza", bg: "#25344a" },
  { name: "fuel-iocl", w: 500, h: 360, label: "IndianOil Fuel Station", bg: "#4a2a10" },
  { name: "fuel-hpcl", w: 500, h: 360, label: "HPCL Fuel Station", bg: "#123a5e" },
  { name: "fuel-jiobp", w: 500, h: 360, label: "Jio-BP Fuel Station", bg: "#1a3a1a" },
  { name: "loadboard-add-loads", w: 700, h: 420, label: "Warehouse Manager Photo", bg: "#2a2a2a" },
  { name: "loadboard-find-loads", w: 700, h: 420, label: "Transporter With Trucks", bg: "#3a1a1a" },
  { name: "scale-reduce-cost", w: 700, h: 420, label: "Coins + Cost Reduction Chart", bg: "#e8e8e8", dark: true },
  { name: "scale-save-time", w: 700, h: 420, label: "Truck On Highway", bg: "#3a3a3a" },
  { name: "scale-cash-flow", w: 700, h: 420, label: "Indian Rupee Notes", bg: "#5a4a2a" },
  { name: "scale-peace-of-mind", w: 700, h: 420, label: "Truck Convoy Parked", bg: "#1a2a1a" },
  { name: "testimonial-rajeev", w: 120, h: 120, label: "Rajeev", bg: "#5F36D0" },
  { name: "testimonial-skumar", w: 120, h: 120, label: "S Kumar", bg: "#5F36D0" },
  { name: "testimonial-manjeet", w: 120, h: 120, label: "Manjeet", bg: "#5F36D0" },
  { name: "spotlight-1", w: 700, h: 460, label: "Brand Ambassador Announcement", bg: "#2a2a2a" },
  { name: "spotlight-2", w: 700, h: 460, label: "Partnership Signing Photo", bg: "#2a2a2a" },
  { name: "spotlight-3", w: 700, h: 460, label: "NHAI MoU Signing Photo", bg: "#2a2a2a" },
];

const PARTNERS = [
  "IndianOil",
  "HPCL",
  "Jio-BP",
  "IDFC First Bank",
  "LivQuik",
  "HDFC Bank",
  "AU Small Finance Bank",
  "SF",
  "Shriram Finance",
  "IndoStar Capital",
  "Partner",
];

items.push(
  { name: "badge-google-play", w: 40, h: 40, label: "▶", bg: "#1a1a1a" },
  { name: "badge-app-store", w: 40, h: 40, label: "", bg: "#1a1a1a" }
);

for (const name of PARTNERS) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  items.push({ name: `partner-${slug}`, w: 192, h: 128, label: name, bg: "#f1f1f1", dark: true });
}

function svg({ w, h, label, bg, dark }) {
  const textColor = dark ? "#1f2937" : "#e2e8f0";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <g stroke="${textColor}" stroke-opacity="0.25" stroke-width="1">
    <line x1="0" y1="0" x2="${w}" y2="${h}"/>
    <line x1="${w}" y1="0" x2="0" y2="${h}"/>
  </g>
  <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" fill="none" stroke="${textColor}" stroke-opacity="0.35"/>
  <text x="50%" y="50%" fill="${textColor}" font-family="Arial, sans-serif" font-size="${Math.max(14, Math.round(w / 22))}" text-anchor="middle" dominant-baseline="middle">${label}</text>
</svg>`;
}

for (const item of items) {
  fs.writeFileSync(path.join(outDir, `${item.name}.svg`), svg(item));
}

console.log(`Generated ${items.length} placeholder images in ${outDir}`);
