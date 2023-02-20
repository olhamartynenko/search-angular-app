import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { createArrayFromNumber } from 'src/app/utils/helpers';

@Component({
  selector: 'app-pagination',
  templateUrl: './app-pagination.component.html',
  styleUrls: ['./app-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPaginationComponent {
  pages: number[] = [];

  @Input() itemsPerPage: number = 40;
  @Input() currentPage!: number;
  @Input() set totalPages(value: number | null) {
    if (value) {
      this.pages = this.setPages(value);
    }
  }

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  private setPages(items: number): number[] {
    const numberOfPages = Math.ceil(items / this.itemsPerPage);

    return createArrayFromNumber(numberOfPages);
  }

  public onPageChanged(page: number): void {
    this.pageChanged.emit(page);
  }

  public trackByPage(index: number, page: number): number {
    return index + page;
  }
}
