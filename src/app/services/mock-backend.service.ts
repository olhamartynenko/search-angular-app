import { Injectable } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';

import {
  City,
  GetCitiesRequestParams,
  GetCitiesResponse,
} from '../models/city.model';
import { isIncludesSubstr, replaceItemByProperty } from '../utils/helpers';
import { LocalStorageService } from './local-store.service';

import { HttpClient } from '@angular/common/http';
import { CITY_LOCAL_STORAGE_KEY } from '../constants/base.constants';

@Injectable({ providedIn: 'root' })
export class MockBackendService {
  allCitiesData: City[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {}

  getCities(query: GetCitiesRequestParams): Observable<GetCitiesResponse> {
    const citiesData = this.localStorageService.getItem(CITY_LOCAL_STORAGE_KEY);

    if (citiesData) {
      return this.getCitiesByQuery(citiesData, query);
    }

    return this.http.get<City[]>('../../assets/data/cities.json').pipe(
      tap((cities: City[]) =>
        this.localStorageService.setItem(CITY_LOCAL_STORAGE_KEY, cities)
      ),
      switchMap((cities: City[]) => this.getCitiesByQuery(cities, query))
    );
  }

  private getCitiesByQuery(
    cities: City[],
    query: GetCitiesRequestParams
  ): Observable<GetCitiesResponse> {
    const { search, limit, page } = query;
    let foundCities = cities;

    if (search) {
      foundCities = cities.filter(({ name }) => isIncludesSubstr(name, search));
    }

    const citiesForPage = this.getCitiesPerPage(foundCities, page, limit);

    return of({
      cities: citiesForPage,
      total: foundCities.length,
    });
  }

  private getCitiesPerPage(
    cities: City[],
    pageNumber: number,
    limit: number
  ): City[] {
    if (cities.length < limit) {
      return cities;
    }

    const startFrom = (pageNumber - 1) * limit;
    const end = pageNumber * limit;

    return cities.slice(startFrom, end);
  }

  public updateCity(city: City): void {
    const cities = this.localStorageService.getItem(CITY_LOCAL_STORAGE_KEY);
    const updatedCities = replaceItemByProperty(cities, city, 'id');

    this.localStorageService.setItem(CITY_LOCAL_STORAGE_KEY, updatedCities);
  }
}
