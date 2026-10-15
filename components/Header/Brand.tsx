import { TransitionLink } from "@/components/PageTransition/TransitionLink";
import { Logo } from "@/components/Logo";

const Brand = () => {
  return (
    <div className="flex items-center gap-2">
      <TransitionLink
        href="/"
        className="block size-16 text-on-background"
        title="Prapat Prapatsornmanu"
      >
        <Logo />
      </TransitionLink>
    </div>
  );
};

export { Brand };
