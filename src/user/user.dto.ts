import { IsEmail, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator'

export class UserSignUpDto {
	@IsString()
	FullName: string;

	@IsEmail()
	Email: string;

	@IsString()
	Password: string;

	@IsOptional()
	@IsUrl()
	AvatarURL: string;

	@IsString()
	Role: string;
}

export class UserSignInDto {
	@IsEmail()
	Email: string;

	@IsString()
	Password: string;
}

export class UserScoreDto {
	@IsNumber()
	Id: number;

	@IsNumber()
	Score: number;
}

export class UserStageDto {
	@IsNumber()
	Id: number;

	@IsNumber()
	refereeScore_1: number;

	@IsNumber()
	refereeScore_2: number;

	@IsNumber()
	refereeScore_3: number;

	@IsNumber()
	refereeScore_4: number;
}