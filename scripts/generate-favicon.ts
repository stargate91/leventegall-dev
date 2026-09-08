import fs from "fs";
import path from "path";

function createIco(
  width: number,
  height: number,
  drawPixel: (x: number, y: number, w: number, h: number) => [number, number, number, number],
) {
  const andRowSize = Math.ceil(width / 32) * 4;
  const andMaskSize = andRowSize * height;
  const xorSize = width * height * 4;
  const dibSize = 40 + xorSize + andMaskSize;

  const headerSize = 6;
  const dirEntrySize = 16;
  const totalSize = headerSize + dirEntrySize + dibSize;

  const buf = Buffer.alloc(totalSize);

  // ICONDIR
  buf.writeUInt16LE(0, 0); // Reserved
  buf.writeUInt16LE(1, 2); // Type 1 = ICO
  buf.writeUInt16LE(1, 4); // Count = 1 image

  // ICONDIRENTRY
  buf.writeUInt8(width === 256 ? 0 : width, 6);
  buf.writeUInt8(height === 256 ? 0 : height, 7);
  buf.writeUInt8(0, 8); // Color count
  buf.writeUInt8(0, 9); // Reserved
  buf.writeUInt16LE(1, 10); // Color planes
  buf.writeUInt16LE(32, 12); // Bits per pixel
  buf.writeUInt32LE(dibSize, 14); // Bytes in resource
  buf.writeUInt32LE(headerSize + dirEntrySize, 18); // Image offset (22)

  // BITMAPINFOHEADER (at offset 22)
  let offset = 22;
  buf.writeUInt32LE(40, offset); // biSize
  buf.writeInt32LE(width, offset + 4); // biWidth
  buf.writeInt32LE(height * 2, offset + 8); // biHeight
  buf.writeUInt16LE(1, offset + 12); // biPlanes
  buf.writeUInt16LE(32, offset + 14); // biBitCount
  buf.writeUInt32LE(0, offset + 16); // biCompression (BI_RGB)
  buf.writeUInt32LE(xorSize + andMaskSize, offset + 20); // biSizeImage
  buf.writeInt32LE(0, offset + 24); // biXPelsPerMeter
  buf.writeInt32LE(0, offset + 28); // biYPelsPerMeter
  buf.writeUInt32LE(0, offset + 32); // biClrUsed
  buf.writeUInt32LE(0, offset + 36); // biClrImportant

  offset += 40;

  // XOR bitmap data (BGRA, bottom-up)
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawPixel(x, y, width, height);
      buf.writeUInt8(b, offset);
      buf.writeUInt8(g, offset + 1);
      buf.writeUInt8(r, offset + 2);
      buf.writeUInt8(a, offset + 3);
      offset += 4;
    }
  }

  // AND mask data
  buf.fill(0, offset, offset + andMaskSize);

  return buf;
}

function renderPixel(x: number, y: number, w: number, h: number): [number, number, number, number] {
  const radius = 5;
  const margin = 1;
  const innerW = w - margin * 2;
  const innerH = h - margin * 2;

  let dx = 0;
  let dy = 0;
  if (x < margin + radius) {
    dx = margin + radius - x;
  } else if (x > margin + innerW - radius - 1) {
    dx = x - (margin + innerW - radius - 1);
  }

  if (y < margin + radius) {
    dy = margin + radius - y;
  } else if (y > margin + innerH - radius - 1) {
    dy = y - (margin + innerH - radius - 1);
  }

  const distSq = dx * dx + dy * dy;
  if (distSq > radius * radius + 1) {
    return [0, 0, 0, 0];
  }

  // Base Surface Color: #181818
  let r = 24;
  let g = 24;
  let b = 24;
  const a = 255;

  // Border: Solid Unified Primary Accent #0078d4
  const isBorder = (x === margin || x === w - margin - 1 || y === margin || y === h - margin - 1 || (distSq > (radius - 1) * (radius - 1)));
  if (isBorder && distSq <= radius * radius) {
    r = 0;
    g = 120;
    b = 212;
  }

  // Clean White L Monogram
  // Vertical stem: x in [10..13], y in [8..24]
  // Horizontal base: x in [10..22], y in [21..24]
  const inStem = (x >= 10 && x <= 13 && y >= 8 && y <= 24);
  const inBase = (x >= 10 && x <= 22 && y >= 21 && y <= 24);

  if (inStem || inBase) {
    return [255, 255, 255, 255];
  }

  return [r, g, b, a];
}

const icoBuffer = createIco(32, 32, renderPixel);
const outputPath = path.resolve("public/favicon.ico");
fs.writeFileSync(outputPath, icoBuffer);
