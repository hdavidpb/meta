import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginUserDTO, UserDTO } from 'src/dtos/user.dto';

import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/auth')
export class AuthController {
  constructor(readonly userService: AuthService) {}

  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Post('register')
  createUser(@Body() body: UserDTO) {
    return this.userService.createUser(body);
  }

  @Post('login')
  loginUser(@Body() body: LoginUserDTO) {
    return this.userService.loginAccess(body);
  }
  @Get('/verify')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  verifyUser(@Request() res: any) {
    return this.userService.verifyUser(res.user.id);
  }
}
