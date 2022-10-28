import Store from "../../models/store";
import { AWSDynamoDB, Table } from "./dynamo-config";

const db = AWSDynamoDB();

const payload = {
  TableName: Table!,
  KeyConditionExpression: "PK = :PK",
  ExpressionAttributeValues: {
    ":PK": "STORE",
  },
};

export default async function awsGetStores(): Promise<Store[]> {
  const result = await db.query(payload).promise();
  const stores = result.Items as Store[];
  stores.sort((a, b) => {
    if (a.Description > b.Description) {
      return 1;
    }
    if (a.Description < b.Description) {
      return -1;
    }
    return 0;
  });
  return stores;
}
