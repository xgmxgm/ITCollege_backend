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

export class UserStageScoreDto {
	@IsString()
	StageName: string;

	@IsNumber()
	StudentId: number;

	@IsNumber()
	RefereeId: number;

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