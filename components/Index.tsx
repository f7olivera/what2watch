import React from "react";
import {
  Flex,
  Box,
  Center,
  Heading,
  Select,
  Icon,
} from "@chakra-ui/react";
import Movies from "./Movies";
import { IGenre, IMovie, IMovieResults } from "../utils/interfaces";
import { useRouter } from "next/router";
import Image from "next/image";
import useGenres from "../hooks/useGenres";
import { GiFilmStrip } from "react-icons/gi";
import { TbDeviceTvOld } from "react-icons/tb";
import moviesReducer, { init, initialState } from "../utils/moviesReducer";
import Link from "next/link";
import { useQuery } from "react-query";
import Paginator from "./Paginator";

interface Props {
  media: string,
  id: string
}

function Index({ media = 'movie', id }: Props) {
  const { genres: movieGenres } = useGenres('movie');
  const { genres: tvGenres } = useGenres('tv');
  const genres = media === 'movie' ? movieGenres : tvGenres;
  const [genres2, setGenres] = React.useState([] as IGenre[]);
  const [moviesQuery, dispatch] =
    React.useReducer(moviesReducer, initialState, init);
  const router = useRouter()
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const {
    data, isLoading, isFetched
  } = useQuery<IMovie[] | IMovieResults, unknown, IMovieResults>([...moviesQuery.queryKey, page], moviesQuery.queryFunction);

  React.useEffect(() => {
    if (window.location.pathname === '/') return;
    document.title = `${media === 'movie' ? 'Movies' : 'TV Shows'} - ${/top|popular/i.test(moviesQuery.category) ? moviesQuery.category.split(' ')[0] : moviesQuery.category}`;
  }, [media, moviesQuery]);

  React.useEffect(() => {
    data?.total_pages && !totalPages ? setTotalPages(data?.total_pages > 500 ? 500 : data?.total_pages) : '';
  }, [data, totalPages]);

  React.useEffect(() => {
    if (!isNaN(Number(id))) {
      dispatch({
        type: 'genre',
        payload: {
          category: genres[id],
          media,
          id,
        }
      });
    } else {
      dispatch({ type: `${id}`, payload: media });
    }
  }, [id, genres, media]);

  React.useEffect(() => {
    if (isFetched && window.location.pathname.includes('genre')) {
      const movies = document.querySelector('#movies');
      movies ? movies.scrollIntoView({ behavior: "smooth" }) : '';
    }
  }, [isFetched]);

  // Gets all available genres
  React.useEffect(() => {
    const url = `/api/tmdb/${media}/genres`;
    (async () => {
      const response = await fetch(url);
      const jsonResponse = await response.json();
      setGenres(jsonResponse.genres);
    })();
  }, [media]);

  return (
    <>
      <Flex position='relative'
            width='100%'
            height='46rem'
            flexDirection='column'
            justify='center'
            alignItems='center'>
        <Image
          priority={false}
          layout="fill"
          src='/images/movies.png'
          objectFit="cover"
          alt='Movies collage background'/>
        <Center
          display='flex'
          flexDirection='column'
          gap='4rem'
          zIndex="2">
          <Box px='5%'>
            <Heading size='2xl' mb='0.75rem' zIndex="2" color='white'>Looking for something to watch?</Heading>
            <Select id='select-filter'
                    onChange={(e) => {
                      router.push(e.target.value);
                    }}
                    color='black'
                    backgroundColor='white'
                    placeholder='Filter by genre'>
              <option value={'/trending'}>Trending</option>
              <option value={`/${media}/popular`}>Popular</option>
              <option value={`/${media}/top`}>Top</option>
              {media === 'tv' ? <option value={`/tv/airing`}>Airing now</option> : ''}
              <optgroup label="Genres">
                {genres2.map((genre) => (
                  <option value={`/${media}/genre/${genre.id}`} key={genre.id}>{genre.name}</option>))}
              </optgroup>
            </Select>
          </Box>
          <Flex css={{
            '& button:not(.selected):not(:hover)': {
              transitionProperty: 'var(--chakra-transition-property-common)',
              transitionDuration: 'var(--chakra-transition-duration-fast)',
              transitionTimingFunction: 'var(--chakra-transition-easing-ease-out)'
            },
            '.selected': {
              opacity: '1',
            },
            'button:not(.selected)': {
              opacity: '0.5',
            },
            'button:not(.selected):hover': {
              opacity: '0.7',
            },
          }} width='100%' justifyContent='space-evenly'>
            <Link href='/movie'>
              <a>
                <Box as='button'
                     className={media === 'movie' ? 'selected' : ''}>
                  <Flex flexDirection='column' textAlign='center'>
                    <Icon width='5.5rem' height='5.5rem' as={GiFilmStrip}/>
                    <Box>MOVIES</Box>
                  </Flex>
                </Box>
              </a>
            </Link>
            <Link href='/tv'>
              <a>
                <Box as='button' className={media === 'tv' ? 'selected' : ''}>
                  <Flex flexDirection='column' textAlign='center'>
                    <Icon width='5.5rem' height='5.5rem' as={TbDeviceTvOld}/>
                    <Box>TV SHOWS</Box>
                  </Flex>
                </Box>
              </a>
            </Link>
          </Flex>
        </Center>
        <Box
          className='gradient'
          width='100%'
          height='100%'
          position='absolute'/>
      </Flex>
      <Movies list={data?.results || []} category={moviesQuery.category} isLoading={isLoading} media={media}/>
      <Paginator url={typeof window !== 'undefined' ? window.location.pathname : '/'} page={page} setPage={setPage}
                 totalPages={totalPages || 1}/>
    </>
  );
}

export default Index;
