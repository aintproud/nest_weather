import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Action {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'uuid' })
	user_id: String

	@Column({ type: 'bigint' })
	action_time: number

	@Column({ type: 'int' })
	request_result: number

	@Column({ type: 'int', nullable: true })
	temp_c: number
}
