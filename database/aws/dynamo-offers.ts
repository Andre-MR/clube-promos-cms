import { AWSDynamoDB, Table } from "./dynamo-config";
import Offer from "../../models/offer";
import { awsSaveImageFromURL, awsSaveImageFromFile } from "./s3-offers";

const db = AWSDynamoDB();

let payload;

async function awsGetOffers(key: {
  PK: string;
  SK: string;
}): Promise<Offer[] | null> {
  payload = {
    TableName: Table!,
    // KeyConditionExpression: "PK = :PK and begins_with(SK, :SK)",
    KeyConditionExpression: "PK = :PK and SK >= :SK",
    ExpressionAttributeValues: {
      ":PK": key.PK, // "OFFER#2022" etc
      ":SK": key.SK, //"20220101001" etc
    },
    ScanIndexForward: false,
    // Limit: 10,
  };
  const result = await db.query(payload).promise();
  return result.Items ? (result.Items as Offer[]) : null;
}

async function awsCreateOffer(offer: Offer, imageFile: Buffer | null) {
  const today = new Date();
  const todayYear = today.getFullYear().toString();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const todayDay = today.getDate().toString().padStart(2, "0");
  const todayOffers = await awsGetOffers({
    PK: `OFFER#${todayYear}`,
    SK: `${todayYear}${todayMonth}${todayDay}`,
  });
  const offerID =
    todayOffers && todayOffers.length > 0
      ? (
          Number.parseInt(
            todayOffers[todayOffers.length - 1].SK.substring(8, 11)
          ) + 1
        )
          .toString()
          .padStart(3, "0")
      : "001";

  const offerSK = `${todayYear}${todayMonth}${todayDay}${offerID}`;
  const imageUrl = imageFile
    ? await awsSaveImageFromFile(offerSK, imageFile)
    : await awsSaveImageFromURL(offerSK, offer.ImageUrl);

  let params = {
    TableName: Table!,
    Item: {
      PK: `OFFER#${todayYear}`,
      SK: offerSK,
      Active: offer.Active,
      Campaigns: offer.Campaigns.length > 0 ? offer.Campaigns : [],
      Category: offer.Category,
      ClickedElements: {
        Button: 0,
        Description: 0,
        Footer: 0,
        Image: 0,
        Instagram: 0,
        Price: 0,
        Title: 0,
        Whatsapp: 0,
      },
      Clicks: 0,
      Code: offer.Code,
      Created: today.toISOString(),
      Description: offer.Description,
      Expired: offer.Expired == offer.Created ? "" : offer.Expired,
      ImageUrl: imageUrl,
      OldPrice: offer.OldPrice,
      Price: offer.Price,
      Priority: offer.Priority,
      Store: offer.Store,
      Title: offer.Title,
      Updated: today.toISOString(),
      Url: offer.Url,
      Views: offer.Views,
      Visited: "",
    },
  };
  const result = await db.put(params).promise();
  return result;
}

async function awsUpdateOffer(offer: Offer, imageFile: Buffer | null) {
  const today = new Date();
  // const todayYear = today.getFullYear().toString();
  // const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  // const todayDay = today.getDate().toString().padStart(2, "0");

  // verify replace instead:
  const imageUrl = imageFile
    ? await awsSaveImageFromFile(offer.SK, imageFile)
    : offer.ImageUrl.includes(`${process.env.AWS_S3_BUCKET}.s3`)
    ? offer.ImageUrl
    : await awsSaveImageFromURL(offer.SK, offer.ImageUrl);

  let params = {
    TableName: Table!,
    Key: { PK: offer.PK, SK: offer.SK },
    UpdateExpression: `SET Active = :active, Campaigns = :campaigns, Category = :category, 
                      Code = :code, Description = :description, Expired = :expired, ImageUrl = :imageUrl, 
                      OldPrice = :oldPrice, Price = :price, Priority = :priority, #aliasStore = :aliasStore, Title = :title, 
                      Updated = :updated, #aliasUrl = :aliasUrl`,
    ExpressionAttributeValues: {
      ":active": offer.Active,
      ":campaigns": offer.Campaigns.length > 0 ? offer.Campaigns : [],
      ":category": offer.Category,
      ":code": offer.Code,
      ":description": offer.Description,
      ":expired": offer.Expired,
      ":imageUrl": imageUrl,
      ":oldPrice": offer.OldPrice,
      ":price": offer.Price,
      ":priority": offer.Priority,
      ":aliasStore": offer.Store,
      ":title": offer.Title,
      ":updated": today.toISOString(),
      ":aliasUrl": offer.Url,
    },
    ExpressionAttributeNames: {
      // dynamodb reserved words
      "#aliasStore": "Store",
      "#aliasUrl": "Url",
    },
    ReturnValues: "UPDATED_NEW",
  };
  const result = await db.update(params).promise();
  return result;
}

async function awsDeleteOffer(offer: Offer) {
  let params = {
    TableName: Table!,
    Key: {
      PK: offer.PK,
      SK: offer.SK,
    },
  };

  const result = await db.delete(params).promise();
  return result;
}

export { awsGetOffers, awsCreateOffer, awsUpdateOffer, awsDeleteOffer };
