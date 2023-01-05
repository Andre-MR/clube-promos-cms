type Props = {
  title: string;
};

export default function FormHeader(props: Props) {
  return (
    <div title="cabeçalho" className="bg-fuchsia-50 py-1 shadow">
      <h1 className="flex items-center justify-center font-semibold tracking-wide text-black">
        {props.title}
      </h1>
    </div>
  );
}
