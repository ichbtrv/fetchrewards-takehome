import { loginUser } from '$lib/utils/auth';
import { getContext, setContext } from 'svelte';
import { browser } from '$app/environment';

export class UserState {
	name = $state<string>('');
	email = $state<string>('');
	favorites = $state<string[]>([]);
	isAuthenticated = $state(false);

	hasCheckedAuth = $state(false);

	updateUserInfo(name: string, email: string) {
		this.name = name;
		this.email = email;
		this.writeUser();
	}

	addUserFavorite(favorite: string) {
		this.favorites.push(favorite);
		this.writeUser();
	}

	removeUserFavorite(favorite: string) {
		this.favorites = this.favorites.filter((id) => id !== favorite);
		this.writeUser();
	}

	clearUser() {
		this.isAuthenticated = false;
		this.hasCheckedAuth = false;
		this.name = '';
		this.email = '';
		this.favorites = [];
	}

	private writeUser() {
		if (browser) {
			localStorage.setItem(
				'user',
				JSON.stringify({
					name: this.name,
					email: this.email,
					favorites: this.favorites
				})
			);
		}
	}

	private readUser() {
		if (browser) {
			const user = localStorage.getItem('user');

			if (user) {
				const userObj = JSON.parse(user);
				this.name = userObj.name;
				this.email = userObj.email;
				this.favorites = userObj.favorites || [];

				return true;
			}
		}

		return false;
	}

	restoreUser(name: string, email: string) {
		const userRestored = this.readUser();
		if (!userRestored || this.name !== name || this.email !== email) {
			this.updateUserInfo(name, email);
		}
	}

	async checkLogin() {
		this.readUser();

		if (this.name && this.email) {
			const response = await loginUser(this.name, this.email);
			this.hasCheckedAuth = true;

			if (response) {
				this.isAuthenticated = true;
				return true;
			}
		}

		this.clearUser();
		return false;
	}

	checkUser() {
		this.hasCheckedAuth = true;
		this.isAuthenticated = true;
	}
}

const USER_KEY = Symbol('USER');

export function setUserState() {
	return setContext(USER_KEY, new UserState());
}

export function getUserState() {
	return getContext<UserState>(USER_KEY);
}
