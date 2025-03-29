export interface ApiResponse<T> {
  data: T;
  object: string;
  has_more?: boolean;
  last_id?: string | null;
}
