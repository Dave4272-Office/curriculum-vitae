import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Interests } from "./details/content/interests";

test("renders interests heading", () => {
  render(<Interests />);
  expect(
    screen.getByRole("heading", { name: /Interests/i }),
  ).toBeInTheDocument();
});
