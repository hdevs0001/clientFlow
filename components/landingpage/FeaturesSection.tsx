export default function FeaturesSection() {
  return (
    <section
      className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-32"
      id="features"
    >
      <div className="text-center mb-16">
        <h2
          className="headline-lg text-headline-lg md:text-headline-lg mb-4 font-heading"
          // style={{
          //   fontFamily: "var(--font-heading)",
          //   fontWeight: 800,
          // }}
        >
          Everything You Need. <br />
          Nothing You Don't.
        </h2>
        <p className="text-on-surface-variant max-w-4xl mx-auto text-lg font-body" >
          A cohesive suite of tools designed to streamline your entire freelance
          workflow.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-card interactive-card p-8 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-primarys/10 flex items-center justify-center mb-6 text-primarys border border-primarys/20">
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              person_search
            </span>
          </div>
          <h3 className="font-headline-md text-xl mb-3">Client Management</h3>
          <p className="text-on-surface-variant">
            Keep track of every interaction, contract, and deliverable in one
            centralized profile.
          </p>
        </div>
        <div className="glass-card interactive-card p-8 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center mb-6 text-tertiary border border-tertiary/20">
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              timeline
            </span>
          </div>
          <h3 className="font-headline-md text-xl mb-3">Project Tracking</h3>
          <p className="text-on-surface-variant">
            Visualize timelines with high-fidelity Gantt charts and intuitive
            custom workflows.
          </p>
        </div>
        <div className="glass-card interactive-card p-8 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center mb-6 text-primary-container border border-primary-container/20">
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              task_alt
            </span>
          </div>
          <h3 className="font-headline-md text-xl mb-3">Task Management</h3>
          <p className="text-on-surface-variant">
            Organize priorities with lightning-fast Kanban boards and
            keyboard-first entry.
          </p>
        </div>
        <div className="glass-card interactive-card p-8 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 text-secondary border border-secondary/20">
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              receipt_long
            </span>
          </div>
          <h3 className="font-headline-md text-xl mb-3">Invoice Generator</h3>
          <p className="text-on-surface-variant">
            Generate stunning, on-brand invoices in seconds and accept payments
            instantly via Stripe.
          </p>
        </div>
        <div className="glass-card interactive-card p-8 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-primarys/10 flex items-center justify-center mb-6 text-primarys border border-primarys/20">
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              analytics
            </span>
          </div>
          <h3 className="font-headline-md text-xl mb-3">Analytics Dashboard</h3>
          <p className="text-on-surface-variant">
            Gain deep insights into your revenue, project profitability, and
            client retention.
          </p>
        </div>
        <div className="glass-card interactive-card p-8 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center mb-6 text-tertiary border border-tertiary/20">
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              groups
            </span>
          </div>
          <h3 className="font-headline-md text-xl mb-3">Team Collaboration</h3>
          <p className="text-on-surface-variant">
            Invite subcontractors, share specific views, and communicate
            contextually on tasks.
          </p>
        </div>
      </div>
    </section>
  );
}
