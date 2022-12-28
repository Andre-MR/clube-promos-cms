import { createContext, useContext, ReactNode, useState } from "react";
import { FilterParameters } from "../models/filter-parameters";
import Offer from "../models/offer";

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
  };

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}
