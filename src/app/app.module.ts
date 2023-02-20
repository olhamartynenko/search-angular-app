import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SearchCityPageComponent } from './components/serach-city-page/search-city-page.component';
import { AppPaginationComponent } from './components/app-pagination/app-pagination.component';
import { CitiesListComponent } from './components/cities-list/cities-list.component';
import { CityCardComponent } from './components/city-card/city-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppSearchComponent } from './components/app-search/app-search.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchCityPageComponent,
    AppPaginationComponent,
    CitiesListComponent,
    CityCardComponent,
    AppSearchComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
