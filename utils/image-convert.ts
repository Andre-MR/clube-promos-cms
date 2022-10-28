import sharp from "sharp";

export default async function ImageConvert(image: Buffer) {
  return await sharp(image).webp({ quality: 20 }).resize({ height: 300 }).toBuffer();
}
