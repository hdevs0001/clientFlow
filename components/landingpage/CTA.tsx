export default function CTA() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-32 relative">
      <div className="glass-panel p-12 md:p-20 rounded-[40px] text-center border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/10 blur-[120px] rounded-full"></div>
        <h2 className="font-display-2xl text-headline-lg-mobile md:text-5xl mb-6 relative z-10"
         style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
          }}>
          Take Control Of Your <br className="hidden md:block" />
          Freelance Business
        </h2>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-10 relative z-10">
          Join 2,000+ professionals who have reclaimed their time and increased
          their revenue.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
          <button className="glow-button bg-primarys text-on-primary px-10 py-5 rounded-2xl font-bold text-lg w-full sm:w-auto">
            Start Free Today
          </button>
          <button className="glass-card text-on-surface px-10 py-5 rounded-2xl font-bold text-lg w-full sm:w-auto hover:bg-white/5 transition-colors">
            Book Demo
          </button>
        </div>
      </div>
    </section>
  );
}
