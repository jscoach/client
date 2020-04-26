import React from "react";

let initialized = process.env.REACT_APP_SHOW_ADS !== "true";

function Index() {
  React.useEffect(() => {
    if (window && !initialized) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, [])
  return (
    !initialized ?
      <ins className="adsbygoogle block"
           data-ad-client="ca-pub-5020228531772566"
           data-ad-slot="4653679541"
           data-ad-format="auto"
           data-full-width-responsive="true"/> : null
  )
}

export default Index;
