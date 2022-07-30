import { IDbResultDataModel } from '../models/dataModels/IDbResultDataModel';
import { ISavedRecipeDataModel } from '../models/dataModels/ISavedRecipeDataModel';
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

  getSavedRecipeId(
    userId: number,
    recipeId: number
  ): Promise<ISavedRecipeDataModel[]> {
    return db.query(
      `SELECT id FROM saved_recipe WHERE user_id = ? AND recipe_id = ?`,
      [String(userId), String(recipeId)]
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
