import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { TristateToggle } from "./TristateToggle";

describe("TristateToggle tests", () => {
  test("component renders", () => {
    const mockFn = vi.fn();
    render(<TristateToggle onToggleStateChange={mockFn} />);
  });
});
