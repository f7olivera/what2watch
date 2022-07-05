import { QueryFunction, QueryKey } from "react-query";

export interface IGenreNames {
  [id: string | number]: string
}

export interface IGenreIds {
  [name: string]: string | number
}

export interface IGenre {
  name: string,
  id: string | number,
}

export interface IGenreMedia {
  category: string
  media: string
  id: IGenre['id'],
  page?: number,
}

export interface IMovie {
  title: string,
  name: string,
  id: number,
  runtime: number | null,
  tagline: string,
  overview: string,
  release_date: string,
  poster_path: string,
  backdrop_path: string,
  genres: IGenre[],
  genre_ids: number[],
  vote_average: number,
  media_type: string,
}

export interface IActor {
  name: string,
  id: number,
  profile_path: string,
  character: string,
  order: number
}

export interface IAction {
  type: string,
  payload: string | number | IGenreMedia
}

export interface IQueryState {
  category: string,
  queryKey: any,
  queryFunction: QueryFunction<IMovie[] | IMovieResults, QueryKey>
}

export interface IMovieResults {
  results: IMovie[],
  total_pages: number
}