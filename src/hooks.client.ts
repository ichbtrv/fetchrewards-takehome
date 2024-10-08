import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = async () => {
	const errorId = crypto.randomUUID();

	return {
		message: 'Whoops!',
		errorId
	};
};
