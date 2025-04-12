"use client";

import { useState } from "react";
import PageDetails from "./pageDetails";
import PageContent from "./pageContent";

export default function Page() {
  const [currentView, setCurrentView] = useState("details");

  const views: Record<string, React.ReactNode> = {
    details: <PageDetails changeView={changeView} />,
    content: <PageContent changeView={changeView} />,
  };

  function changeView() {
    setCurrentView((prev) => (prev === "details" ? "content" : "details"));
  }

  return (
    <div className="flex flex-col gap-4 items-center px-4 py-12 w-full min-h-full">
      {views[currentView]}
    </div>
  );
}
