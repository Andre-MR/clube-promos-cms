import Offer from "../../../models/offer";
import Store from "../../../models/store";
import CardLogoBrand from "./card-logo-brand";
import CardLogoSocialInstagram from "./card-logo-social-instagram";
import CardLogoSocialWhatsapp from "./card-logo-social-whatsapp";
import CardLogoStore from "./card-logo-store";

type Props = {
  offer: Offer;
  stores: Store[];
};

export default function CardLogos(props: Props) {
  return (
    <>
      <div className="absolute top-2 left-2 z-20">
        <CardLogoStore offer={props.offer} stores={props.stores} />
      </div>
      <CardLogoBrand />
      <CardLogoSocialInstagram />
      <CardLogoSocialWhatsapp offer={props.offer} />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: "",
  };
}
