import type { Dog, Pagination, DogLocation } from '$lib/types';
import { getBreeds } from '$lib/utils/request-support';
import { getContext, setContext } from 'svelte';

export class DogState {
	dogs = $state<Dog[]>([]);
	locations = $state<DogLocation[]>([]);
	breeds = $state<string[]>([]);
	pagination = $state<Pagination>({ page: 1, count: 0, perPage: 10 });
	sort = $state<string>('breed:asc');
	selectedBreeds = $state<string[]>([]);
	selectedZipCodes = $state<string[]>([]);
	ageMin = $state<number>(0);
	ageMax = $state<number>(20);
	size = $state<number>(10);
	from = $state<number>(0);
	isLoading = $state<boolean>(false);

	async initialize() {
		this.breeds = await getBreeds();
	}
}

const DOG_KEY = Symbol('DOG');

export function setDogState() {
	return setContext(DOG_KEY, new DogState());
}

export function getDogState() {
	return getContext<DogState>(DOG_KEY);
}
