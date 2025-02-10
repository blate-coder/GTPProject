import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface MediaPlayerProps {
  url: string;
  type: "song" | "anime";
}

export default function MediaPlayer({ url, type }: MediaPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [url]);

  return (
    <Card className="overflow-hidden">
      <video
        ref={videoRef}
        controls
        className="w-full"
        poster={type === "anime" ? "https://images.unsplash.com/photo-1475275166152-f1e8005f9854" : "https://images.unsplash.com/photo-1470225620780-dba8ba36b745"}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Card>
  );
}
