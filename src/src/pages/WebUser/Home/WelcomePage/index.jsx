import React from "react";

import Home from "pages/LandingPage/components/Home";

export default function WelcomePage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Home isChatpage />
    </div>
  );
}
