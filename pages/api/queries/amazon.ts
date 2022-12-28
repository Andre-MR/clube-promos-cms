import { NextApiRequest, NextApiResponse } from "next";
import { scrapAmazonProduct } from "../../../services/amazon-scrap";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const product = await scrapAmazonProduct(
    req.query.AmazonParameter!.toString()
  );

  return res.json(product);
}
