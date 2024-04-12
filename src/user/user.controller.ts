import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDto, UserSignInDto, UserScoreDto, UserStageDto } from './user.dto'

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

  @Post("/score")
  @UsePipes(new ValidationPipe())
  async totalScoreUser(@Body() dto:UserStageDto) {
    return this.userService.userTotalScore(dto);
  }
}