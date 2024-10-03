<script lang="ts">
	import DogCardContainer from '$lib/components/dog-card-container.svelte';
	import Filters from '$lib/components/filters.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import { getDogState } from '$lib/stores/dogs.svelte.js';

	const { data } = $props();
	let { locations } = data;
	let isLoading = $state(false);

	const dogState = getDogState();

	$effect(() => {
		if (data && locations) {
			dogState.dogs = data.dogs ?? [];
			dogState.locations = data.locations ?? [];
			dogState.breeds = data.breeds ?? [];
			dogState.ageMin = data.ageMin ?? 0;
			dogState.ageMax = data.ageMax ?? 0;
			dogState.size = data.size ?? 0;
			dogState.sort = data.sort ?? '';
			dogState.pagination = {
				page: data.page ?? 1,
				count: data.total ?? 0,
				perPage: data.size ?? 0
			};
			dogState.from = data.from ?? 0;
		}
	});
</script>

<div class="flex flex-col items-center lg:justify-center xl:h-full space-y-4">
	<Filters />
	<div class="flex-grow w-full">
		<DogCardContainer />
	</div>
	<div class="py-4">
		<Pagination bind:pagination={dogState.pagination} />
	</div>
</div>
