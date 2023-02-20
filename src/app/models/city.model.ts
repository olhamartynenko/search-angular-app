export interface City {
  id: string;
  name: string;
  photo: string;
}

export interface BaseUrlQuery {
  page?: number;
  search?: string;
}

export interface GetCitiesRequestParams extends BaseUrlQuery {
  limit: number;
  page: number;
}

export interface GetCitiesResponse {
  cities: City[];
  total: number;
}
