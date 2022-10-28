import Image from "next/image";
import Offer from "../../../models/offer";

export default function CardImage({ offer }: { offer: Offer }) {
  return (
    <div className="absolute z-10 mt-1 flex h-full w-full justify-center">
      <a
        className="relative flex h-[90%] w-[90%] flex-col items-center justify-between"
        target={"_blank"}
        rel="noreferrer"
        href={offer ? offer.Url : ""}
      >
        {/* <Image
          // src={offer ? offer.ImageUrl : ''}
          src={offer.ImageUrl}
          priority={true}
          alt="image-mock"
          // width={200}
          // height={180}
          layout='fill'
          objectFit='contain'
          blurDataURL='/images/card-image-background.png'
          placeholder='blur'
        /> */}
        <img
          src={offer.ImageUrl}
          className="flex h-full object-contain"
          alt=""
        ></img>
      </a>
    </div>
  );
}
