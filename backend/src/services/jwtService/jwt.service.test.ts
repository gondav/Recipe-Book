import { Request } from 'express';
import { jwtService } from './jwt.service';

describe.only('getTokenFromRequest', () => {
  it('should return token', async () => {
    // Arrange
    const request = {
      headers: {
        authorization: 'Bearer token'
      }
    } as Request;

    // Act
    const token = jwtService.getTokenFromRequest(request);

    // Assert
    expect(token).toBe('token');
  });
});
