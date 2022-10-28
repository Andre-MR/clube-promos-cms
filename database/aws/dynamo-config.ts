import aws from "aws-sdk";

const Table = process.env.AWS_DYNAMODB_TABLE;

aws.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  region: "sa-east-1",
});

function AWSDynamoDB() {
  return new aws.DynamoDB.DocumentClient();
}

export { AWSDynamoDB, Table };
