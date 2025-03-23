import { useCallback } from "react";
import { useListModelStore } from "@/stores/listModel";
import { getListModels } from "@/services/get/getListModels";

export function useDropdown() {
  const { listModels, setListModels } = useListModelStore();
  
  const fetchModels = useCallback(async () => {
    try {
      const response = await getListModels();
      console.log(response);
      setListModels(response);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  }, [setListModels]);

  return {  
    listModels,
    fetchModels
  }
}
