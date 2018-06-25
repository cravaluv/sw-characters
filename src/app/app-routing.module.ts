import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'people', component: CharactersComponent },
  { path: 'people/:id', component: CharacterDetailComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
