import React from "react";
import Index from "../../components/Index";

function TvIndex() {
  React.useEffect(() => {
    document.title = 'TV Shows';
  }, []);

  return (
    <Index media='tv' id='popular'/>
  );
}

export default TvIndex;
