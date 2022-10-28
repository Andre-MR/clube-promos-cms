import { Dispatch, SetStateAction, useState } from "react";
import Offer from "../../models/offer";

type Props = {
  offer: Offer;
  setOffer: Dispatch<SetStateAction<Offer>>;
  imageURL: string;
  setImageURL: Dispatch<SetStateAction<string>>;
  imageFileURL: string;
  setImageFileURL: Dispatch<SetStateAction<string>>;
  imageFileSelected: boolean;
  setImageFileSelected: Dispatch<SetStateAction<boolean>>;
  imageFile: Buffer | null;
  setImageFile: Dispatch<SetStateAction<Buffer | null>>;
};

export default function FormImage(props: Props) {
  const [imageUrlHide, setImageUrlHidden] = useState("");
  const [fileInputHide, setFileInputHidden] = useState("hidden");
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
                props.setOffer(newOffer);
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
      <div className="mx-5 flex h-8">
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
              props.setOffer(newOffer);
              props.setImageURL(e.target.value);
            }}
            defaultValue={props.offer.ImageUrl}
          />
        ) : (
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
              props.setOffer(newOffer);
              props.setImageURL(e.target.value);
            }}
            required
            defaultValue={props.offer.ImageUrl}
          />
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
              props.setOffer(newOffer);
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
