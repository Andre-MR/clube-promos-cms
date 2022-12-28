import { useState } from "react";
import Offer from "../../models/offer";

type Props = {
  offer: Offer;
  defineOfferSelected: (offer: Offer) => void;
};

export default function FormCoupon(props: Props) {
  const [couponValue, setCouponValue] = useState("");
  const [couponField, setCouponField] = useState(
    props.offer.SK && props.offer.Coupon ? false : true
  );
  return (
    <div title="cupom" className="mx-5 flex w-2/4 flex-col space-y-1">
      <div className="flex items-center">
        <label htmlFor="coupon" className="flex items-center">
          <input
            className="peer sr-only"
            type="checkbox"
            id="coupon"
            name="coupon"
            onChange={(e) => {
              const newOffer = structuredClone(props.offer);
              if (!e.currentTarget.checked) {
                newOffer.Coupon = "";
                setCouponValue("");
              } else {
                newOffer.Coupon = "";
              }
              props.defineOfferSelected(newOffer);
              setCouponField(!e.currentTarget.checked);
            }}
            checked={!couponField}
          />
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
          Cupom
        </label>
      </div>
      <input
        className="h-8 rounded py-1 px-2"
        id="coupon"
        name="coupon"
        type="text"
        disabled={couponField}
        onChange={(e) => {
          const newOffer = structuredClone(props.offer);
          newOffer.Coupon = e.target.value;
          props.defineOfferSelected(newOffer);
          setCouponValue(e.target.value);
        }}
        defaultValue={!couponField ? props.offer.Coupon : ""}
      />
    </div>
  );
}
