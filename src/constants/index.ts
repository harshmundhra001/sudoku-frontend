export const API = {
	_base: 'http://localhost:8080/api',
	GAME: {
		_base: '/game',
		CREATE: '/create',
		START: '/start',
		SUBMIT: '/submit',
		JOIN: '/join',
		ID: '',
	},
	AUTH: {
		_base: '/auth',
		LOGIN: '/log-in',
		SIGNUP: '/sign-up',
		GUEST: '/guest',
	},
} as const;

export const SOCKET = 'http://localhost:8080/'
