"use client";

import { useEffect, useState } from "react";
import PageDetails from "./pageDetails";
import PageContent from "./pageContent";

export default function Page() {
  const [currentView, setCurrentView] = useState("details");

  useEffect(() => {
    const storedView = localStorage.getItem("currentView");
    if (storedView) {
      setCurrentView(storedView);
    }
  }, []);

  const views: Record<string, React.ReactNode> = {
    details: <PageDetails changeView={changeView} />,
    content: <PageContent changeView={changeView} />,
  };

  function changeView() {
    setCurrentView((prev) => (prev === "details" ? "content" : "details"));
    localStorage.setItem("currentView", currentView);
  }

  return (
    <div className="flex flex-col gap-4 items-center px-4 py-12 w-full min-h-full">
      {views[currentView]}
    </div>
  );
}
