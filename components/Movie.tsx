import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

interface Props {
  id: string | string[]
}

function Movie({ id }: Props) {

  return (
    <Flex flexDirection='column' alignItems='center'>
      <Heading>movie with id {id}</Heading>
    </Flex>
  );
}

export default Movie;
