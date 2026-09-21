import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { WeekActivities } from "./components/WeekActivities";
import { MonthCalendar } from "./components/MonthCalendar";
import { StayInTheLoop } from "./components/StayInTheLoop";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WeekActivities />
        <MonthCalendar />
        <StayInTheLoop />
      </main>
      <Footer />
    </>
  );
}
