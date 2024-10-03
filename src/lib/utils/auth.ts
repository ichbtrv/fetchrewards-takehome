import { goto } from '$app/navigation';
import { PUBLIC_FETCH_BASE_URL } from '$env/static/public';
import { fetchJson } from './request-support';

export const loginUser = async <T>(name: string, email: string): Promise<T | null> => {
	return fetchJson<T>(`${PUBLIC_FETCH_BASE_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, email })
	}) as Promise<T | null>;
};

export const logout = async () => {
	await fetchJson<void>(`${PUBLIC_FETCH_BASE_URL}/auth/logout`, {
		method: 'POST',
		credentials: 'include'
	});
	goto('/login', { replaceState: false });
};

export const getUserFromlocalStorage = () => {
	const user = localStorage.getItem('user');
	return user ? JSON.parse(user) : null;
};

export const setUserTolocalStorage = (user: {
	name: string;
	email: string;
	userFavorites: string[];
}) => {
	localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromlocalStorage = () => {
	localStorage.removeItem('user');
};
