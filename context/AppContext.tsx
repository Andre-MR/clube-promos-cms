import { createContext, useContext, ReactNode, useState } from "react";
import { FilterParameters } from "../models/filter-parameters";
import Offer from "../models/offer";
import Setting from "../models/setting";

type appContextType = {
  scrollY: number;
  defineScrollY: (y: number) => void;
  offerSelected: Offer;
  defineOfferSelected: (offer: Offer) => void;
  offers: Offer[];
  offersFiltered: Offer[];
  defineOffers: (offers: Offer[]) => void;
  defineOffersFiltered: (offers: Offer[]) => void;
  filterParameters: FilterParameters;
  defineFilterParameters: (filterParameters: FilterParameters) => void;
  cmsSettings: Setting[];
  defineCmsSettings: (cmsSettings: Setting[]) => void;
};

const authContextDefaultValues: appContextType = {
  scrollY: 0,
  defineScrollY: () => {},
  offerSelected: new Offer(),
  defineOfferSelected: () => {},
  offers: [],
  offersFiltered: [],
  defineOffers: () => {},
  defineOffersFiltered: () => {},
  filterParameters: new FilterParameters(),
  defineFilterParameters: () => {},
  cmsSettings: [],
  defineCmsSettings: () => {},
};

const AppContext = createContext<appContextType>(authContextDefaultValues);

export function useApp() {
  return useContext(AppContext);
}

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const [scrollY, setScrollY] = useState<number>(0);
  const [offer, setOffer] = useState<Offer>(new Offer());
  const [offers, setOffers] = useState<Offer[]>([]);
  const [offersFiltered, setOffersFiltered] = useState<Offer[]>([]);
  const [filterParameters, setFilterParameters] = useState<FilterParameters>(
    new FilterParameters()
  );
  const [cmsSettings, setCmsSettings] = useState<Setting[]>([]);

  const defineScrollY = (y: number) => {
    setScrollY(y);
  };

  const defineOfferSelected = (offer: Offer) => {
    setOffer(offer);
  };

  const defineOffers = (offers: Offer[]) => {
    setOffers(offers);
  };

  const defineOffersFiltered = (offers: Offer[]) => {
    setOffersFiltered(offers);
  };

  const defineFilterParameters = (filterParameters: FilterParameters) => {
    setFilterParameters(filterParameters);
  };

  const defineCmsSettings = (cmsSettings: Setting[]) => {
    setCmsSettings(cmsSettings);
  };

  const value = {
    scrollY: scrollY,
    defineScrollY,
    offerSelected: offer,
    defineOfferSelected: defineOfferSelected,
    offers: offers,
    offersFiltered: offersFiltered,
    defineOffers: defineOffers,
    defineOffersFiltered: defineOffersFiltered,
    filterParameters: filterParameters,
    defineFilterParameters: defineFilterParameters,
    cmsSettings: cmsSettings,
    defineCmsSettings: defineCmsSettings,
  };

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}
