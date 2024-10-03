import { z } from 'zod';

export const loginSchema = z.object({
	name: z.string().nonempty('Name is required'),
	email: z.string().email('Invalid email address')
});

export type LoginSchema = typeof loginSchema;
