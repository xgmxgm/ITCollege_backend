import { BadRequestException, Injectable } from '@nestjs/common';
import { UserSignUpDto, UserSignInDto } from './user.dto'
import { Prisma, PrismaClient } from '@prisma/client'
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient();

@Injectable()
export class UserService {
	async signUpUser(dto: UserSignUpDto) {
		try {
			const salt = await bcrypt.genSalt(10);
			const passwordHashing = await bcrypt.hash(dto.Password, salt)

			const createUser = await prisma.user.create({
				data: {
					fullName: dto.FullName,
					email: dto.Email,
					passwordHash: passwordHashing,
					avatarURL: dto.AvatarURL,
					role: dto.Role
				}
			})

			const {passwordHash, ...User} = createUser;

			return User;
		} catch (err) {
			console.error(err)

			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				if (err.code == "P2002") {
					throw new BadRequestException("Регистрация прошла неудачно !")
				}
			}
		}
	}

	async signInUser(dto: UserSignInDto) {
		try {
			const findUser = await prisma.user.findFirst({
				where: {
					email: dto.Email
				}
			})

			if (!findUser) {
				return {
					message: "Не верный логин или пароль !",
				};
			}

			const isValidPassword = await bcrypt.compare(dto.Password, findUser.passwordHash);

			if (!isValidPassword) {
				return {
					message: "Не верный логин или пароль !",
				};
			}

			const {passwordHash, ...User} = findUser;

			return User
		} catch(err) {
			console.log(err)

			throw new BadRequestException("Авторизация прошла неудачно !")
		}
	}
}