import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { RecipeCardComponent } from './shared/components/recipes-section/recipe-card/recipe-card.component';
import { RecipesSectionComponent } from './shared/components/recipes-section/recipes-section.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { AppRoutingModule } from './app-routing.module';
import { BackgroundImgUrlPipe } from './pipes/background-img-url.pipe';
import { RegisterFormComponent } from './components/authentication/register-form/register-form.component';
import { AuthenticationPageComponent } from './components/authentication/authentication-page.component';
import { TokenInterceptor } from '../app/core/interceptors/tokenInterceptor/token.interceptor';
import { SavedRecipesComponent } from './components/saved-recipes/saved-recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeCardComponent,
    RecipesSectionComponent,
    LandingPageComponent,
    BackgroundImgUrlPipe,
    AuthenticationPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    SavedRecipesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
