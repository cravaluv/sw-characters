import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from './models/page';
import { Character } from './models/character';
import { CharacterDetail } from './models/character-detail';

export enum Endpoints {
  CHARACTER = 'people/',
  FILM = 'films/',
}


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
    return this.http.get<Page>(CharacterService.baseUrl + Endpoints.CHARACTER + `?page=${page}`);
  }

  getCharacterDetails(characterId: string): Promise<CharacterDetail> {
    return new Promise((resolve, reject) => {
      return this.http.get<Character>(CharacterService.baseUrl + Endpoints.CHARACTER + characterId).subscribe((character) => {
        const promises = [];
        character.films.forEach((film: string) => {
          const filmId = film.split('/')[5];
          promises.push(this.getFilm(filmId));
        });
        return Promise.all(promises).then((films) => {
          resolve(new CharacterDetail(character, films));
        }).catch((err) => reject(err));
      }, (err) => reject());
    });
  }

  getFilm(filmId: string) {
    return this.http.get(CharacterService.baseUrl + Endpoints.FILM + filmId).toPromise();
  }

}
