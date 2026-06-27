"use client";

import CTA from "@/components/landingpage/CTA";
import Dashboard from "@/components/landingpage/Dashboard";
import FAQ from "@/components/landingpage/FAQ";
import FeaturesSection from "@/components/landingpage/FeaturesSection";
import Footer from "@/components/landingpage/Footer";
import Herosection from "@/components/landingpage/Herosection";
import HowitWorks from "@/components/landingpage/HowitWorks";
import Navbar from "@/components/landingpage/navbar";
import Pricing from "@/components/landingpage/Pricing";
import Stats from "@/components/landingpage/Stats";
import Testitmonal from "@/components/landingpage/Testitmonal";
import Trusted from "@/components/landingpage/Trusted";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <Navbar />
      <div className="pt-32">
        <Herosection />
        <Trusted />
        <FeaturesSection />
        <Dashboard />
        <HowitWorks />
        <Stats />
        <Testitmonal />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </div>

      {/* <Link href={"/login"}>
        <button>Login</button>
      </Link>

      <br />
      <Link href={"/getstarted"}>
        <button>Get started</button>
      </Link> */}
    </div>
  );
}
