import { StarIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import useGenres from "../hooks/useGenres";
import { IMovie } from "../utils/interfaces";
import LoadingMovie from "./LoadingMovie";

interface Props {
  list: IMovie[];
  category: string | number;
  isLoading: boolean;
  media: string;
}

function Movies({ list, category, isLoading, media }: Props) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { genres: movieGenres } = useGenres("movie");
  const { genres: tvGenres } = useGenres("tv");
  const genres = media === "movie" ? movieGenres : tvGenres;

  return (
    <Flex
      color="lightgray"
      id="movies"
      flexDirection="column"
      alignItems="center"
    >
      <Heading mt="4rem" pb="1.5rem">
        {!isNaN(Number(category)) ? genres[category] : category}
      </Heading>
      <Flex gap="1rem" className="movie-list" maxWidth="70rem">
        {!isLoading
          ? list.map(
              (movie, i) =>
                (category !== "Trending" ||
                  ["movie", "tv"].includes(movie.media_type)) && (
                  <div className="movie-container" key={movie.id}>
                    <Tooltip
                      placement="auto-start"
                      hasArrow
                      label={
                        <Flex maxWidth="95vw" flexDirection="column">
                          {movie.overview ? (
                            <>
                              <Text fontWeight="bold">Overview:</Text>
                              <Text>{movie.overview}</Text>
                            </>
                          ) : (
                            ""
                          )}
                          <Flex flexWrap="wrap" gap="2">
                            {movie &&
                              movieGenres &&
                              tvGenres &&
                              movie.genre_ids.map((genre_id) => (
                                <Badge
                                  key={genre_id}
                                  fontSize="xs"
                                  colorScheme="blackAlpha"
                                  backgroundColor="accent"
                                  color="black"
                                  variant="solid"
                                  px="2"
                                >
                                  {movieGenres[genre_id] || tvGenres[genre_id]}
                                </Badge>
                              ))}
                          </Flex>
                          {movie.release_date && (
                            <Text>
                              <Text fontWeight="bold" as="span">
                                Year:{" "}
                              </Text>
                              {movie.release_date.slice(0, 4)}
                            </Text>
                          )}
                          <Text display="flex" alignItems="center">
                            <StarIcon
                              margin="0 0.3rem 0 0"
                              width="0.7rem"
                              color="yellow"
                            />
                            {Math.round(movie.vote_average * 10) / 10}
                          </Text>
                        </Flex>
                      }
                    >
                      <Flex
                        direction="column"
                        justify="start"
                        mx="2"
                        position="relative"
                        className="movie-card"
                      >
                        <Link
                          href={`/${media || movie.media_type}/${movie.id}`}
                        >
                          <a style={{ height: "100%" }}>
                            <Flex
                              flexDirection="column"
                              justifyContent="start"
                              height="100%"
                            >
                              <Skeleton
                                mb="1"
                                borderRadius="md"
                                isLoaded={!isLoading}
                              >
                                <Box
                                  position="absolute"
                                  borderRadius="md"
                                  backgroundColor="white"
                                  width={isMobile ? "170px" : "250px"}
                                  height={isMobile ? "255px" : "375px"}
                                  id={`image-${i}`}
                                >
                                  <LoadingMovie />
                                </Box>
                                <Image
                                  onLoad={() => {
                                    const image = document.querySelector(
                                      `#image-${i}`
                                    ) as HTMLSpanElement;
                                    image.style.display = "none";
                                  }}
                                  src={
                                    movie.poster_path
                                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                      : "/images/movie.png"
                                  } // Route of the image file
                                  width={isMobile ? "170px" : "250px"}
                                  height={isMobile ? "255px" : "375px"}
                                  alt={movie.title}
                                />
                              </Skeleton>
                              <Skeleton
                                isLoaded={!isLoading}
                                width={isMobile ? "170px" : "250px"}
                                mb="1"
                              >
                                <Text w="100%" mb="1" textAlign="center">
                                  {movie.title || movie.name}
                                </Text>
                              </Skeleton>
                            </Flex>
                          </a>
                        </Link>
                      </Flex>
                    </Tooltip>
                  </div>
                )
            )
          : Array(20)
              .fill(0)
              .map((_, i) => (
                <div className="movie-container" key={i}>
                  <Flex
                    direction="column"
                    justify="start"
                    mx="2"
                    position="relative"
                    className="movie-card"
                  >
                    <Flex
                      flexDirection="column"
                      justifyContent="start"
                      cursor="pointer"
                      width={isMobile ? "170px" : "250px"}
                      height={isMobile ? "255px" : "375px"}
                    >
                      <Box
                        position="absolute"
                        borderRadius="md"
                        backgroundColor="white"
                        width={isMobile ? "170px" : "250px"}
                        height={isMobile ? "255px" : "375px"}
                      >
                        <LoadingMovie />
                      </Box>
                    </Flex>
                  </Flex>
                </div>
              ))}
      </Flex>
    </Flex>
  );
}

export default Movies;
