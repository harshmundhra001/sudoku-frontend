export const API = {
	_base: 'http://localhost:8080/api',
	GAME: {
		_base: '/game',
		CREATE: '/create',
		START: '/start',
		FILL: '/fill',
		ISVALID: '/is-valid',
		JOIN: '/join',
		ID: {
			_base: '',
			PLAYER: '/player',
		},
	},
	AUTH: {
		_base: '/auth',
		LOGIN: '/log-in',
		SIGNUP: '/sign-up',
		GUEST: '/guest',
	},
} as const;

export const SOCKET = 'http://localhost:8080/';
