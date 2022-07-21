import { IRecipeDomainModel } from 'src/models/domainModels/IRecipeDomainModel';
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
  }
};
