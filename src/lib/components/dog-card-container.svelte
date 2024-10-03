<script lang="ts">
	import { getUserState } from '$lib/stores/user.svelte';
	import { getDogState } from '$lib/stores/dogs.svelte';
	import DogCard from './dog-card.svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import DogSkeleton from './dog-skeleton.svelte';

	const { skeletonCount = 10 } = $props();

	const user = getUserState();
	const dogState = getDogState();

	const handleFavorite = (dogId: string) => {
		if (!user.favorites.includes(dogId)) {
			user.addUserFavorite(dogId);
		} else {
			user.removeUserFavorite(dogId);
		}
	};

	beforeNavigate(() => {
		dogState.isLoading = true;
	});

	afterNavigate(() => {
		dogState.isLoading = false;
	});
</script>

<div class="w-full mx-auto px-4">
	<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
		{#if dogState.isLoading}
			{#each Array(skeletonCount) as _}
				<DogSkeleton />
			{/each}
		{:else}
			{#each dogState.dogs as dog, i}
				<DogCard
					{dog}
					{i}
					{handleFavorite}
					isFavorite={user.favorites.includes(dog.id)}
					location={dogState.locations[i]}
				/>
			{/each}
		{/if}
	</div>
</div>
