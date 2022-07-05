import { useRouter } from "next/router";
import Index from "../../../components/Index";
import { NextPage } from "next";
import Error from 'next/error'
import useGenres from "../../../hooks/useGenres";

const Movie: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { genres } = useGenres('movie');

  return (
    typeof id === 'string' && genres[id] ?
      <Index media='movie' id={id}/> :
      <Error statusCode={404}/>
  );
}

export default Movie;
