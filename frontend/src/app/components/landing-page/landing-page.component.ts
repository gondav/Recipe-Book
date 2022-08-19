import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../core/services/recipe-service/recipe.service';
import { IRecipeViewModel } from '../../shared/models/viewmodels/IRecipeViewModel';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  recipes: IRecipeViewModel[] = [];
  sectionTitle: string = 'LATEST RECIPES';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (recipes) => (this.recipes = recipes),
      error: (error) => console.log(error.status, error.message),
    });
  }
}
