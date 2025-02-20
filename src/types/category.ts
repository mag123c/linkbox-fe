import { ApiResponse } from './api-response';

export interface Category {
    id: number;
    name: string;
}

export type CategoryListResponse = ApiResponse<Category[]>;
export type CategoryResponse = ApiResponse<Category>;
