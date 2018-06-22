import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../../core/models/character';

@Component({
  selector: 'ak-data-grid',
  templateUrl: './data-grid.component.html'
})
export class DataGridComponent {

  @Input() columns: string[];
  @Input() data: Character[];

  @Output() doubleClick: EventEmitter<Character> = new EventEmitter();

  activeCharacter;

  onDoubleClick(character: Character) {
    this.doubleClick.emit(character);
  }

  onClick(character: Character) {
    this.activeCharacter = character;
  }

}
