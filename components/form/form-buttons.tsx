import { Dispatch, SetStateAction, useState } from "react";
import { saveOffer } from "../../database/queries/offers-queries";
import { ButtonTypes } from "../../models/button-types";
import Offer from "../../models/offer";
import Store from "../../models/store";
import DefaultButton from "../buttons/default-button";
import LoadingIcon from "../buttons/loading-icon";

type Props = {
  offer: Offer;
  setOffer: Dispatch<SetStateAction<Offer>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  stores: Store[];
  imageFileSelected: boolean;
  imageFile: Buffer | null;
};

export default function FormButtons(props: Props) {
  const [offerActive, setOfferActive] = useState(true);
  return (
    <div className="my-2 flex justify-center">
      {props.offer.SK ? (
        offerActive ? (
          <DefaultButton text={"Duplicar"} type={ButtonTypes.Info} />
        ) : (
          <DefaultButton text={"Excluir"} type={ButtonTypes.Danger} />
        )
      ) : (
        <button
          type="reset"
          value={"Limpar"}
          onClick={() => {
            const newOffer = new Offer();
            newOffer.Store = props.stores[props.stores.length - 1].toString();
            props.setOffer(new Offer());
          }}
        >
          <DefaultButton text={"Limpar"} type={ButtonTypes.Secondary} />
        </button>
      )}
      <div className="mx-20 flex items-center justify-center">
        <label htmlFor="active" className="flex items-center ">
          <input
            className="peer sr-only mr-2"
            type="checkbox"
            id="active"
            name="active"
            required
            defaultChecked
            onChange={(e) => {
              setOfferActive(e.currentTarget.checked);
            }}
          ></input>
          <svg
            width={14}
            height={14}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="mr-2 flex cursor-pointer fill-white peer-checked:hidden"
          >
            <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
          </svg>
          <svg
            width={14}
            height={14}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="mr-2 hidden cursor-pointer fill-blue-500 peer-checked:flex"
          >
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
          </svg>
          Ativa
        </label>
      </div>
      <div className="relative cursor-pointer">
        {offerActive ? (
          <button type="submit" formMethod="post">
            <DefaultButton text={"Publicar"} type={ButtonTypes.Primary} />
          </button>
        ) : (
          <button type="submit" formMethod="post">
            <DefaultButton text={"Salvar"} type={ButtonTypes.Success} />
          </button>
        )}
        {props.loading ? (
          <div className="absolute top-1 left-12 h-8 w-8">
            <LoadingIcon />
          </div>
        ) : null}
      </div>
    </div>
  );
}
