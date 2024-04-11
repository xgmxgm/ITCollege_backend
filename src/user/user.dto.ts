import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator'

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