import { IMovie } from "./interfaces";
import { QueryFunctionContext, QueryKey } from "react-query";

const BASE_URL = '/api/tmdb'

async function fetchResource(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return await response.json();
}

export const fetchMovie = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const [media, id, page] = queryKey;
  if (id === undefined) {
    throw new Error('id undefined')
  }
  const url = `${BASE_URL}/${media}/${id}?page=${page}`;
  return await fetchResource(url);
}

export const fetchCast = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const [_, media, movie_id] = queryKey;
  if (movie_id === undefined) {
    throw new Error('id undefined')
  }
  const url = `${BASE_URL}/${media}/${movie_id}/credits`;
  const response = await fetchResource(url);
  return response.cast;
}

export const fetchDiscover = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const [category, id, page] = queryKey;
  const url = `${BASE_URL}/${['movie', 'tv'].includes(`${category}`) ? category : 'movie'}/discover${id ? `/${id}` : ''}?page=${page}`;
  const response = await fetchResource(url);
  return await response;
}

export const fetchSimilar = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const [_, media, id, page] = queryKey;
  const url = `${BASE_URL}/${media}/${id}/similar?page=${page}`;
  if (id === undefined) {
    throw new Error('id undefined')
  }
  const response = await fetchResource(url);
  return await response;
}

export const fetchTop = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const [_, type, page] = queryKey;
  if (type === undefined) {
    throw new Error('category undefined')
  }
  const url = `${BASE_URL}/${type}/top?page=${page}`;
  const response = await fetchResource(url);
  return await response;
}

export const fetchTrending = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const [_, page] = queryKey;
  const url = `${BASE_URL}/trending?page=${page}`;
  const response = await fetchResource(url);
  return await response;
}

export const fetchSearch = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const [_, q, page] = queryKey;
  if (q === undefined) {
    throw new Error('query undefined')
  }
  const url = `${BASE_URL}/search/${q}?page=${page}`;
  const response = await fetchResource(url);
  const rawJson = await response;
  const results: IMovie[] = rawJson.results.filter((elem: IMovie) => elem.media_type === 'movie' || elem.media_type === 'tv');
  return { ...rawJson, results };
}

export const fetchAiring = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const [_, page] = queryKey;
  const url = `${BASE_URL}/tv/airing?page=${page}`;
  const response = await fetchResource(url);
  return await response;
}

export const fetchTrailers = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const [_, media, id] = queryKey;
  if (id === undefined) {
    throw new Error('id undefined')
  }
  const url = `${BASE_URL}/${media}/${id}/videos`;
  const response = await fetchResource(url);
  return await response.results.filter((video: {type: string, site: string}) => video.type === 'Trailer' && video.site === 'YouTube');
}

export const fetchCertification = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const [_, media, id] = queryKey;
  if (id === undefined) {
    throw new Error('id undefined')
  }
  const url = `${BASE_URL}/${media}/${id}/certifications`;
  const response = await fetchResource(url);
  const certifications = await
    response.results.filter((elem: {iso_3166_1: string, release_dates: {certification: string}[]}) => elem.iso_3166_1 === 'US');
  return certifications?.length && certifications[0].release_dates.length ? certifications[0].release_dates[0].certification : null;
}
