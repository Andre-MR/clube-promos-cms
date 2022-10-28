import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import FormMain from "../../components/form/form-main";
import MainHeader from "../../components/header/main-header";
import MainFooter from "../../components/footer/main-footer";
import CardPreview from "../../components/card/card-main/card-preview";
import Category from "../../models/category";
import Offer from "../../models/offer";
import Store from "../../models/store";
import Campaign from "../../models/campaign";
import awsGetCategories from "../../database/aws/dynamo-categories";
import awsGetCampaigns from "../../database/aws/dynamo-campaigns";
import awsGetStores from "../../database/aws/dynamo-stores";
import FormHeader from "../../components/form/form-header";

type Props = {
  stores: Store[];
  categories: Category[];
  campaigns: Campaign[];
  offer: string;
};

const EditOffer: NextPage<Props> = (props) => {
  const [offer, setOffer] = useState<Offer>(JSON.parse(props.offer));
  const [loading, setLoading] = useState(false);

  // clear browser url in address bar only for visual purposes:
  window.history.replaceState(
    {},
    "/",
    window.location.href.match(/.+?(?=\?)/)?.[0] || window.location.href
  );

  return (
    <>
      <Head>
        <title>Clube Promos CMS Beta - Nova Oferta</title>
        <meta name="description" content="Clube Promos CMS Versão Beta" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex h-screen w-screen flex-col justify-start bg-gradient-to-b from-gray-300 to-gray-100">
        <div className="flex h-[6%]">
          <MainHeader />
        </div>

        <div className="flex h-full">
          <div className="h-full w-9/12 border-r-4 border-fuchsia-900">
            <div className="h-[5%]">
              <FormHeader
                title={
                  offer.SK ? `Editando oferta: ${offer.SK}` : "Nova oferta"
                }
              />
            </div>
            <div className="flex h-[95%] w-full">
              <FormMain
                offer={offer}
                setOffer={setOffer}
                stores={props.stores}
                categories={props.categories}
                campaigns={props.campaigns}
                setLoading={setLoading}
                loading={loading}
              />
            </div>
          </div>

          <div className="flex h-full w-3/12 flex-col">
            <CardPreview offer={offer} stores={props.stores} />
          </div>
        </div>

        <div className="h-[4%]">
          <MainFooter />
        </div>
      </main>
    </>
  );
};

export default EditOffer;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await awsGetCategories();
  const campaigns = await awsGetCampaigns();
  const stores = await awsGetStores();
  return {
    props: {
      stores: stores,
      categories: categories,
      campaigns: campaigns,
      offer: context.query.offer,
    },
  };
};
