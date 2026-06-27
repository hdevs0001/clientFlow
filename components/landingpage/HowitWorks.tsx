"use client"
export default function HowitWorks() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-32 relative">
      <div className="text-center mb-20">
        <h2 className="headline-lg text-headline-lg-mobile md:text-headline-lg mb-4"
         style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
          }}
        >

          From Contact to Contract to Cash
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
          A streamlined workflow that guarantees you get paid faster with less
          friction.
        </p>
      </div>
      <div className="relative timeline-line max-w-4xl mx-auto px-4">
        {/* <!-- Step 1 --> */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between mb-24 group">
          <div className="hidden md:block w-[45%] text-right pr-12">
            <h3 className="text-2xl font-bold mb-3">1. Add Clients</h3>
            <p className="text-on-surface-variant">
              Centralize all client communications, documents, and historical
              data in one high-performance CRM.
            </p>
          </div>
          <div className="w-14 h-14 rounded-full bg-black border-4 border-primarys flex items-center justify-center text-primarys shadow-[0_0_30px_rgba(208,188,255,0.4)] relative z-20 transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined">person_add</span>
          </div>
          <div className="w-[45%] pl-14 md:pl-12 pt-4 md:pt-0">
            <div className="md:hidden">
              <h3 className="text-xl font-bold mb-2">1. Add Clients</h3>
              <p className="text-on-surface-variant">
                Centralize all client communications in one high-performance
                CRM.
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl border-l-4 border-l-primarys hidden md:block">
              <div className="h-4 w-1/2 bg-white/10 rounded mb-3"></div>
              <div className="h-3 w-3/4 bg-white/5 rounded"></div>
            </div>
          </div>
        </div>
        {/* <!-- Step 2 --> */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between mb-24 group">
          <div className="w-[45%] pr-14 md:pr-12 pt-4 md:pt-0 order-2 md:order-1 text-right">
            <div className="md:hidden">
              <h3 className="text-xl font-bold mb-2">2. Create Projects</h3>
              <p className="text-on-surface-variant">
                Define scopes, set milestones, and organize project deliverables
                seamlessly.
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl border-r-4 border-r-tertiary hidden md:block">
              <div className="h-4 w-1/2 bg-white/10 rounded mb-3 ml-auto"></div>
              <div className="h-3 w-3/4 bg-white/5 rounded ml-auto"></div>
            </div>
          </div>
          <div className="w-14 h-14 rounded-full bg-black border-4 border-tertiary flex items-center justify-center text-tertiary shadow-[0_0_30px_rgba(76,215,246,0.4)] relative z-20 order-1 md:order-2 transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined">create_new_folder</span>
          </div>
          <div className="hidden md:block w-[45%] pl-12 order-3">
            <h3 className="text-2xl font-bold mb-3">2. Create Projects</h3>
            <p className="text-on-surface-variant">
              Define scopes, set milestones, and organize your project
              deliverables with precision.
            </p>
          </div>
        </div>
        {/* <!-- Step 3 --> */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between mb-24 group">
          <div className="hidden md:block w-[45%] text-right pr-12">
            <h3 className="text-2xl font-bold mb-3">3. Track Tasks</h3>
            <p className="text-on-surface-variant">
              Stay on top of your daily to-dos with drag-and-drop Kanban boards
              and priority management.
            </p>
          </div>
          <div className="w-14 h-14 rounded-full bg-black border-4 border-primary-container flex items-center justify-center text-primary-container shadow-[0_0_30px_rgba(160,120,255,0.4)] relative z-20 transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined">checklist</span>
          </div>
          <div className="w-[45%] pl-14 md:pl-12 pt-4 md:pt-0">
            <div className="md:hidden">
              <h3 className="text-xl font-bold mb-2">3. Track Tasks</h3>
              <p className="text-on-surface-variant">
                Stay on top of your daily to-dos with drag-and-drop Kanban
                boards.
              </p>
            </div>
            <div className="flex gap-2 hidden md:flex">
              <div className="glass-card w-1/3 h-20 rounded-xl"></div>
              <div className="glass-card w-1/3 h-20 rounded-xl bg-primarys/5 border-primarys/20"></div>
              <div className="glass-card w-1/3 h-20 rounded-xl"></div>
            </div>
          </div>
        </div>
        {/* <!-- Step 4 --> */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between mb-24 group">
          <div className="w-[45%] pr-14 md:pr-12 pt-4 md:pt-0 order-2 md:order-1 text-right">
            <div className="md:hidden text-right">
              <h3 className="text-xl font-bold mb-2">4. Generate Invoices</h3>
              <p className="text-on-surface-variant">
                Convert approved hours or milestones into professional invoices
                with one click.
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl border-r-4 border-r-secondary hidden md:block">
              <div className="h-4 w-1/3 bg-white/10 rounded mb-3 ml-auto"></div>
              <div className="h-8 w-2/3 bg-white/5 rounded ml-auto"></div>
            </div>
          </div>
          <div className="w-14 h-14 rounded-full bg-black border-4 border-secondary flex items-center justify-center text-secondary shadow-[0_0_30px_rgba(173,198,255,0.4)] relative z-20 order-1 md:order-2 transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined" style={{
                fontVariationSettings: "'FILL' 1",
              }}>receipt_long</span>
          </div>
          <div className="hidden md:block w-[45%] pl-12 order-3">
            <h3 className="text-2xl font-bold mb-3">4. Generate Invoices</h3>
            <p className="text-on-surface-variant">
              Convert approved hours or milestones into professional invoices
              with just one click.
            </p>
          </div>
        </div>
        {/* <!-- Step 5 --> */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between group">
          <div className="hidden md:block w-[45%] text-right pr-12">
            <h3 className="text-2xl font-bold mb-3">5. Get Paid Faster</h3>
            <p className="text-on-surface-variant">
              Receive payments through Stripe, Apple Pay, and ACH. Automated
              reminders handle the rest.
            </p>
          </div>
          <div className="w-14 h-14 rounded-full bg-black border-4 border-primarys flex items-center justify-center text-primarys shadow-[0_0_30px_rgba(208,188,255,0.4)] relative z-20 transition-transform group-hover:scale-110">
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              payments
            </span>
          </div>
          <div className="w-[45%] pl-14 md:pl-12 pt-4 md:pt-0">
            <div className="md:hidden">
              <h3 className="text-xl font-bold mb-2">5. Get Paid Faster</h3>
              <p className="text-on-surface-variant">
                Receive payments through Stripe, Apple Pay, and ACH transfers.
              </p>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center hidden md:block">
              <span className="text-3xl font-bold text-primarys">$4,250.00</span>
              <div className="text-[10px] text-white/40 uppercase mt-1">
                Transaction Successful
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
