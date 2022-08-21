import { userRepository } from '../../repositories/userRepository';
import { IUserDomainModel } from '../../models/domainModels/IUserDomainModel';
import { userService } from './userService';
import { hashPasswordService } from '../hashPasswordService/hashPasswordService';
import { IRegisterUserDataModel } from '../../models/dataModels/IRegisterUserDataModel';

describe('getUserById', () => {
  it('should return a user object', async () => {
    // Arrange
    const mockReturnedUserObjArr: IUserDomainModel[] = [
      {
        id: 1,
        firstName: 'mockFirstName',
        lastName: 'mockLastName',
        email: 'mock@email.com',
        password: 'mockPassword1'
      }
    ];

    userRepository.getUserById = jest
      .fn()
      .mockReturnValue(mockReturnedUserObjArr);

    // Act
    const result = await userService.getUserById(1);

    // Assert
    expect(result).toEqual(mockReturnedUserObjArr[0]);
  });

  it('should throw error if user is not found', async () => {
    // Arrange
    const mockUserObj: IUserDomainModel[] = [];

    userRepository.getUserById = jest.fn().mockReturnValue(mockUserObj);

    // Act
    try {
      await userService.getUserById(1);
    } catch (error) {
      // Assert
      expect(error.status).toBe(404);
      expect(error.message).toBe('User does not exist');
    }
  });
});

describe('registerUser', () => {
  it('should call once userRepository.getUserByEmail, hashPasswordService.generateHashedPassword and userRepository.registerUser methods', async () => {
    // Arrange
    const mockReturnedUserObj: IRegisterUserDataModel = {
      firstName: 'mockFirstName',
      lastName: 'mockLastName',
      email: 'mock@email.com',
      password: 'mockPassword1'
    };

    userRepository.getUserByEmail = jest.fn().mockReturnValue([]);
    hashPasswordService.generateHashedPassword = jest.fn();
    userRepository.registerUser = jest
      .fn()
      .mockReturnValue({ affectedRows: 1 });

    // Act
    await userService.registerUser(mockReturnedUserObj);

    // Assert
    expect(userRepository.getUserByEmail).toHaveBeenCalledTimes(1);
    expect(hashPasswordService.generateHashedPassword).toHaveBeenCalledTimes(1);
    expect(userRepository.registerUser).toHaveBeenCalledTimes(1);
  });

  it('should throw error if user is already registered', async () => {
    // Arrange
    const mockReturnedUserObjArr: IUserDomainModel[] = [
      {
        id: 1,
        firstName: 'mockFirstName',
        lastName: 'mockLastName',
        email: 'mock@email.com',
        password: 'mockPassword1'
      }
    ];

    const mockUserObj: IRegisterUserDataModel = {
      firstName: 'mockFirstName',
      lastName: 'mockLastName',
      email: 'mock@email.com',
      password: 'mockPassword1'
    };

    userRepository.getUserByEmail = jest
      .fn()
      .mockReturnValue(mockReturnedUserObjArr);

    // Act
    try {
      await userService.registerUser(mockUserObj);
    } catch (error) {
      // Assert
      expect(error.status).toBe(409);
      expect(error.message).toBe(
        `User with email ${mockUserObj.email} already exists`
      );
    }
  });

  it('should throw error if registration affected rows less than 1', async () => {
    // Arrange
    const mockUserObj: IRegisterUserDataModel = {
      firstName: 'mockFirstName',
      lastName: 'mockLastName',
      email: 'mock@email.com',
      password: 'mockPassword1'
    };

    userRepository.getUserByEmail = jest.fn().mockReturnValue([]);
    hashPasswordService.generateHashedPassword = jest.fn();
    userRepository.registerUser = jest
      .fn()
      .mockReturnValue({ affectedRows: 0 });

    //Act
    try {
      await userService.registerUser(mockUserObj);
    } catch (error) {
      //Assert
      expect(error.status).toBe(500);
      expect(error.message).toBe('Cannot add registration');
    }
  });
});
