import { HeroSection } from "@/components/sections/HeroSection";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative bg-nitro-black">
        <HeroSection />
      </main>
    </>
  );
}
