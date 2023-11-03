import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
} from 'class-validator'

export function ContainsAny(
	values: string[],
	validationOptions?: ValidationOptions
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'containsAny',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [values],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const [containsValues] = args.constraints
					return containsValues.some(
						(containsValue) =>
							value && value.includes(containsValue)
					)
				},
				defaultMessage(args: ValidationArguments) {
					const [containsValues] = args.constraints
					return `${
						args.property
					} should contain at least one of the following characters: ${containsValues.join(
						' '
					)}`
				},
			},
		})
	}
}
