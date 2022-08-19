import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationPageComponent } from './components/authentication/authentication-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SavedRecipesComponent } from './components/saved-recipes/saved-recipes.component';
import { AuthGuard } from './core/services/authGuard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', component: LandingPageComponent },
  {
    path: 'saved-recipes',
    component: SavedRecipesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: AuthenticationPageComponent },
  { path: 'register', component: AuthenticationPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
