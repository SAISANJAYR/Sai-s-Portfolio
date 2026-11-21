import HeroScroll from "@/components/site/home/HeroScroll";
import Identity from "@/components/site/home/Identity";
import WorkSlides from "@/components/site/home/WorkSlides";
import Stack from "@/components/site/home/Stack";
import OffClock from "@/components/site/home/OffClock";
import SiteFooter from "@/components/site/SiteFooter";

export default function HomePage() {
  return (
    <>
      <main id="main" className="main--rounded">
        <HeroScroll>
          <Identity />
        </HeroScroll>
        <WorkSlides />
        <Stack />
        <OffClock />
      </main>
      <SiteFooter />
    </>
  );
}
