"use client";
import { useEffect } from "react";

interface GoogleAdProps {
  adSlot: string;
  width?: string;
  height?: string;
}

export default function GoogleAd({
  adSlot,
  width = "300px",
  height = "250px",
}: GoogleAdProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdsbyGoogle push error:", e);
    }
  }, []);

  return (
    <div className={`flex justify-center items-center w-${width} h-${height}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width, height }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // replace with your pub ID
        data-ad-slot={adSlot}
      />
    </div>
  );
}
