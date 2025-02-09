import { API } from '@/constants';
import { ApiObject } from '@/types/general';

export const constructUrl = (endpointPath: string, id: string = ''): string => {
	// Split the endpoint path into an array of keys
	const keys = endpointPath.split('.');

	// Start with the base URL
	let url: string = '';

	// Traverse the API object using the keys
	let current: ApiObject | string = API;
	
	for (const key of keys) {
		if (key === 'API') {
			url += current._base;
			continue;
		}
		if (typeof current !== 'object' || current[key] === undefined) {
			throw new Error(`Invalid endpoint path: ${endpointPath}`);
		}

		if (typeof current[key] === 'string') {
			url += current[key];
		} else if (typeof current[key] === 'object') {
			current = current[key];
			url += current._base;
		}
	}

	return url+id;
};
