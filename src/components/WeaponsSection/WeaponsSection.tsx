import { useState } from "react";

import { useTranslations } from "../../contexts/TranslationContext";

import classes from "./WeaponsSection.module.css";

type WeaponKey = "swordAndBuckler" | "longsword" | "sabre" | "rapier";

type Weapon = {
  id: string;
  translationKey: WeaponKey;
  imagePath: string;
};

const WEAPONS: Weapon[] = [
  {
    id: "sword-buckler",
    translationKey: "swordAndBuckler",
    imagePath: `${import.meta.env.BASE_URL}images/Serm-6.jpg`,
  },
  {
    id: "longsword",
    translationKey: "longsword",
    imagePath: `${import.meta.env.BASE_URL}images/Serm-127.jpg`,
  },
  {
    id: "sabre",
    translationKey: "sabre",
    imagePath: `${import.meta.env.BASE_URL}images/Serm-149.jpg`,
  },
  {
    id: "rapier",
    translationKey: "rapier",
    imagePath: `${import.meta.env.BASE_URL}images/Serm-140.jpg`,
  },
];

const WeaponsSection = () => {
  const { translations } = useTranslations();

  const [selectedWeapon, setSelectedWeapon] = useState<Weapon>(WEAPONS[1]!);

  return (
    <section className={classes.wrapper} id="weapons">
      <h1 className={classes.header}>{translations.weapons.header}</h1>
      <div className={classes["images-container"]}>
        {WEAPONS.map((weapon) => (
          <div
            key={weapon.id}
            className={`${classes["image-wrapper"]} ${
              selectedWeapon.id === weapon.id
                ? classes["image-wrapper--active"]
                : ""
            }`}
            onMouseEnter={() => setSelectedWeapon(weapon)}
          >
            <img
              src={weapon.imagePath}
              alt={translations.weapons[selectedWeapon.translationKey].name}
              className={classes.image}
            />
          </div>
        ))}
      </div>
      <div className={classes.content}>
        <h2>{translations.weapons[selectedWeapon.translationKey].name}</h2>
        <p>{translations.weapons[selectedWeapon.translationKey].description}</p>
      </div>
    </section>
  );
};

export default WeaponsSection;
