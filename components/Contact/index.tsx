import { SectionHeader } from "../SectionHeader";
import { Form } from "./Form";

const Contact = () => {
  return (
    <section id="contact" className="c-section relative overflow-hidden">
      <div className="c-container space-y-10">
        <SectionHeader
          title="Let's Keep in touch"
          description={`Ready to bring your digital vision to life?\nFill out the form below and I'll get back to you soon.`}
        />
        <Form turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
      </div>
    </section>
  );
};

export { Contact };
