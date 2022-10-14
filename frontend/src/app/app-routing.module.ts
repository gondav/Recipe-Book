import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('../app/features/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'saved-recipes',
    loadChildren: () =>
      import('../app/features/saved-recipes/saved-recipes.module').then(
        (m) => m.SavedRecipesModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/features/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../app/features/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'recipes/:recipeId',
    loadChildren: () =>
      import('../app/features/recipe-details/recipe-details.module').then(
        (m) => m.RecipeDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
