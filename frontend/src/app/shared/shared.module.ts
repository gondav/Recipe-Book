import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { BackgroundImgUrlPipe } from './pipes/background-img-url.pipe';
import { RecipeCardComponent } from './components/recipes-section/recipe-card/recipe-card.component';
import { RecipesSectionComponent } from './components/recipes-section/recipes-section.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BackgroundImgUrlPipe,
    RecipeCardComponent,
    RecipesSectionComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    RecipeCardComponent,
    RecipesSectionComponent,
    FooterComponent,
    BackgroundImgUrlPipe,
  ],
})
export class SharedModule {}
