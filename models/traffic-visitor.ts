export default interface TrafficVisitor {
  PK: string; // TRAFFIC#VISITOR#2022
  SK: string; // 20220901001

  Active: boolean;
  Campaigns: string[];
  Categories: string[];
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
  Code: string;
  Created: Date;
  Description: string;
  ImageUrl: string;
  OldPrice: number;
  Price: number;
  Priority: number;
  Store: string;
  Title: string;
  Updated: Date;
  Url: string;
  Views: number;
  Visited: string;
}
