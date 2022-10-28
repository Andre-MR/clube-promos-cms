import router from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { saveOffer } from "../../database/queries/offers-queries";
import Campaign from "../../models/campaign";
import Category from "../../models/category";
import Offer from "../../models/offer";
import Store from "../../models/store";
import FormButtons from "./form-buttons";
import FormCampaigns from "./form-campaigns";
import FormCategories from "./form-categories";
import FormCode from "./form-code";
import FormDescription from "./form-description";
import FormExpired from "./form-expired";
import FormImage from "./form-image";
import FormOldPrice from "./form-oldprice";
import FormPrice from "./form-price";
import FormPriority from "./form-priority";
import FormStore from "./form-store";
import FormTitle from "./form-title";
import FormUrl from "./form-url";

type Props = {
  offer: Offer;
  setOffer: Dispatch<SetStateAction<Offer>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  stores: Store[];
  categories: Category[];
  campaigns: Campaign[];
};

const validateForm = (offer: Offer, imageFile: Buffer | null) => {
  return (
    offer.Url && offer.Title && offer.Price && (imageFile || offer.ImageUrl)
  );
};

export default function FormMain(props: Props) {
  const [imageURL, setImageURL] = useState("");
  const [imageFileURL, setImageFileURL] = useState("");
  const [imageFileSelected, setImageFileSelected] = useState(false);
  const [imageFile, setImageFile] = useState<Buffer | null>(null);

  return (
    <div className="h-full w-full">
      <form
        className="flex h-full flex-col justify-start space-y-2"
        method="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          if (e.currentTarget.checkValidity()) {
            props.setLoading(true);
          }
          if (validateForm(props.offer, imageFileSelected ? imageFile : null)) {
            await saveOffer(props.offer, imageFileSelected ? imageFile : null);
            router.back();
          }
        }}
      >
        <div
          title="upside"
          className="flex h-[50%] w-full 2xl:h-[45%] tall:h-[45%] tall-2xl:h-[40%]"
        >
          <div title="col1" className="flex h-full w-full flex-col">
            <FormStore
              offer={props.offer}
              setOffer={props.setOffer}
              stores={props.stores}
            />

            <FormImage
              offer={props.offer}
              setOffer={props.setOffer}
              imageURL={imageURL}
              setImageURL={setImageURL}
              imageFileURL={imageFileURL}
              setImageFileURL={setImageFileURL}
              imageFile={imageFile}
              imageFileSelected={imageFileSelected}
              setImageFileSelected={setImageFileSelected}
              setImageFile={setImageFile}
            />

            <div className="mt-2 flex">
              <FormPrice offer={props.offer} setOffer={props.setOffer} />

              <FormOldPrice offer={props.offer} setOffer={props.setOffer} />

              <FormCode offer={props.offer} setOffer={props.setOffer} />
            </div>
            <div className="mt-2 flex">
              <FormUrl offer={props.offer} setOffer={props.setOffer} />
            </div>
          </div>

          <div title="col2" className="flex h-full w-full flex-col space-y-2">
            <div className="flex w-full">
              <FormPriority offer={props.offer} setOffer={props.setOffer} />
              <FormExpired offer={props.offer} setOffer={props.setOffer} />
            </div>

            <div className="flex h-full w-full">
              <FormCategories
                offer={props.offer}
                setOffer={props.setOffer}
                categories={props.categories}
              />
              <FormCampaigns
                offer={props.offer}
                setOffer={props.setOffer}
                campaigns={props.campaigns}
              />
            </div>
          </div>
        </div>

        <div
          title="downside"
          className="flex h-[50%] w-full flex-col space-y-2 2xl:h-[55%] tall:h-[55%] tall-2xl:h-[60%]"
        >
          <FormTitle offer={props.offer} setOffer={props.setOffer} />
          <div className="flex h-full">
            <FormDescription offer={props.offer} setOffer={props.setOffer} />
          </div>
        </div>
        <div title="buttons" className="flex h-[10%] w-full flex-col">
          <FormButtons
            offer={props.offer}
            setOffer={props.setOffer}
            stores={props.stores}
            imageFile={imageFile}
            imageFileSelected={imageFileSelected}
            setLoading={props.setLoading}
            loading={props.loading}
          />
        </div>
      </form>
    </div>
  );
}
