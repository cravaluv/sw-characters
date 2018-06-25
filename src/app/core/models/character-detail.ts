import { Character } from './character';
import { Film } from './film';

export class CharacterDetail {
  character: Character;
  films: string[];

  constructor(character: Character, films: Film[]) {
    this.character = character;
    this.films = films.map((film) => film.title);
  }

}
