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
  Sort: SortKeys;
  Active: string;
  Store: string;
  Category: string;
  Campaign: string;
  Title: string;

  constructor() {
    this.Sort = SortKeys.Created;
    this.Active = "";
    this.Store = "";
    this.Category = "";
    this.Campaign = "";
    this.Title = "";
  }
}

export { FilterKeys, SortKeys, FilterParameters };
