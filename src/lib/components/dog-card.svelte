<script lang="ts">
	import type { Dog, DogLocation } from '$lib/types';

	import { Heart } from '$lib/icons';
	import { Button } from '$lib/ui/button';
	import * as Card from '$lib/ui/card';

	const {
		dog,
		i,
		handleFavorite,
		location,
		isFavorite
	}: {
		dog: Dog;
		location: DogLocation;
		i: number;
		handleFavorite: (dogId: string) => void;
		isFavorite: boolean;
	} = $props();
</script>

<Card.Root class="relative group rounded-xl overflow-hidden shadow-lg max-h-[275px]">
	<picture class="relative block w-full h-full overflow-hidden">
		<img
			src={dog.img}
			alt={dog.name}
			class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200 animate-fadeIn"
		/>
		<div class="absolute inset-0 bg-black bg-opacity-20"></div>
		<div class="absolute top-2/3 left-0 right-0 bottom-0 bg-black bg-opacity-[5%]"></div>
	</picture>

	<div class="absolute inset-x-0 bottom-0 p-4 text-white z-10">
		<h2 class="text-lg font-semibold">{dog.name}, {dog.age}</h2>
		<p class="text-sm">{dog.breed}</p>
		<p class="text-xs flex w-fit bg-black/60 px-1.5 text-white/80 rounded-sm py-0.5">
			{#if location && location.city && location.state}
				{location.city}, {location.state}
			{/if}
			{#if location && location?.zip_code}
				{location.zip_code}
			{/if}
		</p>
	</div>

	<div class="absolute top-2 right-2 z-20 rounded-lg">
		<Button variant="outline" onclick={() => handleFavorite(dog.id)} class="h-full opacity-70 ">
			<Heart class="w-4 h-4 {isFavorite ? 'text-black fill-primary' : ''}" />
		</Button>
	</div>
</Card.Root>
