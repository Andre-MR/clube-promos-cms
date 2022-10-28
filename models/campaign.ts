export default interface Campaign {
  PK: string; // CAMPAIGN
  SK: string; // STATIC#0001 || SASONAL#0001

  Active: boolean;
  Description: string;
  Begin: Date;
  End: Date;
}
