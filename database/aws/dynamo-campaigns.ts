import Campaign from "../../models/campaign";
import { AWSDynamoDB, Table } from "./dynamo-config";

const db = AWSDynamoDB();

const payload = {
  TableName: Table!,
  KeyConditionExpression: "PK = :PK",
  ExpressionAttributeValues: {
    ":PK": "CAMPAIGN",
  },
};

export default async function awsGetCampaigns(): Promise<Campaign[]> {
  const result = await db.query(payload).promise();
  const campaigns = result.Items as Campaign[];
  campaigns.sort((a, b) => {
    if (a.Description > b.Description) {
      return 1;
    }
    if (a.Description < b.Description) {
      return -1;
    }
    return 0;
  });
  return campaigns;
}
