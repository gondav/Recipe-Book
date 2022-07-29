import { IDbResultDataModel } from 'src/models/dataModels/IDbResultDataModel';
import { db } from '../data/connection';
import { IRecipeDomainModel } from '../models/domainModels/IRecipeDomainModel';

export const savedRecipeRepository = {
  getSavedRecipesByUserId(userId: number): Promise<IRecipeDomainModel[]> {
    return db.query<IRecipeDomainModel[]>(
      `SELECT recipe.recipe_id as recipeId, recipe.recipe_name as recipeName, recipe.description, recipe.instruction, recipe.image_id as imageId
      FROM recipe
      JOIN saved_recipe ON recipe.recipe_id = saved_recipe.recipe_id
      JOIN user ON saved_recipe.user_id = user.id
      WHERE user.id = ?`,
      [String(userId)]
    );
  },

  saveRecipe(userId: number, recipeId: number): Promise<IDbResultDataModel> {
    return db.query(
      `INSERT INTO saved_recipe (user_id, recipe_id)
      VALUES(?, ?)`,
      [String(userId), String(recipeId)]
    );
  },

  removeSavedRecipe(savedRecipeId: number): Promise<IDbResultDataModel> {
    return db.query(
      `DELETE FROM saved_recipe
      WHERE id = ?`,
      [String(savedRecipeId)]
    );
  }
};
