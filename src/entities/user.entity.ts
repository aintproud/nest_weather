import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Action } from './action.entity'

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'text' })
	fio: string

	@Column({ type: 'text' })
	api_token: string

	@Column({ type: 'text' })
	login: string

	@Column({ type: 'text' })
	password_hash: string

	@ManyToOne(() => Action, (action) => action.user_id)
	action: Action
}
