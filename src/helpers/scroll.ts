export const scrollToElement = (targetId: string) => {
  const section = document.getElementById(targetId);

  if (section) {
    const sectionRect = section.getBoundingClientRect();
    const sectionCenter = sectionRect.top + sectionRect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const scrollOffset = window.scrollY + sectionCenter - viewportCenter;

    window.scrollTo({
      top: scrollOffset,
      behavior: "smooth",
    });
  }
};
