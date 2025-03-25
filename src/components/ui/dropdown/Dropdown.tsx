import { useEffect, useState } from "react";
import { Button } from "../button/Button";
import "./Dropdown.css";
import { ArrowDown } from "../../icons/ArrowDown";
import { useDropdown } from "@/hooks/useDropdown";
import { useListModelStore } from "@/stores/listModel";
import { ModelResponse } from "@/types/modelResponse";

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { listModels, fetchModels } = useDropdown();
  const { selectedModel, setSelectedModel } = useListModelStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      setIsLoading(true);
      await fetchModels();
      setIsLoading(false);
    };
    loadModels();
  }, [fetchModels]);

  const handleSelect = (modelId: string) => {
    setSelectedModel(modelId);
    setIsOpen(false);
  };

  // Función para formatear el tamaño del contexto
  const formatContextSize = (size: number) => {
    if (!size) return null;
    if (size >= 1000000) return `${(size / 1000000).toFixed(1)}M`;
    if (size >= 1000) return `${(size / 1000).toFixed(1)}K`;
    return size.toString();
  };

  return (
    <div className="dropdown">
      <Button
        variant="primary"
        className={`dropdown-trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedModel || "Seleccionar modelo"}
        <ArrowDown className="ml-4" isOpen={isOpen} />
      </Button>

      {isOpen && (
        <div className="w-full dropdown-menu">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="spinner"></div>
              <div className="mt-2">Cargando modelos...</div>
            </div>
          ) : listModels.length === 0 ? (
            <div className="p-4 text-center">
              No se encontraron modelos disponibles
            </div>
          ) : (
            listModels.map((companyOption) => (
              <div key={companyOption.label} className="company-group">
                <div className="company-label">{companyOption.label}</div>
                {companyOption.options.map((model: ModelResponse) => (
                  <Button
                    key={model.id}
                    variant="secondary"
                    size="sm"
                    className={`dropdown-item ${
                      model.id === selectedModel ? "selected" : ""
                    }`}
                    onClick={() => handleSelect(model.id)}
                  >
                    <div className="flex flex-col">
                      <div className="model-name">{model.id}</div>
                      <div className="flex items-center">
                        <div className="model-company text-xs opacity-70">
                          {model.owned_by}
                        </div>
                        {model.context_window && (
                          <div className="ml-auto">
                            <span
                              className="capability-badge"
                              title="Tamaño de contexto"
                            >
                              {formatContextSize(model.context_window)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
