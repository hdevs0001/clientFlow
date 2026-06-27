export default function Stats() {
  return (
    <section className="reveal-section px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-32 border-y border-white/5 py-20 bg-white/[0.01]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        <div>
          <div className="text-5xl md:text-6xl font-display-2xl text-primarys mb-3">
            10k+
          </div>
          <div className="text-on-surface-variant font-label-sm uppercase tracking-wider">
            Projects Completed
          </div>
        </div>
        <div>
          <div className="text-5xl md:text-6xl font-display-2xl text-tertiary mb-3">
            $5M+
          </div>
          <div className="text-on-surface-variant font-label-sm uppercase tracking-wider">
            Total Invoiced
          </div>
        </div>
        <div>
          <div className="text-5xl md:text-6xl font-display-2xl text-primary-container mb-3">
            99.9%
          </div>
          <div className="text-on-surface-variant font-label-sm uppercase tracking-wider">
            Platform Uptime
          </div>
        </div>
        <div>
          <div className="text-5xl md:text-6xl font-display-2xl text-secondary mb-3">
            2k+
          </div>
          <div className="text-on-surface-variant font-label-sm uppercase tracking-wider">
            Happy Freelancers
          </div>
        </div>
      </div>
    </section>
  );
}
