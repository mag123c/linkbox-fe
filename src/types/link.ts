import { ApiResponse } from './api-response';

export interface Link {
    id: number;
    url: string;
    memo: string;
    categoryId: number;
}

export type LinkListResponse = ApiResponse<Link[]>;
export type LinkResponse = ApiResponse<Link>;
