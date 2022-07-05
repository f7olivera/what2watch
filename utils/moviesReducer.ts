import { IAction, IQueryState } from "./interfaces";
import { fetchAiring, fetchDiscover, fetchSimilar, fetchTop, fetchTrending } from "./queryFunctions";

export const initialState: IQueryState = { category: 'Popular', queryKey: ['popular'], queryFunction: fetchDiscover };

export function init() {
  return initialState;
}

function moviesReducer(state: IQueryState, action: IAction): IQueryState {
  const { type, payload } = action;
  switch (type) {
    case 'trending':
      return { category: 'Trending', queryKey: ['trending'], queryFunction: fetchTrending };
    case 'top':
      return { category: `Top ${payload === 'movie' ? 'Movies' : 'TV Shows'}`, queryKey: ['top', payload], queryFunction: fetchTop };
    case 'airing':
      return { category: 'Airing now', queryKey: ['airing'], queryFunction: fetchAiring };
    case 'similar':
      if (typeof payload !== 'object') return {...state};
      return { category: 'Similar', queryKey: ['similar', payload.media, payload.id, payload.page], queryFunction: fetchSimilar };
    case 'genre':
      if (typeof payload !== 'object') return {...state};
      return { category: `${payload.category}`, queryKey: [payload.media, payload.id], queryFunction: fetchDiscover };
    default:
      return { category: `Popular ${payload === 'movie' ? 'Movies' : 'TV Shows'}`, queryKey: [payload, undefined], queryFunction: fetchDiscover };
  }
}

export default moviesReducer;
