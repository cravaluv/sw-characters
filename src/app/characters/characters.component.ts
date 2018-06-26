import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharacterService } from '../core/character.service';
import { NgxLoadingSpinnerService } from 'ngx-loading-spinner-fork';
import { Character } from '../core/models/character';
import { Router } from '@angular/router';

@Component({
  selector: 'ak-characters',
  templateUrl: './characters.component.html'
})

/**
 * Character component that displays paged character in data-grid
 */
export class CharactersComponent implements OnInit, OnDestroy {

  // Columns to display in data-grid
  columnDefinition = ['name', 'height', 'gender'];

  // Data to display in data-grid
  data;

  // Flag that informs if error shoud be displayed
  showError;

  // Current selected page
  private _currentPage;

  set currentPage(page: number) {
    if (this._currentPage !== page) {
      this._currentPage = page;
      this.loadData();
    }
  }

  get currentPage() {
    return this._currentPage;
  }

  // Size of data displayed in data-grid
  dataSize;

  constructor(private characterService: CharacterService, private spinnerService: NgxLoadingSpinnerService, private router: Router) {
  }

  /**
   * Load last selected page from a service
   */
  ngOnInit(): void {
    this.currentPage = this.characterService.previousPage;
  }

  /**
   * Save selected page in a service
   */
  ngOnDestroy(): void {
    this.characterService.previousPage = this.currentPage;
  }

  /**
   * Loads paged character data
   */
  loadData() {
    this.spinnerService.show();
    this.characterService.getPagedCharacters(this.currentPage)
      .subscribe(data => {
        this.data = data.results;
        this.dataSize = data.count;
        this.spinnerService.hide();
      },
        (err) => {
          this.showError = true;
          this.spinnerService.hide();
        });
  }

  /**
   * On data-grid double click goto detailed character page
   * @param character character to display
   */
  characterSelected(character: Character) {
    const characterId = character.url ? +character.url.split('/')[5] : null;
    this.router.navigate(['/people', characterId]);
  }


}
