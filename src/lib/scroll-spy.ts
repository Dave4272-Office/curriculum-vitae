export function activeSectionId(
  sections: ReadonlyArray<{ id: string; top: number }>,
  scrollY: number,
  spyOffset = 88,
): string {
  if (scrollY <= 16) {
    return "about";
  }

  let current = "about";
  for (const section of sections) {
    if (section.id === "about") {
      continue;
    }
    if (section.top <= spyOffset) {
      current = section.id;
    }
  }
  return current;
}
