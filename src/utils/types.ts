export type FireBaseLogin = {
	email: string
	password: string
}

export type FireBaseReg = {
	name: string
	email: string
	password: string
}

export type MyForm = {
	email: string
	password: string
}

export interface IKeyValue {
	id?: number
	key: string
	value: string
}
