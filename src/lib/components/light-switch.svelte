<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import Moon from 'svelte-radix/Moon.svelte';
	import Sun from 'svelte-radix/Sun.svelte';

	import { Button } from '$lib/ui/button';
</script>

<Button on:click={toggleMode} variant="ghost" size="icon" class="rounded-full border">
	<Sun class="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
	<Moon class="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
</Button>
