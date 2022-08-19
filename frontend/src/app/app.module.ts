import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecipeCardComponent } from './shared/components/recipes-section/recipe-card/recipe-card.component';
import { RecipesSectionComponent } from './shared/components/recipes-section/recipes-section.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { LoginFormComponent } from './features/authentication/login-form/login-form.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterFormComponent } from './features/authentication/register-form/register-form.component';
import { AuthenticationPageComponent } from './features/authentication/authentication-page.component';
import { TokenInterceptor } from '../app/core/interceptors/tokenInterceptor/token.interceptor';
import { SavedRecipesComponent } from './features/saved-recipes/saved-recipes.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    RecipesSectionComponent,
    LandingPageComponent,
    AuthenticationPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    SavedRecipesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
