import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CharacterService } from '../core/character.service';
import { CharacterDetail } from '../core/models/character-detail';
import { NgxLoadingSpinnerService } from 'ngx-loading-spinner-fork';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ak-character-detail',
  templateUrl: './character-detail.component.html'
})
/**
 * Character component that displays detailed character info
 */
export class CharacterDetailComponent implements OnInit {

  // Object contains details about characters and films
  details: CharacterDetail;

  // Form
  characterForm: FormGroup;

  // Flag that informs if error shoud be displayed
  showError;

  constructor(
    private route: ActivatedRoute, private router: Router, private characterService: CharacterService,
    private spinnerService: NgxLoadingSpinnerService, private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    // Create form with inputs
    this.characterForm = this.fb.group({
      name: [{value: '', disabled: true }],
      height: [{value: '', disabled: true }],
      gender: [{value: '', disabled: true }],
      films: [{value: '', disabled: true }]
    });
    // Get character ID from url param
    const characterId = this.route.snapshot.paramMap.get('id');
    // Get character info from a service
    this.characterService.getCharacterDetails(characterId)
      .then((details) => {
        this.details = details;
        // Patch form values with character data
        this.characterForm.patchValue({name: this.details.character.name, height: this.details.character.height,
          gender: this.details.character.gender, films: this.details.films.join('\n')});
        this.spinnerService.hide();
      })
      .catch((err) => {
        // Handle REST error
          this.showError = true;
          this.spinnerService.hide();
      });
  }

  // Go back to the character list page
  goToCharacters() {
    this.router.navigate(['people']);
  }

}
