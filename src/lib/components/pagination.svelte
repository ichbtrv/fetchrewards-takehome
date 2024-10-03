<script lang="ts">
	import type { Pagination as PaginationType } from '$lib/types';

	import { ChevronLeft, ChevronRight } from '$lib/icons';
	import * as Pagination from '$lib/ui/pagination';

	import { getDogState } from '$lib/stores/dogs.svelte';
	import { createSearchUrl } from '$lib/utils/url';

	const dogState = getDogState();

	let {
		pagination = $bindable(),
		position = 'center',
		onchange
	}: {
		pagination: PaginationType;
		position?: 'start' | 'center' | 'end';
		onchange?: (page: number) => void;
	} = $props();

	let { count, perPage, page } = $derived(pagination);

	const getCurrentPageFromParams = () => {
		const searchParams = new URLSearchParams(window.location.search);
		const page = searchParams.get('page');
		return page ? parseInt(page, 10) : 1;
	};

	let currentPage = $state(getCurrentPageFromParams());

	$effect(() => {
		currentPage = getCurrentPageFromParams();
	});
	const nextUrl = $derived(page + 1);
	const prevUrl = $derived(page - 1);

	$effect(() => {
		currentPage = page;
	});

	async function change(newPage: number) {
		currentPage = newPage;
	}
</script>

{#if count}
	<Pagination.Root
		{count}
		{perPage}
		bind:page={currentPage}
		onPageChange={change}
		let:pages
		let:currentPage
		class={position === 'start'
			? 'items-start'
			: position === 'center'
				? 'items-center'
				: 'items-end'}
	>
		<Pagination.Content>
			<Pagination.Item>
				<a
					href={createSearchUrl(dogState, prevUrl)}
					data-sveltekit-replacestate
					data-sveltekit-preload-data="hover"
				>
					<Pagination.PrevButton>
						<ChevronLeft class="h-4 w-4" />
						<span class="hidden sm:block">Previous</span>
					</Pagination.PrevButton>
				</a>
			</Pagination.Item>

			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<a
							href={createSearchUrl(dogState, page.value)}
							data-sveltekit-replacestate
							data-sveltekit-preload-data="false"
						>
							<Pagination.Link {page} isActive={currentPage === page.value}>
								{page.value}
							</Pagination.Link>
						</a>
					</Pagination.Item>
				{/if}
			{/each}

			<Pagination.Item>
				<a
					href={createSearchUrl(dogState, nextUrl)}
					data-sveltekit-replacestate
					data-sveltekit-preload-data="hover"
				>
					<Pagination.NextButton>
						<span class="hidden sm:block">Next</span>
						<ChevronRight class="h-4 w-4" />
					</Pagination.NextButton>
				</a>
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
{/if}
