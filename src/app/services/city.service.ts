import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';

import {
  City,
  GetCitiesRequestParams,
  GetCitiesResponse,
} from '../models/city.model';
import { MockBackendService } from './mock-backend.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  _cities$ = new BehaviorSubject<City[]>([]);
  cities$ = this._cities$ as Observable<City[]>;

  _totalCititesAmount$ = new BehaviorSubject<number>(0);
  totalCititesAmount$ = this._totalCititesAmount$ as Observable<number>;

  private searchQuery!: GetCitiesRequestParams;

  constructor(private mockBackendService: MockBackendService) {}

  public getCities(query: GetCitiesRequestParams): void {
    this.setSearchQuery(query);

    this.mockBackendService
      .getCities(query)
      .pipe(catchError(() => of({ cities: [], total: 0 })))
      .subscribe((response: GetCitiesResponse) => {
        this._cities$.next(response.cities);
        this._totalCititesAmount$.next(response.total);
      });
  }

  public updateCity(city: City): void {
    this.mockBackendService.updateCity(city);

    this.getCities(this.searchQuery);
  }

  private setSearchQuery(query: GetCitiesRequestParams): void {
    this.searchQuery = query;
  }
}
