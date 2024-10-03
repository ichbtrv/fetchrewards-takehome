import type { PageLoad } from '../$types';

import { getLocationsByZipCodes, getBreeds, fetchDogsData } from '$lib/utils/request-support';
import { getInfoFromSearchParams } from '$lib/utils/url';
import { browser } from '$app/environment';

export const ssr = false;

export const load: PageLoad = async ({ url }) => {
	if (browser) {
		const searchParams = url.searchParams;
		const { breeds, ageMin, ageMax, size, page, sort, from } =
			getInfoFromSearchParams(searchParams);

		const { dogs, total } = await fetchDogsData({
			breeds: breeds.length ? breeds : undefined,
			ageMin,
			ageMax,
			size,
			from,
			sort
		});

		return {
			dogs,
			locations: await getLocationsByZipCodes(dogs?.map((dog) => dog.zip_code) || []),
			breeds: await getBreeds(),
			total,
			ageMin,
			ageMax,
			size,
			sort,
			page,
			from
		};
	}
};
