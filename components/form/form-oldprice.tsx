import { Dispatch, SetStateAction, useState } from "react";
import Offer from "../../models/offer";

type Props = {
  offer: Offer;
  setOffer: Dispatch<SetStateAction<Offer>>;
};

export default function FormOldPrice(props: Props) {
  const [oldPriceValue, setOldPriceValue] = useState(0);
  const [oldPriceFieldDisabled, setOldPriceFieldDisabled] = useState(
    props.offer.SK && props.offer.OldPrice ? false : true
  );
  return (
    <div className="flex w-1/4 flex-col space-y-1">
      <label htmlFor="oldPrice" className="flex items-center">
        <input
          className="peer sr-only"
          type="checkbox"
          id="oldPrice"
          name="oldPrice"
          onChange={(e) => {
            if (!e.currentTarget.checked) {
              const newOffer = structuredClone(props.offer);
              newOffer.OldPrice = 0;
              props.setOffer(newOffer);
              setOldPriceValue(0);
            }
            setOldPriceFieldDisabled(!e.currentTarget.checked);
          }}
          checked={!oldPriceFieldDisabled}
        ></input>
        <svg
          width={14}
          height={14}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="mr-2 flex fill-white peer-checked:hidden"
        >
          <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
        </svg>
        <svg
          width={14}
          height={14}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="mr-2 hidden fill-blue-500 peer-checked:flex"
        >
          <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
        </svg>
        Anterior
      </label>
      <input
        className="h-8 rounded py-1 px-2"
        id="oldPrice"
        name="oldPrice"
        type="number"
        min={0}
        max={999999}
        step={0.01}
        onChange={(e) => {
          const newOffer = structuredClone(props.offer);
          newOffer.OldPrice = Number.parseFloat(e.currentTarget.value);
          props.setOffer(newOffer);
          setOldPriceValue(newOffer.OldPrice);
          e.currentTarget.value = Number.parseFloat(
            e.currentTarget.value
          ).toFixed(2);
        }}
        disabled={oldPriceFieldDisabled}
        defaultValue={
          !oldPriceFieldDisabled ? props.offer.OldPrice.toFixed(2) : ""
        }
      />
    </div>
  );
}
