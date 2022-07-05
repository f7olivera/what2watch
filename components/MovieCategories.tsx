import { Box, Flex } from "@chakra-ui/react";
import Link from 'next/link';
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import useGenres from "../hooks/useGenres";


function MovieCategories() {
  const [toggledGenres, setToggledGenres] = React.useState(false);
  const { genres } = useGenres('movie');

  return (
    <Box borderLeft='2px' borderColor='evening' paddingLeft='0.5rem'>
      {/* Header */}
      <Box fontSize='xs' mb='1'>MOVIES</Box>

      {/* Movie categories */}
      <Box>
        <Link href={`/movie/popular`}>
          Popular
        </Link>
      </Box>
      <Box>
        <Link href={`/movie/top`}>
          Top rated
        </Link>
      </Box>
      <Flex flexDirection='column'>
        <Box as='button' color={toggledGenres ? 'white' : 'lightgray'}
             onClick={() => setToggledGenres(!toggledGenres)}>
          <Flex justifyContent='space-between'>
            <Box>Genres</Box>
            <ChevronDownIcon
              transition='all 150ms'
              transform={toggledGenres ? 'rotate(-180deg)' : ''}
              width='1.5rem'
              height='1.5rem'/>
          </Flex>
        </Box>
        <Box borderLeft='2px solid' borderColor='evening' display={toggledGenres ? 'block' : 'none'}>
          {Object.keys(genres).map((genre_id) => (
            <Box key={genre_id} ml='2'>
              <Link  href={`/movie/genre/${genre_id}`}>
                {genres[genre_id]}
              </Link>
            </Box>
          ))}
        </Box>
      </Flex>
    </Box>
  );
}

export default MovieCategories;
