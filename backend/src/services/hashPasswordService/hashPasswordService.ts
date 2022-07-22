import bcrypt from 'bcrypt';
import config from '../../config';

export const hashPasswordService = {
  async generateHashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, config.bcrypt.numberOfSaltRounds);
  },

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
};
