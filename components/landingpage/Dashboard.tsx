export default function Dashboard() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-32 relative py-20">
      <div className="text-center mb-20">
        <h2 className="headline-lg text-headline-lg-mobile md:text-headline-lg mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
          }}>
          Command Center For Your Business
        </h2>
        <p className="text-on-surface-variant max-w-4xl mx-auto text-lg font-body">
          Experience a UI that gets out of your way and lets you focus on what
          matters.
        </p>
      </div>
      <div className="relative max-w-6xl mx-auto h-[600px]">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-[120px] rounded-full"></div>
        {/* <!-- Main Window --> */}
        <div className="absolute inset-0 glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex">
          <div className="w-64 border-r border-white/5 p-6 bg-black/20 hidden md:block">
            <div className="flex items-center gap-2 mb-10 text-primarys">
              {/* <span className="material-symbols-outlined">auto_graph</span> */}
              <span className="font-bold">ClientFlow</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/40">
                <span className="material-symbols-outlined">dashboard</span>{" "}
                Dashboard
              </div>
              <div className="flex items-center gap-3 text-white/40 bg-primary/5 p-2 rounded-lg -mx-2">
                <span className="material-symbols-outlined">groups</span>{" "}
                Clients
              </div>
              <div className="flex items-center gap-3 text-white/40">
                <span className="material-symbols-outlined">folder</span>{" "}
                Projects
              </div>
              <div className="flex items-center gap-3 text-white/40">
                <span className="material-symbols-outlined">payments</span>{" "}
                Invoices
              </div>
            </div>
          </div>
          <div className="flex-1 p-8 bg-gradient-to-br from-white/[0.02] to-transparent overflow-y-auto">
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 glass-card p-6 rounded-2xl border border-white/10">
                <h4 className="font-bold mb-4">Revenue Analytics</h4>
                <div className="h-40 flex items-end gap-2 px-2">
                  <div className="w-full bg-primarys/20 h-2/3 rounded-t-lg"></div>
                  <div className="w-full bg-primarys/40 h-1/2 rounded-t-lg"></div>
                  <div className="w-full bg-primarys/60 h-3/4 rounded-t-lg"></div>
                  <div className="w-full bg-primarys h-full rounded-t-lg"></div>
                  <div className="w-full bg-primarys/40 h-2/3 rounded-t-lg"></div>
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-white/10">
                <h4 className="font-bold mb-2">Active Projects</h4>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-white/10">
                <h4 className="font-bold mb-2">Total Invoiced</h4>
                <p className="text-3xl font-bold text-tertiary">$42,500</p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Floating cards --> */}
        <div
          className="absolute -top-10 -right-10 glass-panel p-4 rounded-2xl border border-white/20 shadow-2xl hidden lg:block animate-float"
           style={{ animationDelay: "1s" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div>
              <p className="text-xs text-white/50">Invoice Paid</p>
              <p className="font-bold">+$4,250.00</p>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-20 -left-20 glass-panel p-4 rounded-2xl border border-white/20 shadow-2xl hidden lg:block animate-float"
          style={{ animationDelay: "2s" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primarys/20 flex items-center justify-center text-primarys">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <div>
              <p className="text-xs text-white/50">Next Deadline</p>
              <p className="font-bold">In 2 days</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
