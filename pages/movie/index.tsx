import React from "react";
import Index from "../../components/Index";

function MovieIndex() {
  React.useEffect(() => {
    document.title = "Movies";
  }, []);

  return <Index media="movie" id={"popular"} />;
}

export default MovieIndex;
