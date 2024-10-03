<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	import BreedSelect from '$lib/components/breed-select.svelte';
	import { getDogState } from '$lib/stores/dogs.svelte';
	import { Button } from '$lib/ui/button';
	import * as Dialog from '$lib/ui/dialog';
	import Input from '$lib/ui/input/input.svelte';
	import { Label } from '$lib/ui/label/index.js';
	import * as RadioGroup from '$lib/ui/radio-group';
	import * as Separator from '$lib/ui/separator';
	import * as Tabs from '$lib/ui/tabs';

	import { createSearchUrl } from '$lib/utils/url';

	const dogState = getDogState();

	let [initialAgeBreedName, initialAscendingOrDescending] = dogState.sort.split(':');
	let ageBreedName = $state(initialAgeBreedName || 'breed');
	let ascendingOrDescending = $state(initialAscendingOrDescending || 'asc');
	let sortString = $derived(`${ageBreedName}:${ascendingOrDescending}`);
	let isFilterModalOpen = $state(false);

	const updateFilters = (isModalClosing: boolean) => {
		if (!isModalClosing) {
			dogState.sort = sortString;
			dogState.pagination.page = 1;

			const newUrl = createSearchUrl(dogState, 1);

			goto(newUrl, {
				replaceState: true,
				invalidateAll: false,
				keepFocus: true,
				noScroll: true
			});
		}
	};
</script>

<section class=" flex px-4 justify-between pt-8 items-center w-full">
	<p class="text-xs opacity-70">
		{dogState.from + 1} to {dogState.from + dogState.size} of {dogState.pagination.count} dogs
	</p>

	<Dialog.Root bind:open={isFilterModalOpen} onOpenChange={updateFilters}>
		<Dialog.Trigger class="">
			<Button disabled={dogState.isLoading || !dogState.dogs.length}>Show Filters</Button>
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay
				transition={fade}
				transitionConfig={{ duration: 150 }}
				class="fixed inset-0 z-50 bg-black/80"
			/>
			<Dialog.Content
				class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-card-lg border bg-background p-5 shadow-popover outline-none sm:max-w-[490px] md:w-full"
			>
				<Dialog.Title
					class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
				>
					Filter your search
				</Dialog.Title>
				<Separator.Root class="mb-6 mt-5 block h-px bg-muted" />
				<Dialog.Description class="text-sm text-foreground-alt">
					Filter the search results by age, breed, and name.
				</Dialog.Description>
				<div class="flex flex-col space-y-4">
					<RadioGroup.Root bind:value={ascendingOrDescending}>
						<div class="flex items-center space-x-2">
							<RadioGroup.Item value="asc" id="asc" />
							<Label for="asc">Ascending</Label>
						</div>
						<div class="flex items-center space-x-2">
							<RadioGroup.Item value="desc" id="desc" />
							<Label for="desc">Descending</Label>
						</div>
					</RadioGroup.Root>
					<div class="h-full flex items-center justify-center">
						<Tabs.Root
							class="w-[400px]"
							bind:value={ageBreedName}
							onValueChange={(v: string | undefined) => (ageBreedName = v ?? '')}
						>
							<Tabs.List class="grid w-full grid-cols-3">
								<Tabs.Trigger value="breed">Breed</Tabs.Trigger>
								<Tabs.Trigger value="age">Age</Tabs.Trigger>
								<Tabs.Trigger value="name">Name</Tabs.Trigger>
							</Tabs.List>
						</Tabs.Root>
					</div>
					<div>
						<Label for="ageMin">Min Age</Label>
						<Input
							id="ageMin"
							type="number"
							min={1}
							max={100}
							bind:value={dogState.ageMin}
							placeholder="Min Age"
						/>
						<Label for="ageMax">Max Age</Label>
						<Input
							id="ageMax"
							type="number"
							min={1}
							max={100}
							bind:value={dogState.ageMax}
							placeholder="Max Age"
						/>
					</div>
					<BreedSelect
						bind:selectedBreeds={dogState.selectedBreeds}
						breeds={dogState.breeds}
						selectedBreedsChanged={() => Promise.resolve()}
					/>
				</div>
				<div class="flex w-full justify-end">
					<Dialog.Close
						class="inline-flex relative z-50 h-input items-center justify-center rounded-input rounded-lg py-2 bg-white/90 px-[50px] text-[15px] font-semibold text-secondary shadow-mini hover:bg-dark/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98 "
					>
						Save
					</Dialog.Close>
				</div>
				<Dialog.Close
					class="absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
				>
					<div>
						<span class="sr-only">Close</span>
					</div>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
</section>
