import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Timeline from "@/components/timeline/Timeline";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Timeline · Joel Blackham",
  description: "My educational and industry timeline.",
};

export default function TimelinePage() {
  return (
    <div className="relative flex flex-1 flex-col overflow-x-clip">
      <Navbar />
      <Timeline />
      <Footer />
    </div>
  );
}
