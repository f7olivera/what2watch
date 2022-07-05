import { Flex, Image, Text } from "@chakra-ui/react";
import React, { PointerEvent } from "react";
import { IActor } from "../utils/interfaces";
import { useQuery } from "react-query";
import { fetchCast } from "../utils/queryFunctions";


interface Props {
  media: string,
  movie_id: string,
}

function Cast({ media, movie_id }: Props) {
  const {
    data: cast
  } = useQuery<IActor[], unknown, IActor[]>(['cast', media, movie_id], fetchCast);

  const scrollCast = (event: PointerEvent<HTMLDivElement>) => {
    const castContainer: HTMLDivElement | null = document.querySelector('#cast-container');
    if (castContainer) {
      const x = event.pageX + castContainer.scrollLeft;

      document.onpointermove = (e) => {
        castContainer.scroll(-(e.pageX - x), 0);
      }
      castContainer.onpointerup = () => document.onpointermove = null;
      castContainer.onpointercancel = (e) => {
        e.preventDefault()
      }
    }
    document.onpointerup = () => document.onpointermove = null;
    event.preventDefault();
  }

  return (
    <Flex className='unselectable' cursor='pointer' onPointerDown={scrollCast} zIndex={2} flexWrap='nowrap'
          overflowX='scroll'
          id='cast-container'>
      {cast && cast.slice(0, Math.min(cast.length, 10)).map((actor) => (
        <Flex margin='0.5rem' zIndex={1} key={actor.id} flexDirection='column' minWidth='8rem'>
          <Image
            className='undraggable'
            borderRadius='md'
            borderBottomRadius='unset'
            width="100%"
            objectFit={"contain"}
            maxWidth={"8rem"}
            src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/images/person.png'}
            fallbackSrc='/images/person.png'
            alt={actor.name}/>
          <Text
            textAlign='center'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            backgroundColor='accent'
            color='black'
            fontWeight='10px' height='100%' borderBottomRadius='md'
            padding='0 0.3rem 0 0.3rem'>
            {actor.name}
          </Text>
        </Flex>
      ))}
    </Flex>
  )
}

export default Cast;
