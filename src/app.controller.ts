import {
	Body,
	Controller,
	Get,
	Post,
	Res,
	ValidationPipe,
} from '@nestjs/common'
import { AppService } from './app.service'
import { RegisterDto } from './dto/requestRegister.dto'
import { LoginDto } from './dto/requestLogin.dto'
import { WeatherDto } from './dto/requestwWeather.dot'
import { Response } from 'express'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	root(): string {
		return '<h1>Weather Test Project</h1><h2>Make it to /api route to view docs</h2>'
	}

	@Post('register')
	async register(
		@Body(new ValidationPipe()) body: RegisterDto,
		@Res() res: Response
	): Promise<Response<any, Record<string, any>>> {
		return await this.appService.register(body, res)
	}

	@Post('login')
	async login(
		@Body(new ValidationPipe()) body: LoginDto,
		@Res() res: Response
	): Promise<Response<any, Record<string, any>>> {
		return await this.appService.login(body, res)
	}

	@Post('weather')
	async weather(
		@Body(new ValidationPipe()) body: WeatherDto,
		@Res() res: Response
	): Promise<Response<any, Record<string, any>>> {
		return await this.appService.getWeather(body, res)
	}
}
