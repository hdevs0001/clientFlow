export default function Footer() {
  return (
    <footer className=" border-t border-white/5 pt-20 pb-10">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 text-primarys mb-6">
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                auto_graph
              </span>
              <span className="font-headline-md text-xl font-bold text-on-surface tracking-tight">
                ClientFlow
              </span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
              The high-end workspace for modern freelancers and creative
              studios.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-6">Product</h5>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li>
                <a className="hover:text-primarys transition-colors" href="#">
                  Features
                </a>
              </li>
              <li>
                <a className="hover:text-primarys transition-colors" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-primarys transition-colors" href="#">
                  Integrations
                </a>
              </li>
              <li>
                <a className="hover:text-primarys transition-colors" href="#">
                  Changelog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Legal</h5>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li>
                <a className="hover:text-primarys transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-primarys transition-colors" href="#">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="hover:text-primarys transition-colors" href="#">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Social</h5>
            <div className="flex gap-4 text-on-surface-variant">
              <a className="hover:text-primarys transition-colors" href="#">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a className="hover:text-primarys transition-colors" href="#">
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
              </a>
              <a className="hover:text-primarys transition-colors" href="#">
                <span className="material-symbols-outlined">terminal</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-4">
          <p className="text-sm text-white/30">
            © 2024 ClientFlow Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              className="text-sm text-white/30 hover:text-primarys transition-colors"
              href="#"
            >
              Twitter
            </a>
            <a
              className="text-sm text-white/30 hover:text-primarys transition-colors"
              href="https://www.linkedin.com/in/harmanpreet-singh-9a218a41a/"
            >
              LinkedIn
            </a>
            <a
              className="text-sm text-white/30 hover:text-primarys transition-colors"
              href="https://github.com/hdevs0001"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
