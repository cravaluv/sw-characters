import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharacterService } from '../core/character.service';
import { NgxLoadingSpinnerService } from 'ngx-loading-spinner-fork';
import { Character } from '../core/models/character';

@Component({
  selector: 'ak-characters',
  templateUrl: './characters.component.html'
})
export class CharactersComponent implements OnInit, OnDestroy {

  columnDefinition = ['name', 'height', 'gender'];

  testData;

  private _currentPage;

  set currentPage(page: number) {
    this._currentPage = page;
    this.loadData();
  }

  get currentPage() {
    return this._currentPage;
  }

  dataSize;

  constructor(private characterService: CharacterService, private spinnerService: NgxLoadingSpinnerService) {
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
        this.testData = data.results;
        this.dataSize = data.count;
        this.spinnerService.hide();
      });
  }

  characterSelected(character: Character) {
    this.characterService.getCharacterDetails(character.url).then((data) => {
      console.log(data.films);
    });
  }


}
