<script lang="ts">
	import { fade } from 'svelte/transition';
	import PawPrintTrack from '$lib/components/paw-print-track.svelte';
	import { Button } from '$lib/ui/button';
</script>

<div
	in:fade={{ delay: 250, duration: 300 }}
	class="mx-auto h-full flex flex-col items-center justify-center"
>
	<div class="flex flex-col items-center justify-center p-8 space-y-4">
		<PawPrintTrack />
		<div class="flex flex-col items-center justify-center space-y-2">
			<h1 class="text-3xl md:text-4xl font-semibold text-center">Oops! Something went wrong.</h1>
			<p class="text-sm text-muted-foreground">
				We're not sure what happened, but we're working on it.
			</p>
		</div>
	</div>
	<Button href="/" class="w-40">Go Home</Button>
</div>
