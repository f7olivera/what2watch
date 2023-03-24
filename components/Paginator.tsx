import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import React from "react";

interface Props {
  url: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

function Paginator({ page, setPage, totalPages }: Props) {
  return (
    <Flex justifyContent="center" m={4} alignItems="center">
      <Flex>
        <Tooltip label="First Page">
          <IconButton
            _focus={{ border: "0" }}
            variant="unstyled"
            onClick={() => setPage(1)}
            isDisabled={page === 1}
            icon={<ArrowLeftIcon h={4} w={4} />}
            mr={4}
            aria-label="First Page"
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            _focus={{ border: "0" }}
            variant="unstyled"
            onClick={() => setPage(page - 1)}
            isDisabled={page === 1}
            icon={<ChevronLeftIcon h={7} w={7} />}
            aria-label="Previous Page"
          />
        </Tooltip>
      </Flex>

      <Flex alignItems="center">
        <Text flexShrink="0" mx={4}>
          Page{" "}
          <Text fontWeight="bold" as="span">
            {page}
          </Text>{" "}
          of{" "}
          <Text fontWeight="bold" as="span">
            {totalPages}
          </Text>
        </Text>
      </Flex>

      <Flex>
        <Tooltip label="Next Page">
          <IconButton
            _focus={{ border: "0" }}
            variant="unstyled"
            onClick={() => setPage(page + 1)}
            isDisabled={page === totalPages}
            icon={<ChevronRightIcon h={7} w={7} />}
            aria-label="Next Page"
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            _focus={{ border: "0" }}
            variant="unstyled"
            onClick={() => setPage(totalPages)}
            isDisabled={page === totalPages}
            icon={<ArrowRightIcon h={4} w={4} />}
            ml={4}
            aria-label="Last Page"
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
}

export default Paginator;
