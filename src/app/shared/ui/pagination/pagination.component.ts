import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "ak-pagination",

  templateUrl: './pagination.component.html'
})

/**
 * Custom pagination component
 */
export class PaginationComponent implements OnChanges {

  // Size of a single page
  @Input() public pageSize: number;

  // Total items count
  @Input() public itemsCount: number;

  // Actual selected page
  _currentPage = 0;

  @Input()
  get currentPage() {
    return this._currentPage;
  }

  // Emits when current selected page changed
  @Output() pageChanged = new EventEmitter();

  set currentPage(val) {
    this._currentPage = val;
    this.pageChanged.emit(this._currentPage);
  }

  // Table of all available pages
  public totalPages: number[] = [];

  // Available pages to select on UI
  public pages: number[] = [];

  // Range of items that depends on selected page
  public itemsRange = {
    from: 1,
    to: 0
  };

  constructor() {
    this.pageSize = 10;
  }

  /**
   * Detect changes (selected page) and refresh view with information about items range and page numbers
   */
  ngOnChanges(): void {
    this.calculatePageNumbers();
    this.calculateCurrentItemsRange();
  }

  /**
   * Function that calculates visible page numbers on UI
   */
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

  /**
   * Navigates to selected page
   * @param pageNo page to navigate
   */
  public navigateToPage(pageNo: number) {
    this.currentPage = pageNo;
  }

  /**
   * Naviagtes to the next page
   */
  public nextPage() {
    this.navigateToPage(this.currentPage + 1);
  }

  /**
   * Navigates to the previous page
   */
  public previousPage() {
    this.navigateToPage(this.currentPage - 1);
  }

  /**
   * Calculates items range for UI
   */
  public calculateCurrentItemsRange() {
    const pages = Math.ceil(this.itemsCount / this.pageSize);
    if (this.itemsCount === 0) {
      this.itemsRange.to = 0;
      this.itemsRange.from = 0;
      return;
    }
    this.itemsRange.from = this.pageSize * this.currentPage - this.pageSize + 1;
    if (this.currentPage === pages) {
      this.itemsRange.to = this.itemsCount;
      return;
    }
    this.itemsRange.to = this.pageSize * this.currentPage;
  }
}
