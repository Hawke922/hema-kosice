import LandingSection from "./components/LandingSection/LandingSection";
import AboutSection from "./components/AboutSection/AboutSection";
import HemaSection from "./components/HemaSection/HemaSection";
import JoinSection from "./components/JoinSection/JoinSection";
import TeamSection from "./components/TeamSection/TeamSection";

import classes from "./App.module.css";

function App() {
  return (
    <main className={classes["main-wrapper"]}>
      <LandingSection />
      <AboutSection />
      <HemaSection />
      <TeamSection />
      <JoinSection />
    </main>
  );
}

export default App;
