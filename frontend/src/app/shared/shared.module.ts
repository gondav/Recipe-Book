import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { BackgroundImgUrlPipe } from './pipes/background-img-url.pipe';
import { RecipeCardComponent } from './components/recipes-section/recipe-card/recipe-card.component';
import { RecipesSectionComponent } from './components/recipes-section/recipes-section.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BackgroundImgUrlPipe,
    RecipeCardComponent,
    RecipesSectionComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    BackgroundImgUrlPipe,
    RecipeCardComponent,
    RecipesSectionComponent,
  ],
})
export class SharedModule {}
