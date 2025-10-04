import LandingSection from "./components/LandingSection/LandingSection";
import AboutSection from "./components/AboutSection/AboutSection";
import HemaSection from "./components/HemaSection/HemaSection";
import JoinSection from "./components/JoinSection/JoinSection";
import TeamSection from "./components/TeamSection/TeamSection";

import "./App.css";

function App() {
  return (
    <>
      <LandingSection />
      <AboutSection />
      <HemaSection
        imagePaths={[
          "/images/Serm-83.jpg",
          "/images/Serm-102.jpg",
          "/images/Serm-139.jpg",
          "/images/Serm-161.jpg",
        ]}
      />
      <JoinSection />
      <TeamSection />
    </>
  );
}

export default App;
