import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharacterService } from '../core/character.service';
import { NgxLoadingSpinnerService } from 'ngx-loading-spinner-fork';
import { Character } from '../core/models/character';
import { Router } from '@angular/router';

@Component({
  selector: 'ak-characters',
  templateUrl: './characters.component.html'
})
export class CharactersComponent implements OnInit, OnDestroy {

  columnDefinition = ['name', 'height', 'gender'];

  data;

  showError;

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

  dataSize;

  constructor(private characterService: CharacterService, private spinnerService: NgxLoadingSpinnerService, private router: Router) {
  }

  ngOnInit(): void {
    this.currentPage = this.characterService.previousPage;
  }

  ngOnDestroy(): void {
    this.characterService.previousPage = this.currentPage;
  }

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

  characterSelected(character: Character) {
    const characterId = character.url ? +character.url.split('/')[5] : null;
    this.router.navigate(['/people', characterId]);
  }


}
