import { AWSDynamoDB } from "./dynamo-config";
import Category from "../../models/category";

const db = AWSDynamoDB();
const Table = process.env.AMAZON_DYNAMODB_TABLE || "";

const payload = {
  TableName: Table,
  KeyConditionExpression: "PK = :PK",
  ExpressionAttributeValues: {
    ":PK": "CATEGORY",
  },
};

export default async function awsGetCategories(): Promise<Category[]> {
  const result = await db.query(payload).promise();
  const categories = result.Items as Category[];
  categories.sort((a, b) => {
    if (a.Description > b.Description) {
      return 1;
    }
    if (a.Description < b.Description) {
      return -1;
    }
    return 0;
  });
  return categories;
}
