import Link from "next/link";

const Brand = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/"
        className="headline-lg tracking-wider"
        title="Prapat Prapatsornmanu"
      >
        P. P.
      </Link>
    </div>
  );
};

export { Brand };
