import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dtos/signin.dto';
import { TokensDTO } from './dtos/tokens.dto';
import { UsersService } from '../users/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() body: SignInDTO): Promise<TokensDTO> {
    const user = await this.usersService.create(body);

    return this.authService.generateAuthTokens(user);
  }

  @Post('sign-in')
  async login(@Body() body: SignInDTO): Promise<TokensDTO> {
    const user = await this.authService.validate(body);
    return this.authService.generateAuthTokens(user);
  }
}
