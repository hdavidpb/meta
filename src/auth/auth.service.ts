import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginUserDTO, UserDTO } from 'src/dtos/user.dto';
import { UserRepository } from 'src/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { profileRepository } from 'src/repositories/profile.repository';
import { ITokenInterface } from 'src/interfaces/interfaces';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private profileRepository: profileRepository,
    private userRepository: UserRepository,
    private jwtService: JwtService, // private configService: ConfigService,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();
    const profile = await this.profileRepository.find({ relations: ['user'] });
    return {
      profile,
    };
  }

  async createUser(userDto: UserDTO) {
    const { password, ...userData } = userDto;
    const user = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    if (user) throw new NotFoundException('user already exists');

    const userInstance = this.userRepository.create({
      email: userData.email,
      password: hash,
    });

    const savedUser = await this.userRepository.save(userInstance);

    const profileInstance = this.profileRepository.create({
      name: userData.name,
      lastName: userData.lastName,
      user: savedUser,
    });

    const saveProfile = await this.profileRepository.save(profileInstance);

    return {
      data: { username: `${saveProfile.name} ${saveProfile.lastName}` },
      message: 'User created sucessfully',
      statusCode: HttpStatus.OK,
    };
  }

  async loginAccess(userDto: LoginUserDTO) {
    const user = await this.userRepository.findOne({
      where: {
        email: userDto.email,
      },
    });
    if (!user) throw new BadRequestException('invalid credentials');

    const profile = await this.profileRepository.findOne({ where: { user } });

    const isMatch = await bcrypt.compare(userDto.password, user.password);
    if (!isMatch) throw new BadRequestException('invalid credentials');

    const payload: ITokenInterface = {
      id: user.id,
      username: user.profile,
      sub: user.password,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      userName: `${profile.name} ${profile.lastName}`,
    };
  }

  async verifyUser(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('Token de acceso inválido');
    }

    const profile = await this.profileRepository.findOne({
      where: {
        user,
      },
    });
    return {
      userName: `${profile.name} ${profile.lastName}`,
      isAuthenticated: true,
    };
  }
}
