import { superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/schema/login';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	const form = await superValidate(event, zod(loginSchema));
	return { form };
};
