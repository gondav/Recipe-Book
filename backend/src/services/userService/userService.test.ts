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
      .mockResolvedValue(mockReturnedUserObjArr);

    // Act
    const result = await userService.getUserById(1);

    // Assert
    expect(result).toEqual(mockReturnedUserObjArr[0]);
  });

  it('should throw error if user is not found', async () => {
    // Arrange
    const mockUserObj: IUserDomainModel[] = [];

    userRepository.getUserById = jest.fn().mockResolvedValue(mockUserObj);

    try {
      // Act
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

    userRepository.getUserByEmail = jest.fn().mockResolvedValue([]);
    hashPasswordService.generateHashedPassword = jest.fn();
    userRepository.registerUser = jest
      .fn()
      .mockResolvedValue({ affectedRows: 1 });

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
      .mockResolvedValue(mockReturnedUserObjArr);

    try {
      // Act
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

    userRepository.getUserByEmail = jest.fn().mockResolvedValue([]);
    hashPasswordService.generateHashedPassword = jest.fn();
    userRepository.registerUser = jest
      .fn()
      .mockResolvedValue({ affectedRows: 0 });

    try {
      //Act
      await userService.registerUser(mockUserObj);
    } catch (error) {
      //Assert
      expect(error.status).toBe(500);
      expect(error.message).toBe('Cannot add registration');
    }
  });
});

describe('updatePassword', () => {
  it('should call once: userRepository.getUserByEmail, hashPasswordService.comparePassword, hashPasswordService.generateHashedPassword, userRepository.updatePassword', async () => {
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

    userRepository.getUserByEmail = jest
      .fn()
      .mockResolvedValue(mockReturnedUserObjArr);

    hashPasswordService.comparePassword = jest.fn().mockResolvedValue(true);

    hashPasswordService.generateHashedPassword = jest
      .fn()
      .mockResolvedValue('hashedPassword');

    userRepository.updatePassword = jest
      .fn()
      .mockResolvedValue({ affectedRows: 1 });

    //Act
    await userService.updatePassword(
      'mock@email.com',
      'mockOldPassword',
      'mockNewPassword'
    );

    // Assert
    expect(userRepository.getUserByEmail).toHaveBeenCalledTimes(1);
    expect(hashPasswordService.comparePassword).toHaveBeenCalledTimes(1);
    expect(hashPasswordService.generateHashedPassword).toHaveBeenCalledTimes(1);
    expect(userRepository.updatePassword).toHaveBeenCalledTimes(1);
  });

  it("should return notFound if userRepository doesn't return a user", async () => {
    // Arrange
    userRepository.getUserByEmail = jest.fn().mockResolvedValue([]);

    try {
      //Act
      await userService.updatePassword(
        'mock@email.com',
        'oldPassword',
        'newPassword'
      );
    } catch (error) {
      // Assert
      expect(error.status).toBe(404);
      expect(error.message).toBe('User not found or account does not exist');
    }
  });

  it('should return unauthorized error if password is invalid', async () => {
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

    userRepository.getUserByEmail = jest
      .fn()
      .mockResolvedValue(mockReturnedUserObjArr);
    hashPasswordService.comparePassword = jest.fn().mockResolvedValue(false);

    try {
      // Act
      await userService.updatePassword(
        'mock@email.com',
        'oldPassword',
        'newPassword'
      );
    } catch (error) {
      // Assert
      expect(error.status).toBe(401);
      expect(error.message).toBe(
        'You have entered an invalid username or password'
      );
    }
  });

  it('should return server Error is affected rows is less than 1', async () => {
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

    userRepository.getUserByEmail = jest
      .fn()
      .mockResolvedValue(mockReturnedUserObjArr);
    hashPasswordService.comparePassword = jest.fn().mockResolvedValue(true);
    hashPasswordService.generateHashedPassword = jest
      .fn()
      .mockResolvedValue('newPassword');
    userRepository.updatePassword = jest
      .fn()
      .mockResolvedValue({ affectedRows: 0 });

    try {
      //Act
      await userService.updatePassword(
        'mock@email.com',
        'oldPassword',
        'newPassword'
      );
    } catch (error) {
      //Assert
      expect(error.status).toBe(500);
      expect(error.message).toBe('Cannot update password');
    }
  });
});

describe('loginUser', () => {
  const mockEmail = 'mock@email.com';
  const mockPassword = 'mockPassword1';

  it('should return user', async () => {
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

    userRepository.getUserByEmail = jest
      .fn()
      .mockResolvedValue(mockReturnedUserObjArr);
    hashPasswordService.comparePassword = jest.fn().mockResolvedValue(true);

    // Act
    const result = await userService.loginUser(mockEmail, mockPassword);

    // Assert
    expect(result).toEqual(mockReturnedUserObjArr[0]);
    expect(userRepository.getUserByEmail).toHaveBeenCalledTimes(1);
    expect(hashPasswordService.comparePassword).toHaveBeenCalledTimes(1);
  });

  it('should throw unauthorized error is no returned user from db', async () => {
    // Arrange
    userRepository.getUserByEmail = jest.fn().mockResolvedValue([]);
    hashPasswordService.comparePassword = jest.fn();

    try {
      // Act
      await userService.loginUser(mockEmail, mockPassword);
    } catch (error) {
      // Assert
      expect(error.status).toBe(401);
      expect(error.message).toBe(
        'You have entered an invalid email or password'
      );
      expect(hashPasswordService.comparePassword).not.toHaveBeenCalled();
    }
  });

  it('should throw unauthorized error if password is not valid', async () => {
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

    userRepository.getUserByEmail = jest
      .fn()
      .mockResolvedValue(mockReturnedUserObjArr);
    hashPasswordService.comparePassword = jest.fn().mockResolvedValue(false);

    try {
      // Act
      await userService.loginUser(mockEmail, mockPassword);
    } catch (error) {
      // Assert
      expect(error.status).toBe(401);
      expect(error.message).toBe(
        'You have entered an invalid email or password'
      );
    }
  });
});

describe('deleteUser', () => {
  it('should throw error if affectedRows less than 1', async () => {
    // Arrange
    userRepository.deleteUser = jest
      .fn()
      .mockResolvedValue({ affectedRows: 0 });

    try {
      // Act
      await userService.deleteUser(1);
    } catch (error) {
      // Assert
      expect(error.status).toBe(500);
      expect(error.message).toBe('Cannot delete user');
      expect(userRepository.deleteUser).toHaveBeenCalledTimes(1);
    }
  });
});
