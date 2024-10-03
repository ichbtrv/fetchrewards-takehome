<script lang="ts">
	import { Button } from '$lib/ui/button';
	import * as Tooltip from '$lib/ui/tooltip';
	import { DogIcon, Heart } from '$lib/icons';
	import LightSwitch from './light-switch.svelte';
	import MenuDropdown from './menu-dropdown.svelte';

	import { getUserState } from '$lib/stores/user.svelte';
	import { DEFAULT_DOG_URL } from '$lib/utils/url';

	const user = getUserState();
</script>

<nav
	class="fixed top-0 left-0 w-full h-14 bg-background text-foreground flex items-center justify-between px-4 z-50"
>
	<div class="flex items-center gap-2">
		<a href="/" class="text-lg font-semibold underline">Dawgs</a>
		<img src="https://fetch.com/favicon.png" alt="Fetch" class="w-4 h-4" />
	</div>
	<div class="flex items-center space-x-1">
		{#if user.isAuthenticated}
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						variant="ghost"
						href={DEFAULT_DOG_URL}
						size="icon"
						class="rounded-full border"
						builders={[builder]}
					>
						<DogIcon class="w-4 h-4 cursor-pointer" />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content side="bottom">
					<span class="text-sm">Search for dogs</span>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="ghost"
						href="/dogs/match?favorites={user.favorites}"
						size="icon"
						class="rounded-full border"
					>
						<Heart class="w-4 h-4 cursor-pointer" />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content side="bottom">
					<span class="text-sm">Find a match</span>
				</Tooltip.Content>
			</Tooltip.Root>
		{/if}
		<LightSwitch />
		<MenuDropdown />
	</div>
</nav>
