import type { DogState } from '$lib/stores/dogs.svelte';
import type { SortType } from '$lib/types';

export const getInfoFromSearchParams = (searchParams: URLSearchParams) => {
	const breeds = searchParams.get('breeds')?.split(',') || [];
	const ageMin = parseInt(searchParams.get('ageMin') || '0');
	const ageMax = parseInt(searchParams.get('ageMax') || '20');
	const size = parseInt(searchParams.get('size') || '10');
	const page = parseInt(searchParams.get('page') || '1');
	const sort = (searchParams.get('sort') as SortType) || ('breed:asc' as SortType);
	const from = (page - 1) * size;

	return { breeds, ageMin, ageMax, size, page, sort, from };
};

export const DEFAULT_DOG_URL = '/dogs/search?size=10&sort=breed%3Aasc&page=1';

export function createSearchUrl(dogState: DogState, page?: number) {
	const searchParams = new URLSearchParams();

	searchParams.set('sort', dogState.sort);
	searchParams.set('ageMin', dogState.ageMin.toString());
	searchParams.set('ageMax', dogState.ageMax.toString());
	searchParams.set('page', (page ?? dogState.pagination.page).toString());

	if (dogState.selectedBreeds.length > 0) {
		searchParams.set('breeds', dogState.selectedBreeds.join(','));
	}

	if (dogState.selectedZipCodes.length > 0) {
		searchParams.set('zipCodes', dogState.selectedZipCodes.join(','));
	}

	return `${window.location.pathname}?${searchParams.toString()}`;
}
