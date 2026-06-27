export default function FAQ() {
  return (
    <section
      className="px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto mb-32"
      id="faq"
    >
      <div className="text-center mb-16">
        <h2
          className="headline-lg text-headline-lg-mobile md:text-headline-lg mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
          }}
        >
          Frequently Asked Questions
        </h2>
        <p className="text-on-surface-variant text-lg">
          Everything you need to know about ClientFlow.
        </p>
      </div>
      <div className="space-y-4">
        <details className="glass-card rounded-2xl group overflow-hidden">
          <summary className="flex justify-between items-center p-6 cursor-pointer select-none">
            <span className="font-bold text-lg">
              Is there a free trial available?
            </span>
            <span className="material-symbols-outlined text-primarys transition-transform">
              expand_more
            </span>
          </summary>
          <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
            Yes! We offer a 14-day full-featured free trial on all plans. No
            credit card is required to start your trial. You can explore all the
            features and see if ClientFlow is the right fit for your business.
          </div>
        </details>
        <details className="glass-card rounded-2xl group overflow-hidden">
          <summary className="flex justify-between items-center p-6 cursor-pointer select-none">
            <span className="font-bold text-lg">
              Can I import my data from other tools?
            </span>
            <span className="material-symbols-outlined text-primarys transition-transform">
              expand_more
            </span>
          </summary>
          <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
            Absolutely. We support easy CSV imports for clients, projects, and
            historical invoices from tools like Bonsai, Honeybook, and Harvest.
            Our support team is also available to help with manual migrations
            for larger teams.
          </div>
        </details>
        <details className="glass-card rounded-2xl group overflow-hidden">
          <summary className="flex justify-between items-center p-6 cursor-pointer select-none">
            <span className="font-bold text-lg">
              What payment methods do you support?
            </span>
            <span className="material-symbols-outlined text-primarys transition-transform">
              expand_more
            </span>
          </summary>
          <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
            We integrate directly with Stripe, which allows your clients to pay
            via all major credit cards, Apple Pay, Google Pay, and ACH bank
            transfers. Payments go directly into your own Stripe account.
          </div>
        </details>
        <details className="glass-card rounded-2xl group overflow-hidden">
          <summary className="flex justify-between items-center p-6 cursor-pointer select-none">
            <span className="font-bold text-lg">Is my data secure?</span>
            <span className="material-symbols-outlined text-primarys transition-transform">
              expand_more
            </span>
          </summary>
          <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
            Security is our top priority. We use 256-bit SSL encryption, daily
            backups, and host everything on Tier 1 cloud infrastructure. We
            never store your clients' credit card information.
          </div>
        </details>
      </div>
    </section>
  );
}
