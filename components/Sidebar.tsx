import { Box, Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import MovieCategories from "./MovieCategories";
import Search from "./Search";
import TvCategories from "./TvCategories";

function Sidebar() {
  const { data: session } = useSession();

  return (
    <Flex
      color="lightgray"
      height="100%"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Flex flexDirection="column" gap="4">
        <Search alwaysVisible={true} />
        <MovieCategories />
        <TvCategories />

        {/* Trending */}
        <Box>
          <Link href={`/trending`}>Trending</Link>
        </Box>

        {/* Watchlist */}
        {/*<Box display={session ? 'block' : 'none'} mb='4'>*/}
        {/*  <Link href={`/watchlist`}>*/}
        {/*    Watchlist*/}
        {/*  </Link>*/}
        {/*</Box>*/}
      </Flex>

      {/*<Authentication/>*/}
    </Flex>
  );
}

export default Sidebar;
