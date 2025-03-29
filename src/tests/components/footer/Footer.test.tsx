import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/footer/Footer";

// Importar la configuración de mocks
import "@/tests/setup/mockModules";

describe("Footer Component", () => {
  // Limpiar todos los mocks antes de cada test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component", () => {
    render(<Footer />);

    // Verificar que el componente se renderiza
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });
});
