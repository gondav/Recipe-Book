import { Injectable } from '@angular/core';
import { map, tap, Observable } from 'rxjs';
import { ISaveRecipeRequestModel } from '../../shared/models/requests/ISaveRecipeRequestModel';
import { IRemoveRecipeResponseModel } from '../../shared/models/responses/IRemoveRecipeResponseModel';
import { ISaveRecipeResponseModel } from '../../shared/models/responses/ISaveRecipeResponseModel';
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

  getFavoriteRecipesFromLocalStorage(): number[] {
    const recipeIds = localStorage.getItem('favoriteRecipes');

    if (!recipeIds) {
      return [];
    }
    return JSON.parse(recipeIds);
  }

  addFavoriteRecipeToLocalStorage(recipeId: number): void {
    const recipeIds = this.getFavoriteRecipesFromLocalStorage();
    recipeIds.push(recipeId);

    this.addFavoriteRecipesToLocalStorage(recipeIds);
  }

  addFavoriteRecipesToLocalStorage(favoriteRecipesIds: number[]): void {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesIds));
  }

  removeFavoriteRecipeFromLocalStorage(recipeId: number): void {
    const recipeIds = this.getFavoriteRecipesFromLocalStorage().filter(
      (id) => id !== recipeId
    );
    this.addFavoriteRecipesToLocalStorage(recipeIds);
  }

  getRecipes(): Observable<IRecipeViewModel[]> {
    return this.baseHttpService
      .getItems<IRecipeListResponseModel>(environment.recipeEndpoint)
      .pipe(map((response) => response.recipeList.slice(0, 9)));
  }

  getRecipeIdsFromRecipeList(recipeList: IRecipeViewModel[]): number[] {
    return recipeList.map((recipe) => recipe.recipeId);
  }

  getSavedRecipes(): Observable<IRecipeViewModel[]> {
    const userId = this.authService.getUserId();

    return this.baseHttpService
      .getItems<IRecipeListResponseModel>(
        `${environment.savedRecipesEndpoint}/${userId}`
      )
      .pipe(
        map((response) => response.recipeList),
        tap((recipeList: IRecipeViewModel[]) => {
          const favoriteRecipesIds: number[] =
            this.getRecipeIdsFromRecipeList(recipeList);
          this.addFavoriteRecipesToLocalStorage(favoriteRecipesIds);
        })
      );
  }

  addRecipeToFavorites(
    recipeData: ISaveRecipeRequestModel
  ): Observable<ISaveRecipeResponseModel> {
    return this.baseHttpService
      .createItem<ISaveRecipeResponseModel>(
        environment.savedRecipesEndpoint,
        recipeData
      )
      .pipe(
        map((response) => {
          return {
            message: response.message,
          };
        })
      );
  }

  removeRecipeFromFavorites(
    recipeId: number
  ): Observable<IRemoveRecipeResponseModel> {
    return this.baseHttpService
      .deleteItem<IRemoveRecipeResponseModel>(
        environment.savedRecipesEndpoint,
        recipeId
      )
      .pipe(
        map((response) => {
          return {
            message: response.message,
          };
        })
      );
  }
}
