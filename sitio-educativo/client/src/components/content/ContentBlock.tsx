import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Video, CheckSquare } from "lucide-react";

interface ContentBlockProps {
  content: {
    id: string;
    title: string;
    type: string;
    description: string;
    items: ContentItem[];
  };
}

interface ContentItem {
  id: string;
  title: string;
  type: "video" | "article" | "quiz";
  duration: string;
  completed?: boolean;
}

const ContentBlock = ({ content }: ContentBlockProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setExpandedItems((prev) => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 text-primary" />;
      case "quiz":
        return <CheckSquare className="h-4 w-4 text-primary" />;
      case "article":
      default:
        return <FileText className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{content.description}</p>
      </CardHeader>
      <CardContent>
        <Accordion
          type="multiple"
          defaultValue={[]}
          className="w-full"
          value={expandedItems}
        >
          {content.items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger 
                onClick={() => toggleItem(item.id)}
                className="hover:no-underline"
              >
                <div className="flex items-start text-left">
                  <div className="mr-3 mt-0.5">{getItemIcon(item.type)}</div>
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <span className="capitalize">{item.type}</span>
                      <span className="mx-2">•</span>
                      <span>{item.duration}</span>
                      {item.completed && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-green-600 dark:text-green-400">Completed</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-8 pr-2 pt-2 pb-1">
                  <p className="text-sm text-muted-foreground">
                    {item.type === "video" && (
                      "Watch this video to learn about this topic in a visual format."
                    )}
                    {item.type === "article" && (
                      "Read this article to get a comprehensive overview of the subject."
                    )}
                    {item.type === "quiz" && (
                      "Test your knowledge with this short quiz on the material covered."
                    )}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ContentBlock;
