export interface User {
	name: string;
	email: string;
	favorites?: string[];
}

export type Pagination = {
	page: number;
	count: number;
	perPage: number;
};

export interface Dog {
	id: string;
	img: string;
	name: string;
	age: number;
	zip_code: string;
	breed: string;
}

export type Pagination = {
	page: number;
	count: number;
	perPage: number;
};

export interface Coordinates {
	lat: number;
	lon: number;
}

export interface DogLocation {
	zip_code: string;
	latitude: number;
	longitude: number;
	city: string;
	state: string;
	county: string;
}
export type SortType =
	| 'breed:asc'
	| 'breed:desc'
	| 'age:asc'
	| 'age:desc'
	| 'name:asc'
	| 'name:desc';
