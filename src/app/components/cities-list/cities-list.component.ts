import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { City } from 'src/app/models/city.model';

@Component({
  selector: 'cities-list-component',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesListComponent {
  @Input() cities!: City[] | null;

  @Output() updateCity: EventEmitter<City> = new EventEmitter<City>();

  public onUpdateCity(city: City) {
    this.updateCity.emit(city);
  }

  public trackByCityId(_index: number, city: City): string {
    return city.id;
  }
}
