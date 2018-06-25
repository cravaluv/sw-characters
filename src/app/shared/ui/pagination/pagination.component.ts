import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "ak-pagination",

  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnChanges {

  @Input() public pageSize: number;

  @Input() public itemsCount: number;

  _currentPage = 0;

  @Input()
  get currentPage() {
    return this._currentPage;
  }

  @Output() pageChanged = new EventEmitter();

  set currentPage(val) {
    this._currentPage = val;
    this.pageChanged.emit(this._currentPage);
  }

  public totalPages: any = [];
  public pages: any = [];
  public itemsRange = {
    from: 1,
    to: 0
  };

  constructor() {
    this.pageSize = 10;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculatePageNumbers();
    this.calculateCurrentItemsRange();
  }

  public calculatePageNumbers() {
    const pages = Math.ceil(this.itemsCount / this.pageSize);
    this.totalPages = [];
    for (let y = 0; y < pages; y++) {
      this.totalPages[y] = y + 1;
    }
    if (this._currentPage >= pages - 2) {
      this.pages = this.totalPages.slice(pages - 5, pages);
    } else if (this._currentPage <= 2) {
      this.pages = this.totalPages.slice(0, 5);
    } else {
      this.pages = this.totalPages.slice(this._currentPage - 3, this._currentPage + 2);
    }
  }

  public navigateToPage(pageNo: number) {
    this.currentPage = pageNo;
  }


  public getNextPagesArrayToDisplay() {
    let startIndex = this.currentPage - 3 >= 0 ? this.currentPage - 3 : 0;
    let endIndex = this.currentPage + 2 < 5 ? 5 : this.currentPage + 2;
    if (endIndex > this.totalPages.length) {
      endIndex = this.totalPages.length;
      startIndex =
        this.totalPages.length - 5 < 0 ? 0 : this.totalPages.length - 5;
    }
    this.pages = this.totalPages.slice(startIndex, endIndex);
  }

  public nextPage() {
    this.navigateToPage(this.currentPage + 1);
  }

  public previousPage() {
    this.navigateToPage(this.currentPage - 1);
  }

  public calculateCurrentItemsRange() {
    if (this.itemsCount === 0) {
      this.itemsRange.to = 0;
      this.itemsRange.from = 0;
      return;
    }
    this.itemsRange.from = this.pageSize * this.currentPage - this.pageSize + 1;
    if (this.currentPage === this.pages[this.pages.length - 1]) {
      this.itemsRange.to = this.itemsCount;
      return;
    }
    this.itemsRange.to = this.pageSize * this.currentPage;
  }
}
