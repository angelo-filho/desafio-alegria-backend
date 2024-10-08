import { ApiProperty } from '@nestjs/swagger';
import { Groups } from '../../users/types/groups.enum';

export class SignInDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  group: Groups;
}
