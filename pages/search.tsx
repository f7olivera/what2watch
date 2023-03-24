import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import Movies from "../components/Movies";
import Paginator from "../components/Paginator";
import { IMovie, IMovieResults } from "../utils/interfaces";
import { fetchSearch } from "../utils/queryFunctions";

function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [totalPages, setTotalPages] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useQuery<
    IMovie[] | IMovieResults,
    unknown,
    IMovieResults
  >(["search", q, page], fetchSearch);

  React.useEffect(() => {
    document.title = "Search" + (q ? ` "${q}"` : "");
  }, [q]);

  React.useEffect(() => {
    data?.total_pages && !totalPages
      ? setTotalPages(data?.total_pages > 500 ? 500 : data?.total_pages)
      : "";
  }, [data, totalPages]);

  return isLoading || !data ? (
    <Flex
      flexDirection="column"
      alignItems="center"
      justify="center"
      height="90vh"
    >
      <Spinner width="7.5rem" />
    </Flex>
  ) : data.results && data.results.length > 0 ? (
    <div className="main-wrapper">
      <Movies
        list={data.results || []}
        isLoading={false}
        category={`Results for "${q}"`}
        media=""
      />
      <Paginator
        url={typeof window !== "undefined" ? window.location.pathname : "/"}
        page={page}
        setPage={setPage}
        totalPages={totalPages || 1}
      />
    </div>
  ) : (
    <Flex
      className="main-wrapper"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="83vh"
    >
      <Heading>No results for &quot;{q}&quot;</Heading>
    </Flex>
  );
}

export default Search;
