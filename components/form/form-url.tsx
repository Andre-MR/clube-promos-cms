import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { getAmazonProduct } from "../../services/amazon-queries";
import Offer from "../../models/offer";

type Props = {
  offer: Offer;
  defineOfferSelected: (offer: Offer) => void;
  resultRef: RefObject<HTMLSelectElement>;
  setImageUrls: Dispatch<SetStateAction<string[]>>;
};

export default function FormUrl(props: Props) {
  const [productUrl, setProductUrl] = useState("");

  async function validateAmazon() {
    if (productUrl.match("/amzn.") || productUrl.match("amazon.com")) {
      getProduct(productUrl);
    }
  }

  async function setAmazonStore(productUrl: string) {
    if (productUrl.match("/amzn.") || productUrl.match("amazon.com")) {
      props.offer.Store = "Amazon";
      props.resultRef.current!.value = "Amazon";
    } else if (productUrl == "") {
      props.offer.Store = "Lojas Online";
      props.resultRef.current!.value = "Lojas Online";
    }
  }

  async function getProduct(amazonParameter: string) {
    const product = await getAmazonProduct(amazonParameter);
    const newOffer = new Offer();
    newOffer.Title = product.title ? product.title : "";
    newOffer.Description = product.description ? product.description : "";
    newOffer.ImageUrl = product.imageUrls
      ? product.imageUrls.length > 0
        ? product.imageUrls[0]
        : ""
      : "";
    props.setImageUrls(product.imageUrls ? product.imageUrls : []);
    newOffer.Price = product.price ? product.price : 0;
    newOffer.OldPrice = product.oldPrice ? product.oldPrice : 0;
    newOffer.Store = "Amazon";
    newOffer.Url = amazonParameter;
    props.defineOfferSelected(newOffer);
  }

  return (
    <div title="url" className="flex w-full flex-col space-y-1 px-5">
      <label htmlFor="url">URL</label>
      <div className="relative flex h-8 w-full items-center rounded">
        <input
          className="flex h-full w-full rounded py-1 px-2 text-sm"
          id="url"
          name="url"
          type="text"
          maxLength={250}
          onChange={(e) => {
            setProductUrl(e.currentTarget.value);
            setAmazonStore(e.currentTarget.value);
            const newOffer = structuredClone(props.offer);
            newOffer.Url = e.currentTarget.value;
            props.defineOfferSelected(newOffer);
          }}
          required
          value={props.offer.Url}
        />
        {props.offer.Store == "Amazon" && props.offer.Url ? (
          <button
            className="absolute top-0 bottom-0 right-0 rounded bg-white px-2 shadow hover:bg-cyan-50"
            onClick={(e) => {
              e.preventDefault();
              validateAmazon();
            }}
          >
            <svg
              className="h-5 w-5 fill-cyan-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zM432 456c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
