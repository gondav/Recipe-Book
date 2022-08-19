import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SavedRecipesComponent } from './saved-recipes.component';
import { SavedRecipesRoutingModule } from './saved-recipes-routing.module';

@NgModule({
  declarations: [SavedRecipesComponent],
  imports: [CommonModule, SharedModule, SavedRecipesRoutingModule],
})
export class SavedRecipesModule {}
