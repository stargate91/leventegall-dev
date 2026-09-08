import HomeContent from "@/components/HomeContent";
import StructuredData from "@/components/StructuredData";
import { LocaleProvider } from "@/locales";

export default function HungarianHomePage() {
  return (
    <>
      <StructuredData locale="hu" />
      <LocaleProvider initialLocale="hu">
        <HomeContent />
      </LocaleProvider>
    </>
  );
}
