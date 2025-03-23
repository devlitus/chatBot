import { useEffect, useState } from "react";
import { Button } from "../button/Button";
import "./Dropdown.css";
import { ArrowDown } from "../../icons/ArrowDown";
import { useDropdown } from "@/hooks/useDropdown";
import { useListModelStore } from "@/stores/listModel";

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { listModels, fetchModels } = useDropdown();
  const { selectedModel, setSelectedModel } = useListModelStore();

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const handleSelect = (modelId: string) => {
    setSelectedModel(modelId);
    setIsOpen(false);
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
          {listModels.map((option) => (
            <Button
              key={option.options[0].id}
              variant="secondary"
              size="sm"
              className={`dropdown-item ${
                option.options[0].id === selectedModel ? "selected" : ""
              }`}
              onClick={() => handleSelect(option.options[0].id)}
            >
              {option.label}
              <br />
              {option.options[0].owned_by}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
