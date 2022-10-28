import Offer from "../../../models/offer";
import {
  awsGetOffers,
  awsCreateOffer,
  awsUpdateOffer,
} from "../../../database/aws/dynamo-offers";
import { NextApiRequest, NextApiResponse } from "next";

async function getOffers(PK: string, SK: string): Promise<Offer[] | null> {
  return await awsGetOffers({ PK: PK, SK: SK });
}

async function saveOffer(offer: Offer, imageFile: Buffer | null) {
  if (offer.SK) {
    return await awsUpdateOffer(offer, imageFile);
  } else {
    return await awsCreateOffer(offer, imageFile);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return res.json(
        await getOffers(req.query.PK!.toString(), req.query.SK!.toString())
      );
    case "POST" || "PUT":
      return res.json(
        await saveOffer(
          req.body.offer,
          req.body.imageFile ? Buffer.from(req.body.imageFile.data) : null
        )
      );
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
