<script lang="ts">
	import { onDestroy } from 'svelte';

	import { X } from '$lib/icons';
	import { Badge } from '$lib/ui/badge';
	import { Button } from '$lib/ui/button';
	import type { SelectItem } from '$lib/ui/select';
	import * as Select from '$lib/ui/select';
	import { debounce } from '$lib/utils/debounce';

	interface BreedSelectProps {
		selectedBreeds: string[];
		breeds: string[];
		selectedBreedsChanged: () => Promise<void>;
	}

	let { selectedBreeds = $bindable(), breeds, selectedBreedsChanged }: BreedSelectProps = $props();
	let hasMouseLeft = $state(false);
	const visibleLimit = 2;

	const handleMouseEnter = () => {
		hasMouseLeft = false;
	};

	function handleMouseLeave(): void {
		hasMouseLeft = true;
	}

	const debouncedUpdateSelectedBreeds = debounce((newSelectedBreeds: string[]) => {
		selectedBreeds = newSelectedBreeds;
	}, 100);

	const handleSelect = (selected: SelectItem[]): void => {
		const newSelectedBreeds = selected.map((s) => s.value);
		debouncedUpdateSelectedBreeds(newSelectedBreeds);
	};

	const handleRemoveBreed = (breed: string): void => {
		const newSelectedBreeds = selectedBreeds.filter((b) => b !== breed);
		debouncedUpdateSelectedBreeds(newSelectedBreeds);
	};

	onDestroy(() => {
		debouncedUpdateSelectedBreeds.flush();
	});
</script>

<div class="flex flex-col gap-2 items-start w-full relative">
	<Select.Root
		selected={selectedBreeds.map((breed) => ({ value: breed, label: breed }))}
		onSelectedChange={(selected) => handleSelect(selected as unknown as SelectItem[])}
		preventScroll={false}
		multiple={true}
	>
		<Select.Trigger
			class="max-w-screen-sm"
			onmouseleave={handleMouseLeave}
			onmouseenter={handleMouseEnter}
		>
			{#if selectedBreeds.length > 0}
				{#if selectedBreeds.length > visibleLimit}
					{selectedBreeds.slice(0, visibleLimit).join(', ')}
					<Badge size="sm" class="ml-2">
						+{selectedBreeds.length - visibleLimit} more
					</Badge>
				{:else}
					{selectedBreeds.join(', ')}
				{/if}
			{:else}
				<Select.Value placeholder="Select Breed" />
			{/if}
		</Select.Trigger>
		<Select.Content fitViewport={true} class="max-h-[300px] overflow-y-auto ">
			{#each breeds as breed}
				<Select.Item value={breed}>{breed}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
	<div class="relative top-10 left-0 flex gap-2 flex-wrap">
		{#each selectedBreeds as breed, i}
			<Badge size="sm" class="flex gap-2 items-center">
				{breed}
				<Button
					id={`remove-breed-${i}`}
					class="h-4 w-4 p-0"
					variant="ghost"
					size="sm"
					on:click={() => handleRemoveBreed(breed)}
				>
					<X class="w-3 h-3" />
				</Button>
			</Badge>
		{/each}
	</div>
</div>
