import { useState } from "react";
import { Customization } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/use-theme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, Coins, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CustomizationDetailProps {
  customization: Customization;
  unlockedCustomizations: string[];
  onBack: () => void;
}

export default function CustomizationDetail({ 
  customization, 
  unlockedCustomizations,
  onBack
}: CustomizationDetailProps) {
  const { user } = useAuth();
  const { setTheme } = useTheme();
  const queryClient = useQueryClient();
  const isUnlocked = unlockedCustomizations.includes(customization.name);
  
  const purchaseMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("POST", `/api/customizations/purchase/${id}`);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Purchase successful!",
        description: `You have unlocked the ${customization.displayName}!`,
      });
      
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["/api/user/customizations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Purchase failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  const applyMutation = useMutation({
    mutationFn: async ({ type, name }: { type: string; name: string }) => {
      const res = await apiRequest("POST", "/api/customizations/apply", { type, name });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Applied successfully!",
        description: `Your ${customization.type} has been updated.`,
      });
      
      // Apply theme if this is a theme customization
      if (customization.type === 'theme' && 
          ['default', 'sakura', 'night'].includes(customization.name)) {
        setTheme(customization.name as any);
      }
      
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to apply",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  const handlePurchase = () => {
    purchaseMutation.mutate(customization.id);
  };
  
  const handleApply = () => {
    applyMutation.mutate({ 
      type: customization.type, 
      name: customization.name 
    });
  };
  
  const canAfford = (user?.tokens || 0) >= (customization.tokenCost || 0);
  const isApplied = 
    (customization.type === 'avatar' && user?.profileImage === customization.name) ||
    (customization.type === 'badge' && user?.profileBadge === customization.name) ||
    (customization.type === 'theme' && user?.profileTheme === customization.name);
  
  // Default items don't need to be unlocked
  const isDefault = customization.name.startsWith('default') || 
                   customization.name === 'beginner' ||
                   customization.name === 'default';
  
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>{customization.displayName}</CardTitle>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center py-6">
          {customization.type === 'avatar' && (
            <Avatar className="h-40 w-40 mb-4">
              <AvatarImage src={`/assets/avatars/${customization.name}.svg`} />
              <AvatarFallback className="text-2xl">{customization.displayName[0]}</AvatarFallback>
            </Avatar>
          )}
          
          {customization.type === 'badge' && (
            <Badge className="text-lg px-6 py-3 mb-4" variant="secondary">
              {customization.displayName}
            </Badge>
          )}
          
          {customization.type === 'theme' && (
            <div className="h-40 w-40 rounded-full overflow-hidden mb-4">
              {customization.name === 'default' && (
                <div className="bg-primary h-full w-full"></div>
              )}
              {customization.name === 'sakura' && (
                <div className="bg-pink-300 h-full w-full"></div>
              )}
              {customization.name === 'night' && (
                <div className="bg-slate-800 h-full w-full"></div>
              )}
            </div>
          )}
          
          <p className="text-center text-muted-foreground mb-2">{customization.description}</p>
          
          {!isUnlocked && !isDefault && (
            <Badge variant="outline" className="flex items-center gap-1 text-lg my-2">
              <Coins className="h-4 w-4" /> {customization.tokenCost} tokens required
            </Badge>
          )}
          
          {isUnlocked || isDefault ? (
            <div className="flex items-center text-green-600 my-2">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Unlocked</span>
            </div>
          ) : (
            <div className="space-y-3 w-full max-w-sm">
              <h3 className="font-semibold mt-4">Requirements:</h3>
              <div className="space-y-2 rounded-md bg-muted p-3">
                {customization.requiredScore && customization.requiredScore > 0 && (
                  <div className="flex justify-between">
                    <span>Minimum quiz score:</span>
                    <span className={((user?.progress as any)?.highestScore || 0) >= customization.requiredScore 
                      ? "font-medium text-green-600 flex items-center" 
                      : "font-medium"}>
                      {customization.requiredScore}%
                      {((user?.progress as any)?.highestScore || 0) >= customization.requiredScore && 
                        <CheckCircle className="h-4 w-4 ml-2" />
                      }
                    </span>
                  </div>
                )}
                
                {Array.isArray(customization.requiredLessons) && customization.requiredLessons.length > 0 && (
                  <div>
                    <p>Complete lessons:</p>
                    <ul className="list-disc list-inside mt-1 pl-2">
                      {customization.requiredLessons.map(lessonId => {
                        const isCompleted = (user?.progress as any)?.completedLessons ? 
                          ((user.progress as any).completedLessons as number[]).includes(lessonId) : false;
                        return (
                          <li key={lessonId} className={`text-sm flex items-center ${isCompleted ? "text-green-600" : ""}`}>
                            <span>Lesson {lessonId}</span>
                            {isCompleted && <CheckCircle className="h-4 w-4 ml-2" />}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Token cost:</span>
                  <span className="font-medium">{customization.tokenCost} tokens</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Your balance:</span>
                  <span className={`font-medium ${canAfford ? 'text-green-600' : 'text-red-500'}`}>
                    {user?.tokens || 0} tokens
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button variant="outline" className="w-full" onClick={onBack}>
          Back
        </Button>
        
        {(isUnlocked || isDefault) && !isApplied && (
          <Button 
            className="w-full"
            onClick={handleApply}
            disabled={applyMutation.isPending}
          >
            {applyMutation.isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Applying...</>
            ) : 'Apply'}
          </Button>
        )}
        
        {!isUnlocked && !isDefault && (
          <Button 
            className="w-full"
            onClick={handlePurchase}
            disabled={purchaseMutation.isPending || !canAfford}
          >
            {purchaseMutation.isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Purchasing...</>
            ) : !canAfford ? 'Not Enough Tokens' : 'Purchase'}
          </Button>
        )}
        
        {isApplied && (
          <Button 
            className="w-full" 
            variant="secondary"
            disabled
          >
            <CheckCircle className="h-4 w-4 mr-2" /> Currently Applied
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}