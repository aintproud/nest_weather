import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { User } from './entities/user.entity'
import { Action } from './entities/action.entity'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			url: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/postgres',
			entities: [User, Action],
			synchronize: true,
		}),
		TypeOrmModule.forFeature([User, Action]),
		ConfigModule.forRoot(),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
