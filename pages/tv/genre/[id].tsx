import { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import Index from "../../../components/Index";
import useGenres from "../../../hooks/useGenres";

const TvGenre: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { genres } = useGenres("tv");

  return typeof id === "string" && genres[id] ? (
    <Index media="tv" id={id} />
  ) : (
    <Error statusCode={404} />
  );
};

export default TvGenre;
