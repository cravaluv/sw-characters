import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from './models/page';
import { Character } from './models/character';
import { CharacterDetail } from './models/character-detail';


@Injectable({
  providedIn: 'root',
})
export class CharacterService {

  static baseUrl = 'https://swapi.co/api/';

  private _previousPage = 1;

  get previousPage() {
    return this._previousPage;
  }

  set previousPage(page: number) {
    this._previousPage = page;
  }


  constructor(private http: HttpClient) { }

  getPagedCharacters(page: number): Observable<Page> {
    return this.http.get<Page>(CharacterService.baseUrl + `people/?page=${page}`);
  }

  getCharacterDetails(url: string): Promise<CharacterDetail> {
    return new Promise((resolve, reject) => {
      return this.http.get<Character>(url).subscribe((character) => {
        const promises = [];
        character.films.forEach((film) => {
          promises.push(this.getFilm(film));
        });
        return Promise.all(promises).then((films) => {
          resolve(new CharacterDetail(character, films));
        });
      });
    });
  }

  getFilm(url: string) {
    return this.http.get(url).toPromise();
  }

}
