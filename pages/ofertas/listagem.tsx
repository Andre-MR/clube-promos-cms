import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
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
import { FilterOffers, SortOffers } from "../../utils/offers-sorter-filter";
import { useApp } from "../../context/AppContext";
import LoadingIcon from "../../components/buttons/loading-icon";

type Props = {
  stores: Store[];
  categories: Category[];
  campaigns: Campaign[];
};

const ListOffers: NextPage<Props> = (props) => {
  const {
    scrollY,
    defineScrollY,
    offerSelected,
    defineOfferSelected,
    offers,
    defineOffers,
    offersFiltered,
    defineOffersFiltered,
    filterParameters,
    defineFilterParameters,
  } = useApp();
  const [stores, setStores] = useState(props.stores);
  const [loading, setLoading] = useState(false);

  async function getOffersAsync() {
    setLoading(true);
    let newOffers = await getOffers(QueryPeriods.Days30);
    newOffers = SortOffers(SortKeys.Updated, newOffers);
    defineOffers(newOffers);
    const newOfferFiltered = FilterOffers(filterParameters, newOffers);

    defineOffersFiltered(newOfferFiltered);
    defineOfferSelected(newOfferFiltered[0]);
    setLoading(false);
  }

  useEffect(() => {
    getOffersAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_MAIN_TITLE} - Listagem de Ofertas`}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_MAIN_TITLE} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="relative flex h-screen w-screen flex-col justify-start bg-white">
        <div className="flex h-[5%]">
          <MainHeader homePage={false} />
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
                offers={offers ? offers : offers}
                defineOffers={defineOffers}
                offersFiltered={offersFiltered}
                defineOffersFiltered={defineOffersFiltered}
                defineOfferSelected={defineOfferSelected}
                stores={props.stores}
                categories={props.categories}
                campaigns={props.campaigns}
                filterParameters={filterParameters}
                defineFilterParameters={defineFilterParameters}
              />
            </div>
            <div className="h-[90%] pt-2">
              {loading ? (
                <div className="flex h-full flex-col items-center justify-center align-middle">
                  <div className="h-20">
                    <LoadingIcon />
                  </div>
                </div>
              ) : (
                <ListOffersResult
                  scrollY={scrollY}
                  defineScrollY={defineScrollY}
                  offers={offersFiltered}
                  defineOffers={defineOffers}
                  stores={stores}
                  setStores={setStores}
                  offerSelected={offerSelected}
                  defineOfferSelected={defineOfferSelected}
                />
              )}
            </div>
          </div>

          <div className="flex h-full w-3/12 flex-col bg-gray-200">
            <CardPreview
              offer={offerSelected ? offerSelected : new Offer()}
              stores={props.stores}
            />
          </div>
        </div>

        <div className="h-[5%]">
          <MainFooter />
        </div>
      </main>
    </>
  );
};

export default ListOffers;

export const getServerSideProps: GetServerSideProps = async () => {
  const stores = await awsGetStores();
  const categories = await awsGetCategories();
  const campaigns = await awsGetCampaigns();
  return {
    props: {
      stores: stores,
      categories: categories,
      campaigns: campaigns,
    },
  };
};
