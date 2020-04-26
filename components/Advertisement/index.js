import React from "react";

function Index() {

  React.useEffect(() => {
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, [])
  return (
    <ins className="adsbygoogle block"
         data-ad-client="ca-pub-5020228531772566"
         data-ad-slot="4653679541"
         data-ad-format="auto"
         data-full-width-responsive="true"/>
  );
}

export default Index;
