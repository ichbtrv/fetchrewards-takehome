<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { PawPrint } from '$lib/icons';

	let icon: HTMLElement | null = null;
	let angle = 0;
	let m = { x: 0, y: 0 };
	let iconCenter = { x: 0, y: 0 };

	function updateIconCenter() {
		if (icon) {
			const rect = icon.getBoundingClientRect();
			iconCenter.x = rect.left + rect.width / 2;
			iconCenter.y = rect.top + rect.height / 2;
		}
	}

	function handleMove(event: PointerEvent) {
		m.x = event.clientX;
		m.y = event.clientY;

		if (icon) {
			updateIconCenter();

			const deltaX = m.x - iconCenter.x;
			const deltaY = m.y - iconCenter.y;
			angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
		}
	}

	onMount(() => {
		if (icon) {
			updateIconCenter();
			window.addEventListener('resize', updateIconCenter);
			window.addEventListener('pointermove', handleMove);
		}
	});

	onDestroy(() => {
		window.removeEventListener('resize', updateIconCenter);
		window.removeEventListener('pointermove', handleMove);
	});
</script>

<div class="w-12 h-12 flex items-center justify-center bg-secondary/5 rounded-full">
	<div bind:this={icon} class="text-secondary rotate" style="transform: rotate({angle}deg);">
		<PawPrint class="w-8 h-8 text-primary -rotate-45" />
	</div>
</div>

<style>
	.rotate {
		transition: transform 0.6s ease;
	}
</style>
