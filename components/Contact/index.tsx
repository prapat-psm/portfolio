import Form from './Form';

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Let&apos;s Work Together
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Ready to bring your digital vision to life? Fill out the form below 
            and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
        
        <Form />
      </div>
    </section>
  );
};

export { Contact };
