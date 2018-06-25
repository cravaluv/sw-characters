import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CharacterService } from '../core/character.service';
import { CharacterDetail } from '../core/models/character-detail';
import { NgxLoadingSpinnerService } from 'ngx-loading-spinner-fork';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ak-character-detail',
  templateUrl: './character-detail.component.html'
})
export class CharacterDetailComponent implements OnInit {

  details;

  characterForm: FormGroup;

  showError;

  constructor(
    private route: ActivatedRoute, private router: Router, private characterService: CharacterService,
    private spinnerService: NgxLoadingSpinnerService, private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.characterForm = this.fb.group({
      name: [{value: '', disabled: true }],
      height: [{value: '', disabled: true }],
      gender: [{value: '', disabled: true }],
      films: [{value: '', disabled: true }]
    });
    const characterId = this.route.snapshot.paramMap.get('id');
    this.characterService.getCharacterDetails(characterId)
      .then((details) => {
        this.details = details;
        this.characterForm.patchValue({name: this.details.character.name, height: this.details.character.height,
          gender: this.details.character.gender, films: this.details.films.join('\n')});
        this.spinnerService.hide();
      })
      .catch((err) => {
          this.showError = true;
          this.spinnerService.hide();
      });
  }

  goToCharacters() {
    this.router.navigate(['people']);
  }

}
