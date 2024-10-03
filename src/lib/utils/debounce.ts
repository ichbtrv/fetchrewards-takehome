export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
	func: T,
	wait: number,
	immediate = false
): {
	(...args: Parameters<T>): void;
	cancel: () => void;
	flush: () => ReturnType<T> | undefined;
} {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	let result: ReturnType<T> | undefined;
	let lastArgs: Parameters<T> | undefined;

	const debounced = (...args: Parameters<T>): ReturnType<T> | undefined => {
		lastArgs = args;

		const later = () => {
			timeout = null;
			if (!immediate) {
				result = func(...args);
			}
		};

		const callNow = immediate && !timeout;

		if (timeout !== null) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(later, wait);

		if (callNow) {
			result = func(...args);
		}

		return result;
	};

	debounced.cancel = () => {
		if (timeout !== null) {
			clearTimeout(timeout);
			timeout = null;
		}
	};

	debounced.flush = (): ReturnType<T> | undefined => {
		if (timeout !== null && lastArgs !== null) {
			clearTimeout(timeout);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			result = func(...lastArgs);
			timeout = null;
		}
		return result;
	};

	return debounced;
}
