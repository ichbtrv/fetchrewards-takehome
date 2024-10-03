<script lang="ts">
	import { DogIcon, Heart, LogInIcon, LogOut, Menu, Settings, UserIcon } from '$lib/icons';
	import { Button } from '$lib/ui/button/index.js';
	import * as DropdownMenu from '$lib/ui/dropdown-menu/index.js';

	import { getUserState, UserState } from '$lib/stores/user.svelte';
	import { logout } from '$lib/utils/auth';
	import { DEFAULT_DOG_URL } from '$lib/utils/url';

	const user: UserState = getUserState();

	const handleLogOut = async () => {
		await logout();
		user.clearUser();
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="rounded-full border">
			<Menu class="w-4 h-4 cursor-pointer" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		{#if user.name}
			<DropdownMenu.Item>
				<span>Hello, {user.name}</span>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item href={DEFAULT_DOG_URL}>
					<DogIcon class="mr-2 h-4 w-4" />
					<span>Search For Dogs</span>
				</DropdownMenu.Item>
				<DropdownMenu.Item href="/dogs/match?favorites={user.favorites}">
					<Heart class="mr-2 h-4 w-4" />
					<span>Find a match</span>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Item href="/profile">
				<UserIcon class="mr-2 h-4 w-4" />
				<span>Profile</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item href="/settings">
				<Settings class="mr-2 h-4 w-4" />
				<span>Settings</span>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item onclick={handleLogOut}>
				<LogOut class="mr-2 h-4 w-4" />
				<span>Log out</span>
			</DropdownMenu.Item>
		{:else}
			<DropdownMenu.Item href="/login">
				<LogInIcon class="mr-2 h-4 w-4" />
				<span>Log In</span>
			</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
