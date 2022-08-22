import { savedRecipeService } from './savedRecipeService';
import { savedRecipeRepository } from '../../repositories/savedRecipeRepository';
import { IRecipeDomainModel } from '../../models/domainModels/IRecipeDomainModel';
import { userRepository } from '../../repositories/userRepository';
import { recipeRepository } from '../../repositories/recipeRepository';
import { IUserDomainModel } from '../../models/domainModels/IUserDomainModel';
import { ISavedRecipeDataModel } from '../../models/dataModels/ISavedRecipeDataModel';

describe('getSavedRecipesByUserId', () => {
  const userId: number = 1;

  it('should return saved recipe list', async () => {
    // Arrange
    const recipeList: IRecipeDomainModel[] = [
      {
        recipeId: 1,
        recipeName: 'recipeName1',
        description: 'description1',
        instruction: 'instruction1',
        imageId: '3ic8i39'
      },
      {
        recipeId: 2,
        recipeName: 'recipeName2',
        description: 'description2',
        instruction: 'instruction2',
        imageId: 'uej86do'
      }
    ];
    savedRecipeRepository.getSavedRecipesByUserId = jest
      .fn()
      .mockReturnValue(recipeList);

    // Act
    const result = await savedRecipeService.getSavedRecipesByUserId(userId);

    // Assert
    expect(result).toEqual(recipeList);
    expect(savedRecipeRepository.getSavedRecipesByUserId).toHaveBeenCalledTimes(
      1
    );
    expect(savedRecipeRepository.getSavedRecipesByUserId).toHaveBeenCalledWith(
      userId
    );
  });

  it('should throw error if repository throws error', async () => {
    // Arrange
    savedRecipeRepository.getSavedRecipesByUserId = jest
      .fn()
      .mockReturnValue(new Error('Database Error'));

    // Act
    const result = await savedRecipeService.getSavedRecipesByUserId(userId);

    // Assert
    expect(result).toEqual(new Error('Database Error'));
  });
});

describe('saveRecipe', () => {
  const userId: number = 1;
  const recipeId: number = 1;
  const user: IUserDomainModel = {
    id: 1,
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'mock@email.com',
    password: 'mockPassword'
  };

  it('should return a notFoundError Promise if user not found in DB', async () => {
    // Arrange
    userRepository.getUserById = jest.fn().mockReturnValue([]);

    try {
      // Act
      await savedRecipeService.saveRecipe(userId, recipeId);
    } catch (error) {
      // Assert
      expect(error.status).toBe(404);
      expect(error.message).toBe('User does not exist');
    }
  });

  it('should return a notFoundError Promise if recipe not found in DB', async () => {
    // Arrange
    userRepository.getUserById = jest.fn().mockReturnValue([user]);
    recipeRepository.getRecipe = jest.fn().mockReturnValue([]);

    try {
      // Act
      await savedRecipeService.saveRecipe(userId, recipeId);
    } catch (error) {
      // Assert
      expect(error.status).toBe(404);
      expect(error.message).toBe('Recipe does not exist');
    }
  });

  const recipe: IRecipeDomainModel = {
    recipeId: 1,
    recipeName: 'recipeName1',
    description: 'description1',
    instruction: 'instruction1',
    imageId: '3ic8i39'
  };
  const savedRecipe: ISavedRecipeDataModel = {
    id: 1,
    userId: 2,
    recipeId: 3
  };

  it('should return a conflictError Promise if recipe is already saved by user', async () => {
    userRepository.getUserById = jest.fn().mockReturnValue([user]);
    recipeRepository.getRecipe = jest.fn().mockReturnValue([recipe]);
    // Arrange
    savedRecipeRepository.getSavedRecipeId = jest
      .fn()
      .mockReturnValue([savedRecipe]);

    try {
      // Act
      await savedRecipeService.saveRecipe(userId, recipeId);
    } catch (error) {
      // Assert
      expect(error.status).toBe(409);
      expect(error.message).toBe('Recipe is already saved');
    }
  });

  it('should return serverError Promise if affectedRows equals to 0', async () => {
    // Arrange
    userRepository.getUserById = jest.fn().mockReturnValue([user]);
    recipeRepository.getRecipe = jest.fn().mockReturnValue([recipe]);
    savedRecipeRepository.getSavedRecipeId = jest.fn().mockReturnValue([]);
    savedRecipeRepository.saveRecipe = jest
      .fn()
      .mockReturnValue({ affectedRows: 0 });

    try {
      // Act
      await savedRecipeService.saveRecipe(userId, recipeId);
    } catch (error) {
      // Assert
      expect(error.status).toBe(500);
      expect(error.message).toBe('Cannot save recipe');
    }
  });
});

describe('removeSavedRecipe', () => {
  it('should return a notFoundError Promise if saved recipe is not found', async () => {
    // Arrange
    savedRecipeRepository.removeSavedRecipe = jest
      .fn()
      .mockReturnValue({ affectedRows: 0 });

    try {
      // Act
      await savedRecipeService.removeSavedRecipe(1, 1);
    } catch (error) {
      // Assert
      expect(error.status).toBe(500);
      expect(error.message).toBe('Cannot delete recipe');
    }
  });
});
