import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import useGenres from "../hooks/useGenres";

function TvCategories() {
  const [toggledGenres, setToggledGenres] = React.useState(false);
  const { genres } = useGenres("tv");

  return (
    <Box borderLeft="2px" borderColor="evening" paddingLeft="0.5rem" mb="1">
      {/* Header */}
      <Box fontSize="xs" mb="1">
        TV SHOWS
      </Box>

      {/* Movie categories */}
      <Box>
        <Link href={`/tv/popular`}>Popular</Link>
      </Box>
      <Box>
        <Link href={`/tv/top`}>Top rated</Link>
      </Box>
      <Flex flexDirection="column">
        <Box
          as="button"
          color={toggledGenres ? "white" : "lightgray"}
          onClick={() => setToggledGenres(!toggledGenres)}
        >
          <Flex justifyContent="space-between">
            <Box>Genres</Box>
            <ChevronDownIcon
              transition="all 150ms"
              transform={toggledGenres ? "rotate(-180deg)" : ""}
              width="1.5rem"
              height="1.5rem"
            />
          </Flex>
        </Box>
        <Box display={toggledGenres ? "block" : "none"}>
          {Object.keys(genres).map((genre_id) => (
            <Box borderLeft="2px solid" borderColor="evening" key={genre_id}>
              <Link ml="2" href={`/tv/genre/${genre_id}`}>
                {genres[genre_id]}
              </Link>
            </Box>
          ))}
        </Box>
      </Flex>
      <Box>
        <Link href={`/tv/airing`}>Airing now</Link>
      </Box>
    </Box>
  );
}

export default TvCategories;
