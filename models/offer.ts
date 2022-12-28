export default class Offer {
  constructor() {
    const today = new Date();
    this.PK = "";
    this.SK = "";
    this.Active = true;
    this.Campaigns = [];
    this.Category = "";
    this.ClickedElements = {
      Button: 0,
      Description: 0,
      Footer: 0,
      Image: 0,
      Instagram: 0,
      Price: 0,
      Title: 0,
      Whatsapp: 0,
    };
    this.Clicks = 0;
    this.Coupon = "";
    this.Created = today;
    this.Description = "";
    this.Expired = today;
    this.ImageUrl = "";
    this.OldPrice = 0;
    this.Price = 0;
    this.Priority = 1;
    this.Store = "";
    this.Title = "";
    this.Updated = today;
    this.Url = "";
    this.User = "";
    this.Views = 0;
    this.Visited = today;
  }

  PK: string; // OFFER#2022
  SK: string; // 20220901001

  Active: boolean;
  Campaigns: string[];
  Category: string;
  ClickedElements: {
    Button: number;
    Description: number;
    Footer: number;
    Image: number;
    Instagram: number;
    Price: number;
    Title: number;
    Whatsapp: number;
  };
  Clicks: number;
  Coupon: string;
  Created: Date;
  Description: string;
  Expired: Date;
  ImageUrl: string;
  OldPrice: number;
  Price: number;
  Priority: number;
  Store: string;
  Title: string;
  Updated: Date;
  Url: string;
  User: string;
  Views: number;
  Visited: Date;
}
