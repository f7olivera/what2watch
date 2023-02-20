import React from "react";
import Index from "../../components/Index";

function MovieIndex() {
  React.useEffect(() => {
    document.title = 'Popular movies';
  }, []);

  return (
    <Index media='movie' id={'popular'}/>
  );
}

export default MovieIndex;
