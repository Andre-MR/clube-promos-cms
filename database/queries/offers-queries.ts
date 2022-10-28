import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import Offer from "../../models/offer";

enum QueryPeriods {
  Today = "Today",
  Days7 = "Days7",
  Days30 = "Days30",
  Years1 = "Years1",
  Week = "Week",
  Month = "Month",
  Year = "Year",
  All = "All",
}

async function saveOffer(
  offer: Offer,
  imageFile: Buffer | null
): Promise<Offer> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/api/queries/offers`,
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ offer: offer, imageFile: imageFile }), // body data type must match "Content-Type" header
    }
  );
  return await response.json();
}

async function fetchOffers(PK: string, SK: string): Promise<Offer[]> {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_MAIN_URL
    }/api/queries/offers?${new URLSearchParams({ PK: PK, SK: SK })}`,
    {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(offer), // body data type must match "Content-Type" header
    }
  );
  return await response.json();
}

async function getOffers(queryPeriod: QueryPeriods) {
  switch (queryPeriod) {
    case QueryPeriods.Today:
      return await getOffersToday();
    case QueryPeriods.Days7:
      return await getOffersDays7();
    case QueryPeriods.Days30:
      return await getOffersDays30();
    case QueryPeriods.Years1:
      return await getOffersYears1();
    case QueryPeriods.Week:
      return await getOffersWeek();
    case QueryPeriods.Month:
      return await getOffersMonth();
    case QueryPeriods.Year:
      return await getOffersYear();
    case QueryPeriods.All:
      return await getOffersAll();
    default:
      return await getOffersDays7();
    //
  }
}

async function getOffersToday() {
  const today = new Date();
  const PK = `OFFER#${today.getFullYear()}`;
  const SK = `${today.getFullYear()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`;
  return await fetchOffers(PK, SK);
}

async function getOffersDays7() {
  const today = new Date();
  today.setDate(today.getDate() - 7);
  const PK = `OFFER#${today.getFullYear()}`;
  const SK = `${today.getFullYear()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`;
  return await fetchOffers(PK, SK);
}

async function getOffersDays30() {
  const today = new Date();
  today.setDate(today.getDate() - 30);
  const PK = `OFFER#${today.getFullYear()}`;
  const SK = `${today.getFullYear()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`;
  return await fetchOffers(PK, SK);
}

async function getOffersYears1() {
  const today = new Date();
  const lastYear = new Date(today);
  lastYear.setDate(today.getDate() - 365);

  const PK1 = `OFFER#${lastYear.getFullYear()}`;
  const SK1 = `${lastYear.getFullYear()}${(lastYear.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${lastYear.getDate().toString().padStart(2, "0")}`;
  const PK2 = `OFFER#${today.getFullYear()}`;
  const SK2 = `${today.getFullYear()}`;

  const result1 = await fetchOffers(PK1, SK1);
  const result2 = await fetchOffers(PK2, SK2);

  return result1.concat(result2);
}

async function getOffersWeek() {
  const today = new Date();
  today.setDate(today.getDate() - today.getDay());
  const PK = `OFFER#${today.getFullYear()}`;
  const SK = `${today.getFullYear()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`;
  return await fetchOffers(PK, SK);
}

async function getOffersMonth() {
  const today = new Date();
  const PK = `OFFER#${today.getFullYear()}`;
  const SK = `${today.getFullYear()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  return await fetchOffers(PK, SK);
}

async function getOffersYear() {
  const today = new Date();
  const PK = `OFFER#${today.getFullYear()}`;
  const SK = `${today.getFullYear()}`;
  return await fetchOffers(PK, SK);
}

async function getOffersAll() {
  const today = new Date();
  const PK = `OFFER#${today.getFullYear() - 1}`;
  const SK = `${today.getFullYear()}`;
  return await fetchOffers(PK, SK);
}

export { saveOffer, getOffers, QueryPeriods };
