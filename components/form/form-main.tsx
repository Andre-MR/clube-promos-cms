import router from "next/router";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { deleteOffer, saveOffer } from "../../database/queries/offers-queries";
import { ButtonTypes } from "../../models/button-types";
import Campaign from "../../models/campaign";
import Category from "../../models/category";
import Offer from "../../models/offer";
import Store from "../../models/store";
import DefaultButton from "../buttons/default-button";
import FormButtons from "./form-buttons";
import FormCampaigns from "./form-campaigns";
import FormCategories from "./form-categories";
import FormCoupon from "./form-coupon";
import FormDescription from "./form-description";
import FormExpired from "./form-expired";
import FormImage from "./form-image";
import FormOldPrice from "./form-oldprice";
import FormPrice from "./form-price";
import FormPriority from "./form-priority";
import FormStore from "./form-store";
import FormTitle from "./form-title";
import FormUrl from "./form-url";
import Setting from "../../models/setting";

type Props = {
  offerSelected: Offer;
  defineOfferSelected: (offer: Offer) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  stores: Store[];
  categories: Category[];
  campaigns: Campaign[];
  cmsSettings: Setting[];
};

const validateForm = (offer: Offer, imageFile: Buffer | null) => {
  return (
    offer.Url && offer.Title && offer.Price && (imageFile || offer.ImageUrl)
  );
};

export default function FormMain(props: Props) {
  const [imageURL, setImageURL] = useState("");
  const [imageURLs, setImageUrls] = useState<string[]>([]);
  const [imageFileURL, setImageFileURL] = useState("");
  const [imageFileSelected, setImageFileSelected] = useState(false);
  const [imageFile, setImageFile] = useState<Buffer | null>(null);
  const [modal, setModal] = useState(false);
  const resultRef = useRef<HTMLSelectElement>(null);

  function handleModal() {
    setModal(!modal);
  }

  return (
    <div title="" className="h-full w-full">
      <form
        className="flex h-full flex-col justify-start space-y-2"
        method="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          if (e.currentTarget.checkValidity()) {
            props.setLoading(true);
          }
          if (
            validateForm(
              props.offerSelected,
              imageFileSelected ? imageFile : null
            )
          ) {
            await saveOffer(
              props.offerSelected,
              imageFileSelected ? imageFile : null
            );
            router.replace("/ofertas/listagem");
          } else {
          }
        }}
      >
        <div className="flex">
          <div className="flex w-2/4">
            <FormStore
              offer={props.offerSelected}
              defineOfferSelected={props.defineOfferSelected}
              stores={props.stores}
              resultRef={resultRef}
            />
            <FormCategories
              offer={props.offerSelected}
              defineOfferSelected={props.defineOfferSelected}
              categories={props.categories}
            />
          </div>
          <div className="flex w-1/4">
            <FormPriority
              offer={props.offerSelected}
              defineOfferSelected={props.defineOfferSelected}
            />
          </div>
          <div className="flex w-1/4">
            <FormExpired
              offer={props.offerSelected}
              defineOfferSelected={props.defineOfferSelected}
            />
          </div>
        </div>

        <div className="flex">
          <div className="flex w-2/4">
            <FormImage
              offer={props.offerSelected}
              defineOfferSelected={props.defineOfferSelected}
              imageURL={imageURL}
              setImageURL={setImageURL}
              imageFileURL={imageFileURL}
              setImageFileURL={setImageFileURL}
              imageFile={imageFile}
              imageFileSelected={imageFileSelected}
              setImageFileSelected={setImageFileSelected}
              setImageFile={setImageFile}
              imageURLs={imageURLs}
              setImageURLs={setImageUrls}
            />
          </div>
          <div className="flex w-2/4">
            <FormPrice
              offer={props.offerSelected}
              defineOfferSelected={props.defineOfferSelected}
            />
            <FormOldPrice
              offer={props.offerSelected}
              defineOfferSelected={props.defineOfferSelected}
            />
            <FormCoupon
              offer={props.offerSelected}
              defineOfferSelected={props.defineOfferSelected}
            />
          </div>
        </div>

        <div className="mt-2 flex">
          <FormTitle
            offer={props.offerSelected}
            defineOfferSelected={props.defineOfferSelected}
          />
        </div>

        <div className="flex h-full w-full">
          <div className="flex w-3/4 flex-col space-y-2">
            <FormUrl
              offer={props.offerSelected}
              defineOfferSelected={props.defineOfferSelected}
              resultRef={resultRef}
              setImageUrls={setImageUrls}
              cmsSettings={props.cmsSettings}
            />
            <FormDescription
              offer={props.offerSelected}
              defineOfferSelected={props.defineOfferSelected}
            />
          </div>
          <div className="flex w-1/4 flex-col space-y-2">
            <FormCampaigns
              offer={props.offerSelected}
              defineOfferSelected={props.defineOfferSelected}
              campaigns={props.campaigns}
            />
          </div>
        </div>

        <div
          title="buttons"
          className="flex h-[10%] w-full flex-col justify-center"
        >
          <FormButtons
            offerSelected={props.offerSelected}
            defineOfferSelected={props.defineOfferSelected}
            stores={props.stores}
            imageFile={imageFile}
            imageFileSelected={imageFileSelected}
            setLoading={props.setLoading}
            loading={props.loading}
            handleModal={handleModal}
            setImageUrls={setImageUrls}
          />
        </div>
      </form>
      {modal ? (
        <div
          title="modal"
          className="absolute top-0 z-40 flex h-screen w-screen items-center justify-center"
        >
          <div className="z-40 flex h-48 w-96 flex-col items-center justify-center space-y-10 rounded bg-white">
            <p className="text-xl font-semibold">Excluir oferta?</p>
            <div className="flex space-x-10">
              <button onClick={handleModal}>
                <DefaultButton text="Cancelar" type={ButtonTypes.Secondary} />
              </button>
              <button
                onClick={async () => {
                  await deleteOffer(props.offerSelected);
                  props.defineOfferSelected(new Offer());
                  router.back();
                }}
              >
                <DefaultButton text="Excluir" type={ButtonTypes.Danger} />
              </button>
            </div>
          </div>
          <div className="absolute top-0 flex h-full w-full bg-black opacity-50"></div>
        </div>
      ) : null}
    </div>
  );
}
