import React from "react";
import Index from "../../components/Index";

function TvIndex() {
  React.useEffect(() => {
    document.title = 'Top TV Shows';
  }, []);

  return (
    <Index media='tv' id='top'/>
  );
}

export default TvIndex;
