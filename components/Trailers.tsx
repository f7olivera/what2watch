import {
  AspectRatio,
  Box, Button,
  Flex, Heading,
  Modal, ModalBody,
  Image,
  ModalContent,
  ModalOverlay,
  Text, useDisclosure, useMediaQuery
} from "@chakra-ui/react";
import React, { PointerEvent } from "react";
import { useQuery } from "react-query";
import { fetchTrailers } from "../utils/queryFunctions";
import NextImage from "next/image";

interface Props {
  media: string,
  movie_id: string,
}

interface ITrailer {
  id: string,
  key: string
}

const Trailer = ({ trailer, key }: {trailer: ITrailer, key: string | number}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Box key={key} maxWidth='100vw'>
      <Button _focus={{ border: '0' }} position='relative' width='100%' height='100%' variant='unstyled'
              onClick={onOpen}>
        <NextImage
          width='480px'
          height='360px'
          src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`}/>
        <Image
          src='/images/play.png'
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%,-50%)"
          zIndex="2"
          alt="Play video"/>
      </Button>
      <Modal size={{ base: 'xl', md: '4xl', xl: '6xl' }} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay/>
        <ModalContent>
          <ModalBody backgroundColor='black' p='0'>
            <AspectRatio ratio={16 / 9}>
              <iframe
                key={trailer.id}
                src={`https://www.youtube.com/embed/${trailer.key}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

function Trailers({ media, movie_id }: Props) {
  const {
    data: trailers,
    isLoading
  } = useQuery<ITrailer[], unknown, ITrailer[]>(['trailers', media, movie_id], fetchTrailers);

  return (
    <>
      {!isLoading && trailers?.length ?
        <Flex flexDirection='column' zIndex='1' gap={4}>
          <Heading textAlign='center'>Trailers</Heading>
          <Flex flexDirection={{ base: 'column', md: 'row' }} gap={8} flexWrap='wrap' justifyContent='center'>
            {trailers.map((trailer) => (
              <Trailer key={trailer.key} trailer={trailer}/>
            ))}
          </Flex>
        </Flex> :
        ''}
    </>
  )
}

export default Trailers;
