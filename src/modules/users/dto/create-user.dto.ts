import { Groups } from '../types/groups.enum';

export class CreateUserDto {
  name: string;
  password: string;
  group: Groups;
}
