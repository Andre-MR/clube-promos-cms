import { QueryPeriods } from "../database/queries/offers-queries";

const enum FilterKeys {
  None = "",
  Active = "Active",
  Store = "Store",
  Category = "Category",
  Campaign = "Campaign",
  Title = "Title",
}

const enum SortKeys {
  Created = "Created",
  Updated = "Updated",
  Expired = "Expired",
}

class FilterParameters {
  Period: QueryPeriods;
  Sort: SortKeys;
  Active: string;
  Store: string;
  Category: string;
  Campaign: string;
  Title: string;

  constructor() {
    this.Period = QueryPeriods.Days30;
    this.Sort = SortKeys.Updated;
    this.Active = "";
    this.Store = "";
    this.Category = "";
    this.Campaign = "";
    this.Title = "";
  }
}

export { FilterKeys, SortKeys, FilterParameters };
