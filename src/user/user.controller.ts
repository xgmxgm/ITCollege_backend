import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDto, UserSignInDto, UserStageScoreDto, UserStageDto } from './user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/signup")
  @UsePipes(new ValidationPipe())
  async signUpUser(@Body() dto:UserSignUpDto) {
    return this.userService.signUpUser(dto);
  }

  @Post("/signin")
  @UsePipes(new ValidationPipe())
  async signInUser(@Body() dto:UserSignInDto) {
    return this.userService.signInUser(dto);
  }

  @Post("/stage/score")
  @UsePipes(new ValidationPipe())
  async stageScoreUser(@Body() dto:UserStageScoreDto) {
    return this.userService.stageScoreUser(dto);
  }
}