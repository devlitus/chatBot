import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Dropdown } from "../../../../components/ui/dropdown/Dropdown";

// Mock de los hooks para evitar llamadas a API reales
vi.mock("@/hooks/useDropdown", () => ({
  useDropdown: () => ({
    listModels: [],
    fetchModels: vi.fn().mockResolvedValue([]),
  }),
}));

vi.mock("@/stores/listModel", () => ({
  useListModelStore: () => ({
    selectedModel: "Modelos LLM",
    setSelectedModel: vi.fn(),
  }),
}));

// Mock del componente ArrowDown para simplificar la prueba
vi.mock("../../../icons/ArrowDown", () => ({
  ArrowDown: () => <div data-testid="arrow-icon" />,
}));

describe("Dropdown Component", () => {
  it("renders the dropdown component", () => {
    render(<Dropdown />);

    // Verificar que el texto "Seleccionar modelo" está presente
    expect(screen.getByText("Seleccionar modelo LLM")).toBeInTheDocument();
  });
});
