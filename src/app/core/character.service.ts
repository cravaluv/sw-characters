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
/**
 * Single service that allows access to the SWapi
 */
@Injectable({
  providedIn: 'root',
})
export class CharacterService {

  // Base url of api
  static baseUrl = 'https://swapi.co/api/';

  // Saved selected page of the data-grid
  private _previousPage = 1;

  get previousPage() {
    return this._previousPage;
  }

  set previousPage(page: number) {
    this._previousPage = page;
  }


  constructor(private http: HttpClient) { }

  /**
   * Gets paged characters from API
   * @param page page to get
   */
  getPagedCharacters(page: number): Observable<Page> {
    return this.http.get<Page>(CharacterService.baseUrl + Endpoints.CHARACTER + `?page=${page}`);
  }

  /**
   * Gets character details with films
   * @param characterId character to get
   */
  getCharacterDetails(characterId: string): Promise<CharacterDetail> {
    return new Promise((resolve, reject) => {
      return this.http.get<Character>(CharacterService.baseUrl + Endpoints.CHARACTER + characterId).subscribe((character) => {
        const promises = [];
        // push all film queries to table of promises
        character.films.forEach((film: string) => {
          const filmId = film.split('/')[5];
          promises.push(this.getFilm(filmId));
        });
        // exec all film queries as a single promise
        return Promise.all(promises).then((films) => {
          resolve(new CharacterDetail(character, films));
        }).catch((err) => reject(err));
      }, (err) => reject());
    });
  }

  /**
   * Gets film
   * @param filmId film to get
   */
  getFilm(filmId: string) {
    // convert observable REST answer to promise
    return this.http.get(CharacterService.baseUrl + Endpoints.FILM + filmId).toPromise();
  }

}
