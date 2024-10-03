<script lang="ts">
	import { getUserState } from '$lib/stores/user.svelte';
	import { Button } from '$lib/ui/button';
	import { DEFAULT_DOG_URL } from '$lib/utils/url';

	const user = getUserState();
	let buttonRoute = $derived(user.isAuthenticated ? DEFAULT_DOG_URL : '/login');
</script>

<Button href={buttonRoute} class="w-40">Find A Dog</Button>
