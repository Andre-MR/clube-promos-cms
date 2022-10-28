import aws from "aws-sdk";

const Bucket = process.env.AWS_S3_BUCKET;

aws.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  region: "sa-east-1",
});

function AWSS3() {
  return new aws.S3();
}

export { AWSS3, Bucket };
