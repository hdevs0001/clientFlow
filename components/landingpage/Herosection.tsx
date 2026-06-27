"use client"
export default function Herosection() {
  
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center mb-32 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] z-[-1] animate-pulse-slow"></div>
      <h1
        className="font-display-2xl text-5xl md:text-[80px] mb-6 max-w-5xl mx-auto leading-tight"
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight:800
        }}
      >
        Manage Clients, Projects &amp; Invoices From One
        <span className="gradient-text">Powerful Workspace</span>
      </h1>
      <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
        The high-end freelance management platform built for modern creatives.
        Stop juggling tools and start focusing on your craft.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
        <button className="glow-button bg-primarys text-on-primary px-8 py-4 rounded-xl font-label-sm font-bold w-full sm:w-auto">
          Start Free Today
        </button>
        <button className="glass-card text-on-surface px-8 py-4 rounded-xl font-label-sm font-bold w-full sm:w-auto hover:text-primarys transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">play_circle</span> Watch
          Demo
        </button>
      </div>
      {/* <!-- Dashboard Mockup --> */}
      <div className="animate-float relative w-full max-w-5xl mx-auto rounded-2xl glass-panel p-4 md:p-6 shadow-[0_0_80px_rgba(208,188,255,0.1)] border border-white/10">
        <img
          alt="Dashboard mockup"
          className="w-full h-auto rounded-lg shadow-2xl opacity-90"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIwh3dbSTQeJ3TJ-VRemXkSyn0Gg-ZnG18COlEU_DIPntnx9G8S1NMt0mN4voBtrTOURkFJxFwFKA7Gpd7W5aq8Cy9hYZds4pWLB28ooJWo75zVIb22iFDNDwcMMAFl3ottaZIjixlFhMcJJ0kvL2ayj1v5xflb49s4WjpG_4GGQdsPiHFC6BkDZNFZGdIbQpT4oQgmg-VSmEstLnrbRlcR-U11EFVpTdAOZ5FPXdzFoZphJ3AXCTTWoxfIXt4T-riQq10mxcfj7_B"
        />
      </div>
    </section>
  );
}
