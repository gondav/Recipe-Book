import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipesSectionComponent } from './components/recipes-section/recipes-section.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BackgroundImgUrlPipe } from './pipes/background-img-url.pipe';

@NgModule({
  declarations: [AppComponent, HeaderComponent, RecipeCardComponent, RecipesSectionComponent, LandingPageComponent, BackgroundImgUrlPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
