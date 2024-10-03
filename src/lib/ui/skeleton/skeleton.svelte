<!-- Skeleton.svelte -->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/ui-utils.js';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	export let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div
	class={cn('bg-primary/10 animate-pulse rounded-md', className)}
	style="height: 100%; width: 100%;"
	{...$$restProps}
></div>
