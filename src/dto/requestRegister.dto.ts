import {
	IsString,
	Length,
} from 'class-validator'
import { ContainsAny } from 'src/decorators/containsAny.decorator'

export class RegisterDto {
	@IsString()
	login: string

	@IsString()
	@Length(6)
	@ContainsAny(['.', ',', '!', '_'])
	password: string

	@IsString()
	fio: string
}
