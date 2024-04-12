import { BadRequestException, Injectable } from '@nestjs/common';
import { UserSignUpDto, UserSignInDto, UserScoreDto, UserStageDto } from './user.dto'
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

	async userTotalScore(dto: UserScoreDto) {
		try {
			const FindUser = await prisma.user.findFirst({
				where: {
					id: dto.Id
				}
			})

			const User = await prisma.user.update({
				where: {
					id: dto.Id,
				},
				data: {
					totalScore: FindUser.totalScore + dto.Score
				}
			})

			return User
		} catch(err) {
			console.error(err)

			throw new BadRequestException("Ошибка оценкий !")
		}
	}

	async userIntroducingYourself(dto: UserStageDto) {
		try {
			const FindUser = await prisma.user.findFirst({
				where: {
					id: dto.Id
				}
			})

			const Stage = await prisma.introducingYourself.create({
				data: {
					refereeScore_1: dto.refereeScore_1,
					refereeScore_2: dto.refereeScore_2,
					refereeScore_3: dto.refereeScore_3,
					refereeScore_4: dto.refereeScore_4,
					studentId: dto.Id
				}
			})

			// const User = await prisma.user.update({
			// 	where: {
			// 		id: dto.Id,
			// 	},
			// 	data: {
			// 		IntroducingYourselfScores: {
			// 			update: {

			// 			}
			// 		}
			// 	}
			// })
		} catch(err) {
			console.error(err)

			throw new BadRequestException("Ошибка оценкий !")
		}
	}
}