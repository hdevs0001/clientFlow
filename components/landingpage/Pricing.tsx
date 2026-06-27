export default function Pricing() {
  return (
    <section
      className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-32"
      id="pricing"
    >
      <div className="text-center mb-16">
        <h2 className="headline-lg text-headline-lg-mobile md:text-headline-lg mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
          }}>
          Simple, Transparent Pricing
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
          Invest in the tool that pays for itself in billable hours saved every
          week.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <div className="glass-card p-10 rounded-2xl flex flex-col">
          <h3 className="text-2xl font-bold mb-2"  style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
          }} >Starter</h3>
          <p className="text-on-surface-variant mb-8 text-sm">
            Perfect for part-time freelancers.
          </p>
          <div className="mb-10">
            <span className="text-5xl font-bold">$12</span>
            <span className="text-on-surface-variant ml-2">/mo</span>
          </div>
          <ul className="space-y-4 mb-10 flex-1">
            <li className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primarys text-base">
                check
              </span>{" "}
              Up to 5 Active Clients
            </li>
            <li className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primarys text-base">
                check
              </span>{" "}
              Basic Invoicing
            </li>
            <li className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primarys text-base">
                check
              </span>{" "}
              Project Tracking
            </li>
          </ul>
          <button className="w-full py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-bold">
            Get Started
          </button>
        </div>
        <div className=" p-10 rounded-2xl border-2 border-[#d0bcff] relative shadow-[0_0_40px_rgba(208,188,255,0.15)] flex flex-col bg-[#1a1a1c]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primarys text-on-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            Most Popular
          </div>
          <h3 className="text-2xl font-bold mb-2 text-primarys" style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
          }}>Professional</h3>
          <p className="text-on-surface-variant mb-8 text-sm">
            For full-time independent pros.
          </p>
          <div className="mb-10">
            <span className="text-5xl font-bold">$29</span>
            <span className="text-on-surface-variant ml-2">/mo</span>
          </div>
          <ul className="space-y-4 mb-10 flex-1">
            <li className="flex items-center gap-3 text-sm font-semibold text-on-surface">
              <span className="material-symbols-outlined text-primarys text-base">
                check
              </span>{" "}
              Unlimited Clients
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-on-surface">
              <span className="material-symbols-outlined text-primarys text-base">
                check
              </span>{" "}
              Automated Invoicing &amp; Stripe
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-on-surface">
              <span className="material-symbols-outlined text-primarys text-base">
                check
              </span>{" "}
              Custom Client Portal
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-on-surface">
              <span className="material-symbols-outlined text-primarys text-base">
                check
              </span>{" "}
              Advanced Revenue Analytics
            </li>
          </ul>
          <button className="glow-button w-full py-4 rounded-xl bg-primarys text-on-primary font-bold">
            Start Free Trial
          </button>
        </div>
        <div className="glass-card p-10 rounded-2xl flex flex-col">
          <h3 className="text-2xl font-bold mb-2" style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
          }}>Agency</h3>
          <p className="text-on-surface-variant mb-8 text-sm">
            For growing teams and studios.
          </p>
          <div className="mb-10">
            <span className="text-5xl font-bold">$79</span>
            <span className="text-on-surface-variant ml-2">/mo</span>
          </div>
          <ul className="space-y-4 mb-10 flex-1">
            <li className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primarys text-base">
                check
              </span>{" "}
              Everything in Professional
            </li>
            <li className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primarys text-base">
                check
              </span>{" "}
              Up to 5 Team Members
            </li>
            <li className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primarys text-base">
                check
              </span>{" "}
              White-labeled Portal
            </li>
            <li className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primarys text-base">
                check
              </span>{" "}
              Priority Concierge Support
            </li>
          </ul>
          <button className="w-full py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-bold">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}
