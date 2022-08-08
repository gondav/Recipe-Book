import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IRecipeListResponseModel } from '../../shared/models/IRecipeListResponseModel';
import { IRecipeViewModel } from '../../shared/models/viewmodels/IRecipeViewModel';
import { BaseHttpService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private baseHttpService: BaseHttpService) {}

  getRecipes(): Observable<IRecipeViewModel[]> {
    return this.baseHttpService
      .getItems<IRecipeListResponseModel>(environment.recipeEndpoint)
      .pipe(map((response) => response.recipeList.slice(0, 9)));
  }
}
