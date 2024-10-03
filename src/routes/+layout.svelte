<script lang="ts">
	import '../app.pcss';

	import { ModeWatcher } from 'mode-watcher';

	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import { afterNavigate, goto } from '$app/navigation';
	import TopMenuBar from '$lib/components/top-menu-bar.svelte';
	import { setDogState } from '$lib/stores/dogs.svelte';
	import { setUserState } from '$lib/stores/user.svelte';

	const { children } = $props();
	const user = setUserState();
	const dogState = setDogState();

	const unprotectedRoutes = ['/login', '/'];

	const handleNotAuthenticated = () => {
		if (
			!user.isAuthenticated &&
			!unprotectedRoutes.includes(location.pathname) &&
			browser &&
			user.hasCheckedAuth
		) {
			goto('/login');
		}
	};

	if (browser) {
		afterNavigate(handleNotAuthenticated);
	}

	onMount(async () => {
		if (browser) {
			await user.checkLogin();

			if (user.isAuthenticated) {
				await dogState.initialize();
			}
		}
	});
</script>

<ModeWatcher />

<main class="h-screen w-full flex flex-col">
	<TopMenuBar />

	<section class="flex-grow flex flex-col md:overflow-scroll pt-14">
		{@render children()}
	</section>
</main>
