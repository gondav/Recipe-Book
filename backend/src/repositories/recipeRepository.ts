import { IRecipeIngredientsDomainModel } from '../models/domainModels/IRecipeIngredientsDomainModel';
import { IRecipeDomainModel } from '../models/domainModels/IRecipeDomainModel';
import { db } from '../data/connection';

export const recipeRepository = {
  getRecipes(): Promise<IRecipeDomainModel[]> {
    return db.query(
      'SELECT recipe.recipe_id, recipe.recipe_name, description, image_id FROM recipe',
      []
    );
  },

  getRecipe(recipe_id: number): Promise<IRecipeDomainModel> {
    return db.query('SELECT * FROM recipe WHERE recipe_id = ?', [
      String(recipe_id)
    ]);
  },

  getRecipeIngredients(
    recipe_id: number
  ): Promise<IRecipeIngredientsDomainModel[]> {
    const recipeDetails =
      'SELECT qty_amount, measurement_description, ingredient_name FROM recipe JOIN recipe_details ON recipe.recipe_id = recipe_details.recipe_id JOIN measurement_unit ON recipe_details.measurement_id = measurement_unit.measurement_id JOIN ingredient ON recipe_details.ingredient_id = ingredient.ingredient_id JOIN measurement_qty ON recipe_details.measurement_qty_id = measurement_qty.measurement_qty_id WHERE recipe.recipe_id = ?';
    return db.query(recipeDetails, [String(recipe_id)]);
  }
};
