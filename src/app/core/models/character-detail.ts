import { Character } from './character';

export class CharacterDetail {
  character: Character;
  films: string[];

  constructor(character: Character, films: string[]) {
    this.character = character;
    this.films = films;
  }

}
