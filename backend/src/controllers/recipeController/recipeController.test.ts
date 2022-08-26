import request from 'supertest';
import app from '../../app';
import { IRecipeDomainModel } from 'src/models/domainModels/IRecipeDomainModel';
import { recipeService } from '../../services/recipeService';
import { IDetailedRecipeDomainModel } from 'src/models/domainModels/IDetailedRecipeDomainModel';

describe('GET / api/recipe/recipes', () => {
  it('should return recipe list', async () => {
    // Arrange
    const recipes: IRecipeDomainModel[] = [
      {
        recipeId: 1,
        recipeName: 'mockName1',
        description: 'Pellentesque eget nunc.',
        imageId: 'kcA-c3f_3FE'
      },
      {
        recipeId: 2,
        recipeName: 'mockName2',
        description:
          'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.',
        imageId: 'eeqbbemH9-c'
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

describe('GET / api/recipe/recipes/:recipeId', () => {
  it('should return one recipe with details', async () => {
    // Arrange
    const recipe: IRecipeDomainModel = {
      recipeId: 1,
      recipeName: 'mockName1',
      description: 'Pellentesque eget nunc.',
      imageId: 'kcA-c3f_3FE'
    };

    recipeService.getRecipe = jest.fn().mockResolvedValue(recipe);

    // Act
    const result = await request(app).get('/api/recipe/recipes/1');

    // Assert
    expect(result.status).toBe(200);
    expect(result.body).toEqual({ recipe });
    expect(recipeService.getRecipe).toHaveBeenCalledTimes(1);
  });

  it('should return with bad request error if the parameter type is not a number', async () => {
    // Act
    const result = await request(app).get('/api/recipe/recipes/string');
    // Assert
    expect(result.status).toBe(400);
  });

  it('should return with bad request error if the parameter is less than 1', async () => {
    // Act
    const result = await request(app).get('/api/recipe/recipes/0');
    // Assert
    expect(result.status).toBe(400);
  });
});

describe('GET / api/recipe/recipes/details/:recipeId', () => {
  it('should return detailed recipe', async () => {
    // Arrange
    const detailedRecipe: IDetailedRecipeDomainModel = {
      basicRecipeDetails: {
        recipeId: 1,
        recipeName: 'First Aid Antibiotic Bacitraycin Plus',
        description: 'Pellentesque eget nunc.',
        imageId: 'kcA-c3f_3FE',
        instruction:
          'Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.'
      },
      recipeIngredients: [
        {
          qtyAmount: 1.5,
          measurementDescription: 'integer',
          ingredientName: 'BZK antiseptic swab'
        },
        {
          qtyAmount: 1,
          measurementDescription: 'libero',
          ingredientName: 'Propranolol Hydrochloride'
        }
      ]
    };
    recipeService.getDetailedRecipe = jest
      .fn()
      .mockResolvedValue(detailedRecipe);

    // Act
    const result = await request(app).get('/api/recipe/recipes/details/1');

    // Assert
    expect(result.status).toBe(200);
    expect(result.body).toEqual({ detailedRecipe: detailedRecipe });
    expect(recipeService.getDetailedRecipe).toHaveBeenCalledTimes(1);
  });
});
