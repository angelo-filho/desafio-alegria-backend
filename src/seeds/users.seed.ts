import { DataSource } from 'typeorm';
import { readFile } from 'fs/promises';
import Seeder from '../lib/typeorm/seeder';
import { User } from '../modules/users/entities/user.entity';
import { Groups } from '../modules/users/types/groups.enum';
import BcryptUtil from '../modules/auth/utils/bcrypt.util';

interface UserData {
  name: string;
  password: string;
  group: Groups;
}

export default class UserSeeder extends Seeder {
  protected name = 'user-seeder';
  track = false;
  private USERS_PATH = '/../data/users.data.json';

  public async execute(dataSource: DataSource): Promise<void> {
    const usersJSON = await readFile(__dirname + this.USERS_PATH);
    const usersData = JSON.parse(String(usersJSON)) as UserData[];

    const hashedUsers = await Promise.all(
      usersData.map(async (user) => {
        return {
          ...user,
          password: await BcryptUtil.encodePassword(user.password),
        };
      }),
    );

    const usersRepository = dataSource.getRepository(User);

    await usersRepository.save(hashedUsers);
  }
}
