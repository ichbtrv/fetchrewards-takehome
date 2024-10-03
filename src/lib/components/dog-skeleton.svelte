<!-- dog-skeleton.svelte -->
<script lang="ts">
	import * as Card from '$lib/ui/card';
	import { Skeleton } from '$lib/ui/skeleton/index.js';
</script>

<Card.Root
	class="relative group rounded-xl overflow-hidden shadow-lg w-full aspect-[1/1] max-h-[275px] "
>
	<div class="flex flex-col w-full h-full">
		<div class="flex-grow relative h-full">
			<Skeleton class="w-full h-full bg-gray-200" />
			<Skeleton class="w-full h-full bg-gray-200" />
			<div class="absolute inset-0 bg-black bg-opacity-40"></div>
		</div>

		<div class="absolute top-2 right-2 z-20 rounded-lg">
			<Skeleton class="h-8 w-8 rounded-full bg-gray-300" />
		</div>
	</div>
</Card.Root>
