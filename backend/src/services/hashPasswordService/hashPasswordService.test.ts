import { hashPasswordService } from './hashPasswordService';
import bcrypt from 'bcrypt';
import config from '../../config';

describe('generateHashedPassword', () => {
  it('should return with hashedPassword', async () => {
    // Arrange
    bcrypt.hash = jest.fn().mockReturnValue('hashedPassword');

    // Act
    const result = await hashPasswordService.generateHashedPassword('password');

    // Assert
    expect(result).toBe('hashedPassword');
    expect(bcrypt.hash).toHaveBeenCalledWith(
      'password',
      config.bcrypt.numberOfSaltRounds
    );
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
  });
});

describe('comparePassword', () => {
  it('should return true if the password is correct', async () => {
    // Arrange
    const mockHashedPassword =
      '$2b$12$VUP0aRb7pz2JnGtIwYbof.DZORa4VLkiQE4QI6pq22swjv3Jcwrma';

    // Act
    const result = await hashPasswordService.comparePassword(
      'password',
      mockHashedPassword
    );

    // Assert
    expect(result).toBe(true);
  });

  it('should return false, if the password is incorrect', async () => {
    // Arrange
    const incorrectPassword = 'incorrectPassword';
    const mockHashedPassword =
      '$2b$12$VUP0aRb7pz2JnGtIwYbof.DZORa4VLkiQE4QI6pq22swjv3Jcwrma';

    // Act
    const result = await hashPasswordService.comparePassword(
      incorrectPassword,
      mockHashedPassword
    );

    // Assert
    expect(result).toBe(false);
  });
});
