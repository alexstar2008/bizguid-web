import {Component, Input,EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() amountOfItems: number;
  @Input() currentPage: number;
  @Input() itemsPerPage: number;

  @Output() getPrev = new EventEmitter();
  @Output() getNext = new EventEmitter();
  @Output() getPage = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.amountOfItems / this.itemsPerPage);
    const prevPageAmount = this.currentPage > 5 ? this.currentPage - 5 : 1;
    const nextPageAmount = totalPages - this.currentPage > 5 ? this.currentPage + 5 : totalPages;

    const pagesArr = [];
    for (let i = prevPageAmount; i <= nextPageAmount; i++) {
      pagesArr.push(i);
    }
    return pagesArr;
  }

  hasNextPage(): boolean {
    return this.itemsPerPage * this.currentPage <= this.amountOfItems;
  }
}
