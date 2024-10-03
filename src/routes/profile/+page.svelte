<script lang="ts">
	import PawPrintTrack from '$lib/components/paw-print-track.svelte';
	import { getUserState } from '$lib/stores/user.svelte';
	import { Button } from '$lib/ui/button';
	import { DEFAULT_DOG_URL } from '$lib/utils/url';
	import { fade } from 'svelte/transition';

	const user = getUserState();
	let buttonRoute = $derived(user.isAuthenticated ? DEFAULT_DOG_URL : '/login');
</script>

<div
	in:fade={{ delay: 250, duration: 300 }}
	class="mx-auto h-full flex flex-col items-center justify-center"
>
	<div class="flex flex-col items-center justify-center p-8 space-y-4">
		<p class="mx-auto text-xs text-green-400">This is the profile page.</p>

		<PawPrintTrack />
		<div class="flex flex-col items-center justify-center space-y-2">
			<h1 class="text-3xl md:text-4xl font-semibold text-center">Find A Dog</h1>
			<p class="text-sm text-muted-foreground">Search the dog database to find a new pet.</p>
		</div>
	</div>
	<Button href={buttonRoute} class="w-40">Find A Dog</Button>
</div>
