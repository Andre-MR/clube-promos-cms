import Store from "../../../models/store";
import awsGetStores from "../../../database/aws/dynamo-stores";
import { NextApiRequest, NextApiResponse } from "next";

async function getStoresAWS(): Promise<Store[]> {
  return await awsGetStores();
}

async function getStores() {
  return await getStoresAWS();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await getStores();
  if (req.method === "GET") {
  } else {
    // Handle any other HTTP method
  }
}
