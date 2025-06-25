import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ColumnConfigProvider } from "@context/ColumnConfigProvider";
import { useColumnResizer } from "@hooks/useColumnResizer";
import type { ColumnConfig } from "@src/types/index";

const mockConfig: ColumnConfig<"testTable"> = {
  testTable: [{ id: "name", label: "Name", width: "100px" }],
};

function TestComponent() {
  const { getContextConfig } = useColumnResizer({ context: "testTable" });

  const config = getContextConfig("testTable");

  return <div data-testid="column-label">{config[0].label}</div>;
}

describe("useColumnResizer", () => {
  it("provides initial column config correctly", () => {
    const { getByTestId } = render(
      <ColumnConfigProvider initialConfig={mockConfig}>
        <TestComponent />
      </ColumnConfigProvider>
    );

    expect(getByTestId("column-label").textContent).toBe("Name");
  });
});
