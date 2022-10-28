import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import CardPreview from "../../components/card/card-main/card-preview";
import MainFooter from "../../components/footer/main-footer";
import FormHeader from "../../components/form/form-header";
import MainHeader from "../../components/header/main-header";
import ListOffersHeader from "../../components/list/list-offers-header";
import ListOffersResult from "../../components/list/list-offers-result";
import awsGetCampaigns from "../../database/aws/dynamo-campaigns";
import awsGetCategories from "../../database/aws/dynamo-categories";
import awsGetStores from "../../database/aws/dynamo-stores";
import { getOffers, QueryPeriods } from "../../database/queries/offers-queries";
import Campaign from "../../models/campaign";
import Category from "../../models/category";
import { SortKeys } from "../../models/filter-parameters";
import Offer from "../../models/offer";
import Store from "../../models/store";
import { SortOffers } from "../../utils/offers-sorter-filter";

type Props = {
  offers: Offer[];
  stores: Store[];
  categories: Category[];
  campaigns: Campaign[];
};

const ListOffers: NextPage<Props> = (props) => {
  const [offers, setOffers] = useState(props.offers);
  const [offerSelected, setOfferSelected] = useState<Offer>(
    props.offers ? props.offers[0] : new Offer()
  );
  const [offersFiltered, setOffersFiltered] = useState(props.offers);

  return (
    <>
      <Head>
        <title>Clube Promos CMS Beta - Listagem de Ofertas</title>
        <meta name="description" content="Clube Promos CMS Versão Beta" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="relative flex h-screen w-screen flex-col justify-start bg-white">
        <div className="flex h-[6%]">
          <MainHeader />
        </div>

        <div className="flex h-[90%]">
          <div className="h-full w-9/12 border-r-4 border-fuchsia-900">
            <div className="h-[5%]">
              <FormHeader
                title={`Exibindo: ${offersFiltered.length} de ${offers.length} ofertas`}
              />
            </div>
            <div className="flex h-[5%]">
              <ListOffersHeader
                offers={offers}
                setOffers={setOffers}
                offersFiltered={offersFiltered}
                setOffersFiltered={setOffersFiltered}
                setOfferSelected={setOfferSelected}
                stores={props.stores}
                categories={props.categories}
                campaigns={props.campaigns}
              />
            </div>
            <div className="h-[90%] pt-2">
              <ListOffersResult
                offers={offersFiltered}
                setOfferSelected={setOfferSelected}
                stores={props.stores}
                offerSelected={offerSelected}
              />
            </div>
          </div>

          <div className="flex h-full w-3/12 flex-col bg-gray-200">
            <CardPreview
              offer={offerSelected ? offerSelected : new Offer()}
              stores={props.stores}
            />
          </div>
        </div>

        <div className="h-[4%]">
          <MainFooter />
        </div>
      </main>
    </>
  );
};

export default ListOffers;

export const getServerSideProps: GetServerSideProps = async () => {
  const offers = await getOffers(QueryPeriods.Days7);
  const stores = await awsGetStores();
  const categories = await awsGetCategories();
  const campaigns = await awsGetCampaigns();
  return {
    props: {
      offers: SortOffers(SortKeys.Updated, offers) || offers,
      stores: stores,
      categories: categories,
      campaigns: campaigns,
    },
  };
};
