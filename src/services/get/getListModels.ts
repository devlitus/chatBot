import { GROQ_API_KEY, GROQ_URL } from "../../constants";
import { ModelOption } from "../../types/modelOtions";
import { ModelResponse } from "../../types/modelResponse";

export const mapModelResponse = (model: ModelResponse): ModelOption => ({
  label: model.id,
  options: [model]
});

export const getListModels = async (): Promise<ModelOption[]> => {

  try {
    const response = await fetch(GROQ_URL, {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
    });
    const {data} = await response.json();
    return Array.isArray(data) ? data.map(mapModelResponse) : [];
  } catch (error: unknown) {
    console.error(`Error al obtener los modelos: ${error}`);
    return [];
  }
};
