export default function MainFooter() {
  return (
    <footer className="sticky bottom-0 z-30 flex h-full w-full flex-col items-center justify-between space-y-1 bg-fuchsia-900 p-1 shadow-md transition">
      <div className="flex h-full w-full items-center justify-between text-xs text-gray-200">
        <p>© 2022, Clube Promos</p>
        <p>
          Veja também:{" "}
          <a
            className="font-bold"
            rel="noreferrer"
            target={"_blank"}
            href="https://clubebaby.com"
          >
            Clube Baby Promoções
          </a>
        </p>
      </div>
    </footer>
  );
}
