import { IRecipeIngredientsDomainModel } from '../models/domainModels/IRecipeIngredientsDomainModel';
import { IRecipeDomainModel } from '../models/domainModels/IRecipeDomainModel';
import { db } from '../data/connection';

export const recipeRepository = {
  getRecipes(): Promise<IRecipeDomainModel[]> {
    return db.query<IRecipeDomainModel[]>(
      'SELECT recipe.recipe_id as recipeId, recipe.recipe_name as recipeName, description, image_id as imageId FROM recipe',
      []
    );
  },

  getRecipe(recipeId: number): Promise<IRecipeDomainModel[]> {
    return db.query<IRecipeDomainModel[]>(
      'SELECT * FROM recipe WHERE recipe_id = ?',
      [String(recipeId)]
    );
  },

  getRecipeIngredients(
    recipeId: number
  ): Promise<IRecipeIngredientsDomainModel[]> {
    const recipeDetails =
      'SELECT qty_amount as qtyAmount, measurement_description as measurementDescription, ingredient_name as ingredientName FROM recipe JOIN recipe_details ON recipe.recipe_id = recipe_details.recipe_id JOIN measurement_unit ON recipe_details.measurement_id = measurement_unit.measurement_id JOIN ingredient ON recipe_details.ingredient_id = ingredient.ingredient_id JOIN measurement_qty ON recipe_details.measurement_qty_id = measurement_qty.measurement_qty_id WHERE recipe.recipe_id = ?';
    return db.query<IRecipeIngredientsDomainModel[]>(recipeDetails, [
      String(recipeId)
    ]);
  },

  getRecipesByTagName(tagName: string): Promise<IRecipeDomainModel[]> {
    const recipes =
      'SELECT DISTINCT recipe.recipe_id as recipeId, recipe_name as recipeName, description, image_id as imageId FROM recipe JOIN recipe_details ON recipe.recipe_id = recipe_details.recipe_id JOIN recipe_tag ON recipe_details.recipe_tag_id = recipe_tag.tag_id WHERE tag = ?';
    return db.query<IRecipeDomainModel[]>(recipes, [tagName]);
  }
};
