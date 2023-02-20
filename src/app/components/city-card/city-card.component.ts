import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { NOT_FOUND_CITY_IMAGE } from 'src/app/constants/base.constants';
import { City } from 'src/app/models/city.model';

@Component({
  selector: 'city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  defaultImage: string = NOT_FOUND_CITY_IMAGE;
  isCardEditing: boolean = false;
  nameFormControl: FormControl = new FormControl('', Validators.required);
  cityData!: City;
  imageUrl!: string;

  @Input() set city(city: City) {
    this.setCardData(city);
  }

  @Output() updateCity: EventEmitter<City> = new EventEmitter<City>();

  @ViewChild('nameInput') cityNameInput!: ElementRef;

  constructor(private cd: ChangeDetectorRef) {}

  public toggleEditCard() {
    this.isCardEditing = !this.isCardEditing;

    if (this.isCardEditing) {
      this.cityNameInput.nativeElement.focus();
    }
  }

  public onUpdateCity(): void {
    this.toggleEditCard();

    const name = this.nameFormControl.value;

    this.updateCity.emit({
      ...this.cityData,
      name,
      photo: this.imageUrl || this.cityData.photo,
    });
  }

  public onLoadImageError(event: any) {
    event.target.src = this.defaultImage;
  }

  public onImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      this.cd.markForCheck();
    };

    reader.readAsDataURL(files[0]);
  }

  public onEditCancel(): void {
    this.toggleEditCard();

    this.nameFormControl.setValue(this.cityData.name);
    this.imageUrl = this.cityData.photo;
  }

  private setCardData(city: City): void {
    this.cityData = city;
    this.imageUrl = city.photo;
    this.nameFormControl.setValue(city.name);
  }
}
