// using Postman and http://json2ts.com/ to quickly convert results to types

// /films/?search= call
export interface IFilm {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: Date;
  edited: Date;
  url: string;
}

// all SWAPI endpoints have same search response patter,
// so might as well set it up as Generic..
export interface SearchResults<ResourceType> {
  count: number;
  next?: string;
  previous?: string;
  results: ResourceType[] | [];
}

// /people/:id call:
export type ICharacter = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: any[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
};
