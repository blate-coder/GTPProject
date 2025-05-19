import { useQuery, useMutation } from "@tanstack/react-query";
import { Customization } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useCustomizations() {
  const { toast } = useToast();

  // Get all available customizations
  const {
    data: customizations = [],
    isLoading: isLoadingCustomizations,
    error: customizationsError
  } = useQuery<Customization[]>({
    queryKey: ['/api/customizations'],
  });

  // Get user's unlocked customizations
  const {
    data: userCustomizations = [],
    isLoading: isLoadingUserCustomizations
  } = useQuery<Customization[]>({
    queryKey: ['/api/user/customizations'],
    retry: false,
  });

  // Purchase a customization
  const purchaseMutation = useMutation({
    mutationFn: async (customizationId: number) => {
      const res = await apiRequest("POST", `/api/customizations/purchase/${customizationId}`);
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate user customizations and user profile
      queryClient.invalidateQueries({ queryKey: ['/api/user/customizations'] });
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
      
      toast({
        title: "Customization Purchased!",
        description: "You've successfully purchased a new customization.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Purchase Failed",
        description: error.message || "Failed to purchase customization. Check if you meet all requirements.",
        variant: "destructive",
      });
    }
  });

  // Apply a customization
  const applyMutation = useMutation({
    mutationFn: async ({ type, name }: { type: string, name: string }) => {
      const res = await apiRequest("POST", "/api/customizations/apply", { type, name });
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate user profile
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
      
      toast({
        title: "Customization Applied!",
        description: "Your profile has been updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Apply",
        description: error.message || "Failed to apply customization.",
        variant: "destructive",
      });
    }
  });

  // Add tokens to user (for development/testing)
  const addTokensMutation = useMutation({
    mutationFn: async ({ amount, reason, userId }: { amount: number, reason: string, userId?: number }) => {
      // Include the userId parameter for guest users
      const res = await apiRequest("POST", "/api/tokens", { amount, reason, userId });
      return await res.json();
    },
    onSuccess: (data) => {
      // Invalidate user profile
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
      
      // Also store tokens in localStorage for persistence
      try {
        const currentTokens = localStorage.getItem('userTokens') || '0';
        const tokens = parseInt(currentTokens, 10);
        localStorage.setItem('userTokens', data.newBalance.toString());
      } catch (e) {
        console.error('Failed to update local tokens', e);
      }
      
      toast({
        title: "Tokens Updated",
        description: `New balance: ${data.newBalance} tokens`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Token Update Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Get customizations by type (avatar, badge, theme)
  const getCustomizationsByType = (type: string) => {
    return customizations.filter(c => c.type === type);
  };

  // Check if a customization is unlocked
  const isCustomizationUnlocked = (customizationName: string) => {
    return userCustomizations.some(c => c.name === customizationName);
  };

  // Get customization by name
  const getCustomizationByName = (name: string) => {
    return customizations.find(c => c.name === name);
  };

  return {
    customizations,
    userCustomizations,
    isLoadingCustomizations,
    isLoadingUserCustomizations,
    customizationsError,
    purchaseMutation,
    applyMutation,
    addTokensMutation,
    getCustomizationsByType,
    isCustomizationUnlocked,
    getCustomizationByName
  };
}

// Get leaderboard data
export function useLeaderboard(limit = 10) {
  return useQuery<Array<{
    userId: number;
    username: string;
    totalScore: number;
    quizzesTaken: number;
  }>>({
    queryKey: ['/api/leaderboard', limit],
    queryFn: async () => {
      const res = await fetch(`/api/leaderboard?limit=${limit}`);
      if (!res.ok) throw new Error('Failed to fetch leaderboard');
      return res.json();
    }
  });
}