export type ApiObject = {
	[key: string]: string | ApiObject | undefined;
	_base?: string;
};
