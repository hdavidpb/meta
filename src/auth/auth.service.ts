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
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();

    return users;
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
      ...userData,
      password: hash,
    });

    const savedUser = await this.userRepository.save(userInstance);
    return {
      data: { username: savedUser.name },
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

    const isMatch = await bcrypt.compare(userDto.password, user.password);
    if (!isMatch) throw new BadRequestException('invalid credentials');

    const payload = {
      username: user.name,
      sub: user.password,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
