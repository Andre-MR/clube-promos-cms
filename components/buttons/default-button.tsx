import { ButtonTypes } from "../../models/button-types";

type Props = {
  text: string;
  type: ButtonTypes;
  noFill?: boolean;
};

export default function DefaultButton(props: Props) {
  return props.type == ButtonTypes.Primary ? (
    props.noFill ? (
      <div className="flex w-32 justify-center rounded border-2 border-blue-500 px-4 py-1 font-semibold text-blue-500 hover:bg-blue-50">
        {props.text}
      </div>
    ) : (
      <div className="flex w-32 justify-center rounded border-2 border-blue-500 bg-white px-4 py-1 font-semibold text-blue-500 hover:bg-blue-50">
        {props.text}
      </div>
    )
  ) : props.type == ButtonTypes.Secondary ? (
    props.noFill ? (
      <div className="flex w-32 justify-center rounded border-2 border-gray-500 px-4 py-1 font-semibold text-gray-500 hover:bg-gray-50">
        {props.text}
      </div>
    ) : (
      <div className="flex w-32 justify-center rounded border-2 border-gray-500 bg-white px-4 py-1 font-semibold text-gray-500 hover:bg-gray-50">
        {props.text}
      </div>
    )
  ) : props.type == ButtonTypes.Success ? (
    props.noFill ? (
      <div className="flex w-32 justify-center rounded border-2 border-green-500 px-4 py-1 font-semibold text-green-500 hover:bg-green-50">
        {props.text}
      </div>
    ) : (
      <div className="flex w-32 justify-center rounded border-2 border-green-500 bg-white px-4 py-1 font-semibold text-green-500 hover:bg-green-50">
        {props.text}
      </div>
    )
  ) : props.type == ButtonTypes.Danger ? (
    props.noFill ? (
      <div className="flex w-32 justify-center rounded border-2 border-red-500 px-4 py-1 font-semibold text-red-500 hover:bg-red-50">
        {props.text}
      </div>
    ) : (
      <div className="flex w-32 justify-center rounded border-2 border-red-500 bg-white px-4 py-1 font-semibold text-red-500 hover:bg-red-50">
        {props.text}
      </div>
    )
  ) : props.type == ButtonTypes.Warning ? (
    props.noFill ? (
      <div className="flex w-32 justify-center rounded border-2 border-amber-500 px-4 py-1 font-semibold text-amber-500 hover:bg-amber-50">
        {props.text}
      </div>
    ) : (
      <div className="flex w-32 justify-center rounded border-2 border-amber-500 bg-white px-4 py-1 font-semibold text-amber-500 hover:bg-amber-50">
        {props.text}
      </div>
    )
  ) : props.type == ButtonTypes.Info ? (
    props.noFill ? (
      <div className="flex w-32 justify-center rounded border-2 border-cyan-500 px-4 py-1 font-semibold text-cyan-500 hover:bg-cyan-50">
        {props.text}
      </div>
    ) : (
      <div className="flex w-32 justify-center rounded border-2 border-cyan-500 bg-white px-4 py-1 font-semibold text-cyan-500 hover:bg-cyan-50">
        {props.text}
      </div>
    )
  ) : null;
}
