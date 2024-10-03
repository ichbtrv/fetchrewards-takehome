<!-- src/routes/login/+page.svelte -->

<script>
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	import Landing from '$lib/components/landing.svelte';
	import PawPrintTrack from '$lib/components/paw-print-track.svelte';
	import Spinner from '$lib/components/spinner.svelte';

	import { Button } from '$lib/ui/button';
	import { Input } from '$lib/ui/input';
	import { loginUser } from '$lib/utils/auth';
	import { DEFAULT_DOG_URL } from '$lib/utils/url';

	import { getUserState } from '$lib/stores/user.svelte';

	const user = getUserState();

	let name = $state('');
	let email = $state('');
	let errorMessage = $state('');
	let isSubmitting = $state(false);
	let showAuthStatus = $state(true);
	let inFade = $state({
		delay: 250,
		duration: 300
	});

	async function handleLogin() {
		errorMessage = '';

		if (!name.trim() || !email.trim()) {
			errorMessage = 'Please enter your name and email.';
			return;
		}

		try {
			isSubmitting = true;

			const response = await loginUser(name, email);

			if (response) {
				await user.checkUser();
				user.restoreUser(name, email);
				inFade = {
					delay: 0,
					duration: 0
				};

				goto(DEFAULT_DOG_URL, {
					replaceState: false,
					invalidateAll: true
				});
				showAuthStatus = false;
			} else {
				errorMessage = 'Authentication failed. Please check your credentials.';
			}
		} catch (error) {
			console.error('Login error:', error);
			errorMessage = 'An unexpected error occurred. Please try again.';
		} finally {
		}
		isSubmitting = false;
	}
</script>

{#if isSubmitting}
	<div class="w-full flex flex-col justify-center items-center h-full pt-14">
		<Spinner />
	</div>
{:else if user.isAuthenticated && showAuthStatus}
	<div class="w-full flex flex-col items-center">
		<p class="mx-auto text-xs text-green-400">You are already signed in as {user.name}.</p>
		<Landing />
	</div>
{:else if !user.isAuthenticated}
	<div
		in:fade={{ duration: 100 }}
		class="h-screen flex flex-col items-center justify-center p-8 space-y-4"
	>
		<PawPrintTrack />
		<div class="flex flex-col items-center justify-center space-y-2">
			<h1 class="text-3xl md:text-4xl font-semibold text-center">Find A Dog</h1>
			<p class="text-sm text-muted-foreground">Search the dog database to find a new pet.</p>
		</div>
		<form on:submit|preventDefault={handleLogin} class="flex flex-col space-y-2">
			{#if errorMessage}
				<div class="error">{errorMessage}</div>
			{/if}
			<Input
				autofocus
				bind:value={name}
				type="text"
				placeholder="Name"
				required
				disabled={isSubmitting}
			/>

			<Input bind:value={email} type="email" placeholder="Email" required disabled={isSubmitting} />
			<Button class="w-full" type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Signing In...' : 'Sign In with Email'}
			</Button>
		</form>
	</div>
{/if}

<style>
	.error {
		color: red;
		margin-bottom: 1em;
	}
</style>
