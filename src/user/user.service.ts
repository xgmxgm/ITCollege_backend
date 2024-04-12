import { BadRequestException, Injectable } from '@nestjs/common';
import { UserSignUpDto, UserSignInDto, UserStageScoreDto, UserStageDto } from './user.dto'
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
				},
				include: {
					stages: {
						include: {
							referees: true
						}
					}
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

			return {User}
		} catch(err) {
			console.log(err)

			throw new BadRequestException("Авторизация прошла неудачно !")
		}
	}

	async stageScoreUser(dto: UserStageScoreDto) {
		try {
			const FindStudent = await prisma.user.findFirst({
				where: {
					id: dto.StudentId
				}
			})

			const FindReferee = await prisma.user.findFirst({
				where: {
					id: dto.RefereeId
				}
			})

			const Student = await prisma.user.update({
				where: {
					id: dto.StudentId,
				},
				data: {
					stages: {
						create: {
							stageName: dto.StageName,
							referees: {
								create: {
									refereeName: FindReferee.fullName,
									score: dto.Score
								}
							}
						}
					},
				}
			})

			const {passwordHash, ...User} = Student;

			return User
		} catch(err) {
			console.error(err)

			throw new BadRequestException("Ошибка оценкий !")
		}
	}
}