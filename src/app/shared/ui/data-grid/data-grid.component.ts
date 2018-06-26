import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../../core/models/character';

@Component({
  selector: 'ak-data-grid',
  templateUrl: './data-grid.component.html'
})

/**
 * Custom data-grid to display data with selected columns
 */
export class DataGridComponent {

  // Defined columns
  @Input() columns: string[];

  // data to display
  @Input() data: Character[];

  // Emits when double click
  @Output() doubleClick: EventEmitter<Character> = new EventEmitter();

  // Current selected character
  activeCharacter;

  /**
   * Emits when double click character
   * @param character character to show
   */
  onDoubleClick(character: Character) {
    this.doubleClick.emit(character);
  }

  /**
   * Marks selected character on grid
   * @param character character to mark
   */
  onClick(character: Character) {
    this.activeCharacter = character;
  }

}
