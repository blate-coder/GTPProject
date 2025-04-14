import { Card } from "@/components/ui/card";

interface MediaPlayerProps {
  url: string;
  type: "song" | "anime";
}

export default function MediaPlayer({ url, type }: MediaPlayerProps) {
  // Function to safely render the iframe HTML
  const createIframe = () => {
    return {
      __html: `<iframe 
        width="100%" 
        height="315" 
        src="${url}" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen>
      </iframe>`
    };
  };

  return (
    <Card className="overflow-hidden">
      <div 
        className="w-full aspect-video"
        dangerouslySetInnerHTML={createIframe()} 
      />
    </Card>
  );
}
