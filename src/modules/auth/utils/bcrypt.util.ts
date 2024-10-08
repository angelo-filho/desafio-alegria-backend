import * as bcrypt from 'bcrypt';

export default class BcryptUtil {
  static async encodePassword(password: string) {
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  static comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
