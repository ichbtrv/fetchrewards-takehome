import { PUBLIC_FETCH_BASE_URL } from '$env/static/public';
import type { Coordinates, Dog, DogLocation } from '$lib/types';

export const safeAwait = async <T, E = Error>(
	promise: Promise<T>
): Promise<[null, T] | [E, null]> => {
	try {
		const result = await promise;
		return [null, result];
	} catch (error) {
		return [error as E, null];
	}
};

export const fetchJson = async <T>(
	url: string,
	options: RequestInit = {},
	fetch = window.fetch
): Promise<T | string | null> => {
	const [error, response] = await safeAwait(
		fetch(url, {
			credentials: 'include',
			...options
		})
	);

	if (error) {
		console.error(`Network error while fetching from ${url}:`, error);
		return null;
	}

	if (!response || !response.ok) {
		console.error(`HTTP error response from ${url}: ${response?.status} ${response?.statusText}`);
		return null;
	}

	const contentType = response.headers.get('content-type') || '';

	if (contentType.includes('application/json')) {
		return parseJsonResponse<T>(response);
	}

	if (contentType.includes('text/plain')) {
		return parseTextResponse(response);
	}

	console.error(`Unsupported Content-Type from ${url}: ${contentType}`);
	return null;
};

const parseJsonResponse = async <T>(response: Response): Promise<T | null> => {
	try {
		const json = await response.json();
		return json as T;
	} catch (error) {
		console.error('Error parsing JSON response:', error);
		return null;
	}
};

const parseTextResponse = async <T>(response: Response): Promise<T | null> => {
	try {
		const text = await response.text();
		return text as T;
	} catch (error) {
		console.error('Error parsing text response:', error);
		return null;
	}
};

const BREEDS_CACHE_KEY = 'dog_breeds_cache';
const CACHE_EXPIRATION_TIME = 1000 * 60 * 60 * 24;

export const getBreeds = async (): Promise<string[]> => {
	const cachedData = localStorage.getItem(BREEDS_CACHE_KEY);
	if (cachedData) {
		const { breeds, timestamp } = JSON.parse(cachedData);
		if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
			return breeds;
		}
	}

	const breeds = await fetchJson<string[]>(`${PUBLIC_FETCH_BASE_URL}/dogs/breeds`);

	if (breeds && Array.isArray(breeds)) {
		localStorage.setItem(BREEDS_CACHE_KEY, JSON.stringify({ breeds, timestamp: Date.now() }));
	}

	return (Array.isArray(breeds) ? breeds : [breeds]).filter((breed): breed is string =>
		Boolean(breed)
	);
};

export const getDogsByIds = async (ids: string[]): Promise<Dog[] | null> => {
	return fetchJson<Dog[]>(`${PUBLIC_FETCH_BASE_URL}/dogs`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(ids)
	}) as Promise<Dog[] | null>;
};

export const getDogMatchId = async (ids: string[]): Promise<string | null> => {
	return fetchJson<Dog[]>(`${PUBLIC_FETCH_BASE_URL}/dogs/match`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(ids)
	}) as Promise<string | null>;
};

export const getDogs = async <T>(ids: string[]): Promise<T[] | null> => {
	return fetchJson<T[]>(`${PUBLIC_FETCH_BASE_URL}/dogs`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(ids)
	}) as Promise<T[] | null>;
};

export const searchDogs = async <T>(query: {
	breeds?: string[];
	zipCodes?: string[];
	ageMin?: number;
	ageMax?: number;
	size?: number;
	from?: number;
	sort?: string;
}): Promise<T | null> => {
	const queryParams = new URLSearchParams();

	Object.entries(query).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			value.forEach((item) => queryParams.append(key, item));
		} else if (value !== undefined) {
			queryParams.append(key, String(value));
		}
	});

	const url = `${PUBLIC_FETCH_BASE_URL}/dogs/search?${queryParams.toString()}`;
	return fetchJson<T>(url) as Promise<T | null>;
};

export const getLocationsByZipCodes = async (zipCodes: string[]): Promise<DogLocation[] | null> => {
	return fetchJson<DogLocation[]>(`${PUBLIC_FETCH_BASE_URL}/locations`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(zipCodes)
	}) as Promise<DogLocation[] | null>;
};

export const searchLocations = async (query: {
	city?: string;
	states?: string[];
	geoBoundingBox?: {
		top?: Coordinates;
		left?: Coordinates;
		bottom?: Coordinates;
		right?: Coordinates;
	};
	size?: number;
	from?: number;
}): Promise<{ results: Location[]; total: number } | null> => {
	return fetchJson<{ results: Location[]; total: number }>(
		`${PUBLIC_FETCH_BASE_URL}/locations/search`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				...query,
				size: query.size || 100
			})
		}
	) as Promise<{ results: Location[]; total: number } | null>;
};

export const fetchDogsData = async (params: {
	breeds?: string[];
	zipCodes?: string[];
	ageMin?: number;
	ageMax?: number;
	size?: number;
	from?: number;
	sort?: string;
}): Promise<{ dogs: Dog[] | null; total: number }> => {
	const breedResult = await searchDogs<{ resultIds: string[]; total: number }>({
		breeds: params.breeds,
		zipCodes: params.zipCodes,
		ageMin: params.ageMin,
		ageMax: params.ageMax,
		size: params.size || 10,
		from: params.from,
		sort: params.sort
	});

	if (!breedResult || !breedResult.resultIds.length) {
		return { dogs: null, total: 0 };
	}

	const dogs = await getDogs<Dog>(breedResult.resultIds);

	return { dogs, total: breedResult.total };
};
