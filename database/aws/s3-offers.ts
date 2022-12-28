import { AWSS3, Bucket } from "./s3-config";
import ImageConvert from "../../utils/image-convert";

const s3 = AWSS3();

async function awsSaveImageFromURL(
  SK: string,
  imageUrl: string
): Promise<string> {
  const response = await fetch(imageUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  const convertedBuffer = await ImageConvert(buffer);

  const uploadedImage = await s3
    .upload({
      Bucket: Bucket!,
      Key: `images/products/offer-${SK}.webp`,
      ContentType: "image/webp",
      Body: convertedBuffer,
    })
    .promise();

  return uploadedImage.Location;
}

async function awsSaveImageFromFile(
  SK: string,
  imageFile: Buffer
): Promise<string> {
  const convertedBuffer = await ImageConvert(imageFile);

  const uploadedImage = await s3
    .upload({
      Bucket: Bucket!,
      Key: `images/products/offer-${SK}.webp`,
      ContentType: "image/webp",
      Body: convertedBuffer,
    })
    .promise();
  return uploadedImage.Location;
}

async function awsDeleteImage(imageUrl: string) {
  const result = await s3.deleteObject({
    Bucket: process.env.AWS_S3_BUCKET || "",
    Key: imageUrl.replace(`https://${process.env.AWS_S3_DOMAIN}/`, ""),
  });
  return result;
}

export { awsSaveImageFromURL, awsSaveImageFromFile, awsDeleteImage };
