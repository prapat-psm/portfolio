import Link from "next/link";
import { Logo } from "@/components/Logo";

const Brand = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/"
        className="block size-16 text-on-background"
        title="Prapat Prapatsornmanu"
      >
        <Logo />
      </Link>
    </div>
  );
};

export { Brand };
