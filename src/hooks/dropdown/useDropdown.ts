import { useCallback } from "react";
import { useListModelStore } from "@/stores/listModel/listModel";
import { getListModels } from "@/services/get/getListModels";

export function useDropdown() {
  const { listModels, setListModels } = useListModelStore();
  
  const fetchModels = useCallback(async () => {
    try {
      const response = await getListModels();
      if (response.length > 0) {
        setListModels(response);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  }, [setListModels]);

  return {  
    listModels,
    fetchModels
  }
}
