import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDTO } from './dtos/signin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import BcryptUtil from './utils/bcrypt.util';
import { ResponseUserDTO } from './dtos/response-user.dto';
import { TokensDTO } from './dtos/tokens.dto';
import { JwtPayload } from './@types/jwt-payload.type';
import JwtUtil from './utils/jwt.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validate({ name, password }: SignInDTO) {
    const user = await this.usersRepository.findOneBy({ name });

    if (!user) {
      throw new BadRequestException('Nome de usuário ou senha incorretos');
    }

    const isPasswordValid = await BcryptUtil.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Nome de usuário ou senha incorretos');
    }

    return {
      id: user.id,
      name: user.name,
    };
  }

  async generateAuthTokens(user: ResponseUserDTO): Promise<TokensDTO> {
    const payload: JwtPayload = {
      userId: user.id,
      userName: user.name,
    };

    const tokens = {
      access_token: JwtUtil.getAccessToken(payload),
      refresh_token: JwtUtil.getRefreshToken(payload),
    };

    return tokens;
  }
}
