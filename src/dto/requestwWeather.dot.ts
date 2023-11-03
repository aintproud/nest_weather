import {
	IsString,
	IsUUID,
	IsOptional,
} from 'class-validator'

export class WeatherDto {
	@IsUUID()
	apiToken: string

	@IsString()
	city: string

	@IsString()
	@IsOptional()
	language?: string
}
