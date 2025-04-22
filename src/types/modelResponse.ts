export interface ModelResponse {
  id: string;
  object: string;
  created: number;
  ownedBy: string;
  active: boolean;
  contextWindow: number;
  publicApps: unknown;
}

export interface GroqModelResponse {
  id: string;
  object: string;
  created: number;
  owned_by: string;
  active?: boolean;
  context_window?: number;
  public_apps?: unknown;
}