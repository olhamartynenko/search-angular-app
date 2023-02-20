import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  QueryParamsHandling,
  Router,
} from '@angular/router';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';

import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'search-city-page',
  templateUrl: './search-city-page.component.html',
  styleUrls: ['./search-city-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCityPageComponent implements OnInit, OnDestroy {
  cities$: Observable<City[]> = this.cityService.cities$;
  totalCitiesAmount$: Observable<number> = this.cityService.totalCititesAmount$;

  currentPage!: number;
  citiiesPerPage: number = 40;

  private onDestroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cityService: CityService
  ) {}

  ngOnInit(): void {
    this.initRouterEventsListener();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private initRouterEventsListener(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        map((event: NavigationEnd) => event.urlAfterRedirects),
        takeUntil(this.onDestroy$)
      )
      .subscribe((url: string) => {
        const params = this.router.parseUrl(url).queryParams;

        this.currentPage = Number(params['page'] || '1');

        this.cityService.getCities({
          ...params,
          page: this.currentPage,
          limit: this.citiiesPerPage,
        });
      });
  }

  onPageChanged(page: number) {
    this.navigateTo({ page }, 'merge');
  }

  onSearchChanged(search: string): void {
    const queryParams = search ? { search, page: 1 } : {};

    const queryParamsHandling = search ? 'merge' : '';

    this.navigateTo(queryParams, queryParamsHandling);
  }

  onUpdateCity(city: City): void {
    this.cityService.updateCity(city);
  }

  private navigateTo(
    queryParams: any,
    queryParamsHandling: QueryParamsHandling
  ): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling,
    });
  }
}
