import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IRecipeListResponseModel } from '../../shared/models/responses/IRecipeListResponseModel';
import { IRecipeViewModel } from '../../shared/models/viewmodels/IRecipeViewModel';
import { AuthService } from '../auth-service/auth.service';
import { BaseHttpService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(
    private baseHttpService: BaseHttpService,
    private authService: AuthService
  ) {}

  getRecipes(): Observable<IRecipeViewModel[]> {
    return this.baseHttpService
      .getItems<IRecipeListResponseModel>(environment.recipeEndpoint)
      .pipe(map((response) => response.recipeList.slice(0, 9)));
  }

  getSavedRecipes(): Observable<IRecipeViewModel[]> {
    const userId = this.authService.getUserId();

    return this.baseHttpService
      .getItems<IRecipeListResponseModel>(
        `${environment.savedRecipesEndpoint}/${userId}`
      )
      .pipe(map((response) => response.recipeList));
  }
}
