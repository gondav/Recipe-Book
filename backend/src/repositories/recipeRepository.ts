import { IRecipeDomainModel } from 'src/models/domainModels/IRecipeDomainModel';
import { db } from '../data/connection';

export const recipeRepository = {
  getRecipes(): Promise<IRecipeDomainModel[]> {
    return db.query('SELECT * FROM recipe', []);
  }
};
