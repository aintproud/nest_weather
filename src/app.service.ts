import { Injectable } from '@nestjs/common'
import { randomUUID, scryptSync } from 'crypto'
import { RegisterDto } from './dto/requestRegister.dto'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LoginDto } from './dto/requestLogin.dto'
import { WeatherDto } from './dto/requestwWeather.dot'
import { stringify } from 'node:querystring'
import { Action } from './entities/action.entity'
import { Response } from 'express'

@Injectable()
export class AppService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		@InjectRepository(Action)
		private actionsRepository: Repository<Action>
	) {}
	async register(
		body: RegisterDto,
		res: Response
	): Promise<Response<any, Record<string, any>>> {
		try {
			const passwordHash = await this.hashPassword(body.password)
			const apiToken = randomUUID()
			await this.usersRepository.save({
				fio: body.fio,
				login: body.login,
				password_hash: passwordHash,
				api_token: apiToken,
			})
			const json = {
				fio: body.fio,
				apiToken,
			}
			return res.status(200).json(json)
		} catch (error) {
			return res.sendStatus(500)
		}
	}
	async login(
		body: LoginDto,
		res: Response
	): Promise<Response<any, Record<string, any>>> {
		try {
			const user = await this.usersRepository.findOneBy({
				login: body.login,
			})
			const passwordHash = await this.hashPassword(body.password)
			if (user && user.password_hash === passwordHash) {
				const json = {
					fio: user.fio,
					apiToken: user.api_token,
				}
				return res.status(200).json(json)
			} else {
				return res.status(401).send('Unauthorized')
			}
		} catch (error) {
			return res.sendStatus(500)
		}
	}
	async getWeather(
		body: WeatherDto,
		res: Response
	): Promise<Response<any, Record<string, any>>> {
		try {
			const user = await this.usersRepository.findOneBy({
				api_token: body.apiToken,
			})
			if (!user) return res.status(401).send('Unauthorized')
			const params = {
				key: process.env.WEATHER_API_KEY,
				q: body.city,
				lang: body.language,
			}
			const url = new URL('http://api.weatherapi.com/v1')
			url.search = stringify(params)
			url.pathname += '/current.json'
			const weatherRes = await fetch(url, {
				method: 'POST',
			})
			const json = await weatherRes.json()
			await this.actionsRepository.save({
				user_id: user.id,
				action_time: Math.floor(Date.now() / 1000),
				temp_c: json?.current?.temp_c || null,
				request_result: weatherRes.status,
			})
			return res.status(200).json(json)
		} catch (error) {
			return res.sendStatus(500)
		}
	}
	async hashPassword(password: string): Promise<string> {
		return scryptSync(password, process.env.SCRYPT_SALT, 32).toString('hex')
	}
}
