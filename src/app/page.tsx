import { HeroSection } from "@/components/sections/HeroSection";
import { ClimateIntro } from "@/components/sections/ClimateIntro";
import CausesSection from "@/components/sections/CausesSection";
import { ImpactStats } from "@/components/sections/ImpactStats";
import IndiaImpactSection from "@/components/sections/IndiaImpactSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import CarbonCalculator from "@/components/sections/CarbonCalculator";

export default function Home() {
  return (
    <div className="w-full bg-nb-bg">
      <HeroSection />
      <ClimateIntro />
      <CausesSection />
      <ImpactStats />
      <IndiaImpactSection />
      <CarbonCalculator />
      <SolutionsSection />
    </div>
  );
}
