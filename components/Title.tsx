import { Box, Flex, Heading, Badge, Skeleton, Image, Text, useMediaQuery, Spinner } from "@chakra-ui/react";
import Link from 'next/link';
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from 'react-query'
import { IMovie, IMovieResults } from "../utils/interfaces";
import { fetchCertification, fetchMovie } from "../utils/queryFunctions";
import moviesReducer, { init, initialState } from "../utils/moviesReducer";
import Cast from "./Cast";
import Movies from "./Movies";
import Paginator from "./Paginator";
import Trailer from "./Trailers";
import Trailers from "./Trailers";
// @ts-ignore
import humanizeDuration from 'humanize-duration';

interface Props {
  media: string
}

function Title({ media }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [moviesQuery, dispatch] = React.useReducer(moviesReducer, initialState, init);
  const similar = useQuery<IMovie[] | IMovieResults, unknown, IMovieResults>(moviesQuery.queryKey, moviesQuery.queryFunction);
  const [totalPages, setTotalPages] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const {
    data: movie,
    isLoading
  } = useQuery<IMovie>([media, id], fetchMovie);
  const {
    data: certification,
  } = useQuery<string>(['certification', media, id], fetchCertification);

  React.useEffect(() => {
    if (!movie) return;
    document.title = movie.name || movie.title || document.title;
  }, [movie]);

  React.useEffect(() => {
    typeof id === 'string' && dispatch({
      type: 'similar',
      payload: { category: 'Similar', media, id, page: Number(page) }
    });
  }, [media, id, page]);

  React.useEffect(() => {
    similar.data?.total_pages && !totalPages ? setTotalPages(similar.data?.total_pages > 500 ? 500 : similar.data?.total_pages) : '';
  }, [similar, totalPages]);

  const asd = humanizeDuration.humanizer({
    language: "shortEn",
    delimiter: ' ',
    spacer: '',
    languages: {
      shortEn: {
        y: () => "y",
        mo: () => "mo",
        w: () => "w",
        d: () => "d",
        h: () => "h",
        m: () => "m",
        s: () => "s",
        ms: () => "ms",
      },
    },
  });

  return isLoading || !movie ? (
      <Flex flexDirection='column' alignItems='center' justify='center' height='90vh'>
        <Spinner width='7.5rem'/>
      </Flex>
    ) :
    (
      <>
        <Box
          position='relative' minHeight='100vh'
          backgroundImage={`url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`} backgroundSize='cover'
          backgroundPosition='center top'>
          <Flex flexDirection='column' gap={10}>
            <Flex className='main-wrapper' width='100%' height='100%' alignContent='center' alignItems='center'
                  justify='center' flexWrap='wrap'>
              <Flex
                zIndex='1' flexDirection='column' minWidth='min(30rem, 95vw)' maxWidth='30rem'
                padding='2rem 2% 0rem 2%' alignSelf='start'>
                <Skeleton position='relative' display='flex' justifyContent='center' isLoaded={!isLoading}>
                  {movie.poster_path ?
                    <Image
                      maxWidth='min(30rem, 95vw)'
                      objectFit={"contain"}
                      borderRadius="md"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}/>
                    : <></>}
                </Skeleton>
              </Flex>
              <Flex
                zIndex='1' flexDirection='column' minWidth='min(95vw, 30rem)' padding='2rem 2% 0 2%'
                alignSelf='start' maxWidth='40rem'>
                <Skeleton isLoaded={!isLoading}>
                  <Heading fontSize='2.5rem'>{movie.title || movie.name}</Heading>
                  <Text>{movie.tagline}</Text>
                  <Box fontSize='md' py='2'>
                    <Flex flexWrap='wrap' gap='2'>
                      {movie.genres && movie.genres.map((genre) => (
                        <Link href={`/${media}/genre/${genre.id}`} key={genre.id}>
                          <a>
                            <Badge
                              key={genre.id}
                              fontSize='inherit'
                              colorScheme='blackAlpha' backgroundColor='accent' color="black"
                              variant="solid"
                              px="2">
                              {genre.name}
                            </Badge>
                          </a>
                        </Link>
                      ))}
                    </Flex>
                  </Box>
                  {movie.release_date &&
                    <Text>
                      {/*<Text>*/}
                      {/*  /!*<Text fontWeight='bold' as='span'>Year: </Text>{movie.release_date.slice(0, 4)}*!/*/}
                      {/*</Text>*/}
                      {certification ?
                        <>
                          <Badge fontSize='0.9rem' variant='outline' color='white'>{certification ? certification : ''}</Badge>
                          {'\u00A0'}{"- "}
                        </> : ''}
                      {movie.release_date.slice(0, 4)}
                      {movie.runtime ?
                        <>
                          {'\u00A0'}{"- "}
                          {asd(movie.runtime ? movie.runtime * 60000 : '')}
                        </> : ''}
                    </Text>
                  }
                  {movie.overview ? (
                    <>
                      <Text fontWeight='bold'>Overview:</Text>
                      <Text>{movie.overview}</Text>
                    </>
                  ) : ''}
                  <Cast media={media} movie_id={typeof id === 'string' ? id : ''}/>
                </Skeleton>
              </Flex>
            </Flex>
            <Trailers media={media} movie_id={typeof id === 'string' ? id : ''}/>
          </Flex>
          <Box
            className='gradient'
            top='0'
            left='0'
            width='100%'
            height='100%'
            position='absolute'/>
        </Box>
        <Movies list={similar.data?.results || []} category={moviesQuery.category} isLoading={similar.isLoading}
                media={media}/>
        <Paginator url={typeof window !== 'undefined' ? window.location.pathname : '/'} page={page} setPage={setPage}
                   totalPages={totalPages}/>
      </>
    );
}

export default Title;
