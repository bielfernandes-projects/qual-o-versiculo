import { Suspense } from "react";
import { Header } from "@/components/header";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { SearchSection } from "@/components/search-section";
import { DailyVerseFetcher, DailyVerseSkeleton } from "@/components/daily-verse-fetcher";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Header />
      <AdPlaceholder height="sm" />
      <SearchSection
        dailyVerse={
          <Suspense fallback={<DailyVerseSkeleton />}>
            <DailyVerseFetcher />
          </Suspense>
        }
      />
      <AdPlaceholder height="lg" />
    </main>
  );
}
