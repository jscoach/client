import React from "react";

let initialized = process.env.REACT_APP_SHOW_ADS !== "true";

function Index() {
  React.useEffect(() => {
    if (window && !initialized) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, [])
  return (
    !initialized ?
      <ins className="adsbygoogle block"
           data-ad-format="fluid"
           data-ad-layout-key="-gd-c+21-64+89"
           data-ad-client="ca-pub-5020228531772566"
           data-ad-slot="1717784196"/> : null
  )
}

export default Index;
