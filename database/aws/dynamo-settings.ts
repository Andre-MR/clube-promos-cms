import Setting from "../../models/setting";
import { AWSDynamoDB, Table } from "./dynamo-config";

const db = AWSDynamoDB();

const payload = {
  TableName: Table!,
  KeyConditionExpression: "PK = :PK",
  ExpressionAttributeValues: {
    ":PK": "SETTING",
  },
};

export default async function awsGetSettings(): Promise<Setting[]> {
  const result = await db.query(payload).promise();
  const stores = result.Items as Setting[];

  return stores;
}
