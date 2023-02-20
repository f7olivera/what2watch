import React from "react";
import Index from "../../components/Index";

function MovieIndex() {
  React.useEffect(() => {
    document.title = 'Top movies';
  }, []);

  return (
    <Index media='movie' id={'top'}/>
  );
}

export default MovieIndex;
