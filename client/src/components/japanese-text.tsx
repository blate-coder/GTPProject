import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface JapaneseTextProps {
  content: {
    lyrics?: string;
    translation?: string;
    vocabulary?: Array<{
      word: string;
      reading: string;
      meaning: string;
      example?: string;
    }>;
  };
}

export default function JapaneseText({ content }: JapaneseTextProps) {
  const [isBlurred, setIsBlurred] = useState(true);

  const handleTranslationClick = () => {
    setIsBlurred(!isBlurred);
  };

  return (
    <Card className="p-6">
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="text" className="flex-1">
            Text & Translation
          </TabsTrigger>
          <TabsTrigger value="vocabulary" className="flex-1">
            Vocabulary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-6">
          {content.lyrics && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Japanese Text</h3>
              <div className="text-lg leading-relaxed whitespace-pre-line">
                {content.lyrics}
              </div>
            </div>
          )}

          {content.translation && (
            <div
              className="space-y-2 border-t pt-4"
              onClick={handleTranslationClick}
            >
              <h3 className="text-lg font-semibold">Translation</h3>
              <p
                className={`text-muted-foreground whitespace-pre-line transition duration-500 ${isBlurred ? "blurred" : ""}`}
              >
                {content.translation}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="vocabulary" className="space-y-4">
          {content.vocabulary?.map((item, index) => (
            <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-lg font-medium">{item.word}</span>
                <span className="text-sm text-muted-foreground">
                  ({item.reading})
                </span>
              </div>
              <p className="text-muted-foreground mb-2">{item.meaning}</p>
              {item.example && (
                <p className="text-sm text-muted-foreground italic">
                  Example: {item.example}
                </p>
              )}
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <style jsx>{`
        .blurred {
          filter: blur(5px);
          cursor: pointer; /* Add a hover hint for better UX */
        }
      `}</style>
    </Card>
  );
}
