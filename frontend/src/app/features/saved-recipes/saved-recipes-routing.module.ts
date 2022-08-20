import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedRecipesComponent } from './saved-recipes.component';
import { AuthGuard } from '../../core/services/authGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SavedRecipesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedRecipesRoutingModule {}
