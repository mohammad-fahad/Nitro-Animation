import { Navbar } from "@/components/layout/Navbar";
import { ScrollExperience } from "@/components/sections/ScrollExperience";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative bg-nitro-black">
        <ScrollExperience />
      </main>
    </>
  );
}
