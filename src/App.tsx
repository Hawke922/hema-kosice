import LandingSection from "./components/LandingSection/LandingSection";
import HemaSection from "./components/HemaSection/HemaSection";
import WeaponsSection from "./components/WeaponsSection/WeaponsSection";
import TeamSection from "./components/TeamSection/TeamSection";
import JoinSection from "./components/JoinSection/JoinSection";

import classes from "./App.module.css";

const App = () => (
  <main className={classes["main-wrapper"]}>
    <LandingSection />
    <HemaSection />
    <WeaponsSection />
    <TeamSection />
    <JoinSection />
  </main>
);

export default App;
