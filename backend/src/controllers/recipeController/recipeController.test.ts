import request from 'supertest';
import app from '../../app';
import { IRecipeDomainModel } from 'src/models/domainModels/IRecipeDomainModel';
import { recipeService } from '../../services/recipeService';

describe('getRecipes', () => {
  it('should return recipe list', async () => {
    // Arrange
    const recipes: IRecipeDomainModel[] = [
      {
        'recipeId': 1,
        'recipeName': 'mockName1',
        'description': 'Pellentesque eget nunc.',
        'imageId': 'kcA-c3f_3FE'
      },
      {
        'recipeId': 2,
        'recipeName': 'mockName2',
        'description':
          'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.',
        'imageId': 'eeqbbemH9-c'
      }
    ];

    recipeService.getRecipes = jest.fn().mockResolvedValue(recipes);

    // Act
    const result = await request(app).get('/api/recipe/recipes');

    // Assert
    expect(result.status).toBe(200);
    expect(result.body).toEqual({ recipeList: recipes });
    expect(recipeService.getRecipes).toHaveBeenCalledTimes(1);
  });
});
