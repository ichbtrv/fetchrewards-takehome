<script lang="ts">
	import DogCardContainer from '$lib/components/dog-card-container.svelte';
	import DogDirectoryButton from '$lib/components/dog-directory-button.svelte';

	import { getDogState } from '$lib/stores/dogs.svelte.js';

	const { data } = $props();

	const dogState = getDogState();
	$effect(() => {
		if (data.match && data.dogMatch?.length && data.location?.length) {
			dogState.dogs = data.dogMatch;
			dogState.locations = data.location;
		}
	});
</script>

<div class="flex flex-col mt-14 space-y-4 flex-grow">
	{#if data.match}
		<p class="px-4">You've got a match!</p>
		<DogCardContainer skeletonCount={1} />
	{:else}
		<div class="px-4">
			<p class="pb-2">Go favorite some dogs, then come back here to get a match</p>
			<DogDirectoryButton />
		</div>
	{/if}
</div>
