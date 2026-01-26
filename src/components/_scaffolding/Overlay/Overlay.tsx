import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "../Icon/Icon";
import classes from "./Overlay.module.css";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Overlay = ({ isOpen, onClose, children }: OverlayProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match animation duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!shouldRender) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [shouldRender]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const overlayRoot = document.getElementById("overlay-root");
  if (!overlayRoot) return null;

  return createPortal(
    <div
      className={`${classes.overlay} ${isAnimating ? classes.open : ""}`}
      onClick={onClose}
    >
      <div
        className={`${classes.content} ${isAnimating ? classes.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={classes["close-button"]}
          onClick={onClose}
          aria-label="Close overlay"
        >
          <Icon name="cross" size={24} className={classes["close-icon"]} />
        </button>
        {children}
      </div>
    </div>,
    overlayRoot,
  );
};

export default Overlay;
