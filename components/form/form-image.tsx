import { Dispatch, SetStateAction, useState } from "react";
import Offer from "../../models/offer";

type Props = {
  offer: Offer;
  defineOfferSelected: (offer: Offer) => void;
  imageURL: string;
  setImageURL: Dispatch<SetStateAction<string>>;
  imageFileURL: string;
  setImageFileURL: Dispatch<SetStateAction<string>>;
  imageFileSelected: boolean;
  setImageFileSelected: Dispatch<SetStateAction<boolean>>;
  imageFile: Buffer | null;
  setImageFile: Dispatch<SetStateAction<Buffer | null>>;
  imageURLs: Array<string>;
  setImageURLs: Dispatch<SetStateAction<string[]>>;
};

export default function FormImage(props: Props) {
  const [imageUrlHide, setImageUrlHidden] = useState("");
  const [fileInputHide, setFileInputHidden] = useState("hidden");
  const [imageUrlindex, setImageUrlindex] = useState(0);

  async function changeImageURL() {
    const newIndex =
      imageUrlindex >= props.imageURLs.length - 1 ? 0 : imageUrlindex + 1;
    props.setImageURL(props.imageURLs[newIndex]);
    const newOffer = structuredClone(props.offer);
    newOffer.ImageUrl = props.imageURLs[newIndex];
    props.defineOfferSelected(newOffer);
    setImageUrlindex(
      imageUrlindex >= props.imageURLs.length - 1 ? 0 : imageUrlindex + 1
    );
  }

  return (
    <div className="flex w-full flex-col space-y-1">
      <div className="mx-5 flex items-center justify-between">
        <label className="flex items-center" htmlFor="image">
          Imagem
        </label>
        <div className="flex">
          <label className="flex items-center" htmlFor="file-toggle">
            Do arquivo
          </label>
          <label
            htmlFor="file-toggle"
            className="relative ml-2 inline-flex cursor-pointer items-center"
          >
            <input
              type="checkbox"
              value=""
              id="file-toggle"
              className="peer sr-only"
              onChange={(e) => {
                const newOffer = structuredClone(props.offer);
                if (e.currentTarget.checked) {
                  setImageUrlHidden("hidden");
                  setFileInputHidden("");
                  newOffer.ImageUrl = props.imageFileURL;
                  props.setImageFileSelected(true);
                } else {
                  setImageUrlHidden("");
                  setFileInputHidden("hidden");
                  newOffer.ImageUrl = props.imageURL;
                  props.setImageFileSelected(false);
                }
                props.defineOfferSelected(newOffer);
              }}
            />
            <div
              className="peer mt-1 h-3 w-8 rounded-full border bg-gray-200 ring-2 ring-blue-300
                          after:absolute after:top-[0px] after:left-[4px] after:mt-2
                          after:h-3 after:w-3 after:rounded-full after:border
                        after:border-gray-300 after:bg-white after:transition-all after:content-['']
                        peer-checked:bg-blue-600 peer-checked:after:translate-x-full
                        peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2
                        peer-focus:ring-blue-300"
            ></div>
          </label>
        </div>
      </div>
      <div className="mx-5 flex h-8 items-center">
        {props.imageFileSelected ? (
          <input
            className={`flex h-8 w-full rounded py-1 px-2 ${imageUrlHide}`}
            id="image"
            name="image"
            type="text"
            placeholder="Url"
            maxLength={250}
            onChange={(e) => {
              const newOffer = structuredClone(props.offer);
              newOffer.ImageUrl = e.target.value;
              props.defineOfferSelected(newOffer);
              props.setImageURL(e.target.value);
            }}
            value={props.offer.ImageUrl}
          />
        ) : (
          <div className="relative w-full">
            <input
              className={`flex h-8 w-full rounded py-1 px-2 text-sm ${imageUrlHide}`}
              id="image"
              name="image"
              type="text"
              placeholder="Url"
              maxLength={250}
              onChange={(e) => {
                const newOffer = structuredClone(props.offer);
                newOffer.ImageUrl = e.target.value;
                props.defineOfferSelected(newOffer);
                props.setImageURL(e.target.value);
              }}
              required
              value={props.offer.ImageUrl}
            />
            {props.offer.Store == "Amazon" && props.imageURLs.length > 0 ? (
              <button
                className="absolute top-0 bottom-0 right-0 rounded px-2 shadow hover:bg-cyan-50"
                onClick={(e) => {
                  e.preventDefault();
                  changeImageURL();
                }}
              >
                <svg
                  className="h-5 w-5 fill-cyan-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M32 96l320 0V32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32H160v64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64H480z" />
                </svg>
              </button>
            ) : null}
          </div>
        )}
        <input
          className={`flex h-8 w-full cursor-pointer rounded bg-gray-50 py-1 px-2 text-xs ${fileInputHide}`}
          id="file_input"
          type="file"
          onChange={(e) => {
            if (e.currentTarget.files) {
              const reader = new FileReader();
              reader.readAsArrayBuffer(e.currentTarget.files[0]);
              reader.onloadend = () => {
                props.setImageFile(Buffer.from(reader.result as ArrayBuffer));
              };
              const newOffer = structuredClone(props.offer);
              newOffer.ImageUrl = URL.createObjectURL(e.currentTarget.files[0]);
              props.defineOfferSelected(newOffer);
              props.setImageFileURL(
                URL.createObjectURL(e.currentTarget.files[0])
              );
            }
          }}
        />
      </div>
    </div>
  );
}
