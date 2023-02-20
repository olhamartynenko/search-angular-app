import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  public searchForm: FormGroup = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  get searchControl() {
    return this.searchForm?.get('search');
  }

  ngOnInit(): void {
    if (location.search) {
      this.fillFormWithUrlQuery();
    }
  }

  fillFormWithUrlQuery(): void {
    this.searchControl?.setValue(
      new URLSearchParams(location.search).get('search')
    );
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      return;
    }

    this.search.emit(this.searchControl?.value);
  }

  onResetSearch() {
    this.searchForm.reset();
    this.search.emit('');
  }
}
