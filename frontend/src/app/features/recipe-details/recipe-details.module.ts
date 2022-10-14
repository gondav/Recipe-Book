import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeDetailsComponent } from './recipe-details.component';
import { RecipeDetailsRoutingModule } from './recipe-details-routing.module';

@NgModule({
  declarations: [RecipeDetailsComponent],
  imports: [CommonModule, SharedModule, RecipeDetailsRoutingModule],
})
export class RecipeDetailsModule {}
