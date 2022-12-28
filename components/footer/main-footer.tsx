export default function MainFooter() {
  return (
    <footer className="sticky bottom-0 z-30 flex h-full w-full flex-col items-center justify-between space-y-1 bg-fuchsia-900 px-3 shadow-md transition">
      <div className="flex h-full w-full items-center justify-between text-xs text-gray-200">
        <p>{process.env.NEXT_PUBLIC_FOOTER_1}</p>
        <p>
          Veja também:{" "}
          <a
            className="font-bold"
            rel="noreferrer"
            target={"_blank"}
            href={process.env.NEXT_PUBLIC_FOOTER_2}
          >
            {process.env.NEXT_PUBLIC_FOOTER_3}
          </a>
        </p>
      </div>
    </footer>
  );
}
