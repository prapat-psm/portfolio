import { SectionHeader } from "../SectionHeader";
import { Form } from "./Form";

const Contact = () => {
  return (
    <section id="contact" className="c-section relative overflow-hidden">
      <div className="c-container space-y-10">
        <SectionHeader
          title="Let's Keep in touch"
          description={`Ready to bring your digital vision to life?\nFill out the form below and we'll get back to you within 24 hours.`}
        />
        <Form />
      </div>
    </section>
  );
};

export { Contact };
