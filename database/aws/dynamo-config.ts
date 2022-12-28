import aws from "aws-sdk";

const Table = process.env.AMAZON_DYNAMODB_TABLE;

aws.config.update({
  accessKeyId: process.env.AMAZON_ACCESSKEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESSKEY,
  region: "sa-east-1",
});

function AWSDynamoDB() {
  return new aws.DynamoDB.DocumentClient();
}

export { AWSDynamoDB, Table };
