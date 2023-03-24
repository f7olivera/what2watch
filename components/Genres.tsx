import { Badge, Flex } from "@chakra-ui/react";
import { IGenre } from "../utils/interfaces";

interface Props {
  genres: IGenre[];
}

function Genres({ genres }: Props) {
  return (
    <Flex flexWrap="wrap" gap="2">
      {genres &&
        genres.map((genre) => (
          <Badge
            key={genre.id}
            fontSize="inherit"
            colorScheme="blackAlpha"
            backgroundColor="accent"
            color="black"
            variant="solid"
            px="2"
          >
            {genre.name}
          </Badge>
        ))}
    </Flex>
  );
}

export default Genres;
