import type { PageLoad } from '../$types';
import { getDogMatchId, getDogsByIds, getLocationsByZipCodes } from '$lib/utils/request-support';
export const ssr = false;

export const load: PageLoad = async ({ url }) => {
	const searchParams = url.searchParams;
	const favorites = searchParams.get('favorites')?.split(',') || [];

	if (!favorites.length) {
		return {
			match: '',
			dogMatch: []
		};
	}

	const match = await getDogMatchId(favorites);
	if (match && match.match) {
		const dogId = String(match.match);
		const dogMatch = await getDogsByIds([dogId]);
		if (dogMatch && dogMatch.length > 0) {
			const location = await getLocationsByZipCodes(dogMatch.map((dog) => dog.zip_code));

			return {
				match: match?.match,
				location: location,
				dogMatch: dogMatch
			};
		}

		return {
			match: match?.match,
			dogMatch: []
		};
	}
};
