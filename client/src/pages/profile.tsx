import { useAuth } from "@/hooks/use-auth";
import { useCustomizations, useLeaderboard } from "@/hooks/use-customizations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trophy, Coins, User, Award, Palette } from "lucide-react";
import { useState } from "react";
import { Redirect } from "wouter";

export default function ProfilePage() {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  const {
    customizations,
    userCustomizations,
    isLoadingCustomizations,
    purchaseMutation,
    applyMutation,
    addTokensMutation,
    getCustomizationsByType,
    isCustomizationUnlocked,
    getCustomizationByName
  } = useCustomizations();
  
  const {
    data: leaderboard = [],
    isLoading: isLoadingLeaderboard
  } = useLeaderboard(5);
  
  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
    return <Redirect to="/login" />;
  }
  
  const userRank = leaderboard.findIndex(entry => entry.userId === user.id) + 1;
  
  const handlePurchase = (customizationId: number) => {
    purchaseMutation.mutate(customizationId);
  };
  
  const handleApply = (type: string, name: string) => {
    applyMutation.mutate({ type, name });
  };
  
  // For development/testing only - would be removed in production
  const handleAddTokens = () => {
    addTokensMutation.mutate({ 
      amount: 100, 
      reason: "Developer testing" 
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      
      {/* Profile Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src={`/assets/avatars/${user.profileImage || 'default-avatar'}.svg`} />
                <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-2xl">{user.username}</span>
                <Badge className="ml-2" variant="outline">{user.profileBadge || 'Beginner'}</Badge>
              </div>
            </CardTitle>
            <CardDescription>
              <div className="flex items-center mt-2">
                <Coins className="h-4 w-4 mr-1" />
                <span>{user.tokens || 0} tokens available</span>
                
                {/* For development/testing only - would be removed in production */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-4"
                  onClick={handleAddTokens}
                  disabled={addTokensMutation.isPending}
                >
                  {addTokensMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <Coins className="h-4 w-4 mr-1" />
                  )}
                  Add 100 Tokens
                </Button>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="customize">Customize</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Learning Journey</h3>
                    <Progress value={Object.keys(user.progress || {}).length * 10} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">
                      {Object.keys(user.progress || {}).length} lessons completed
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Ranking</h3>
                    {isLoadingLeaderboard ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : userRank > 0 ? (
                      <p>
                        <Trophy className="h-4 w-4 inline mr-1 text-yellow-500" />
                        Ranked #{userRank} on the leaderboard
                      </p>
                    ) : (
                      <p>Complete quizzes to appear on the leaderboard</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Customizations</h3>
                    <p>
                      Unlocked {userCustomizations.length} of {customizations.length} available items
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="customize">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <User className="h-4 w-4 mr-1" /> Avatars
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {isLoadingCustomizations ? (
                        <Loader2 className="h-8 w-8 animate-spin" />
                      ) : (
                        getCustomizationsByType('avatar').map(avatar => {
                          const isUnlocked = isCustomizationUnlocked(avatar.name) || 
                                          avatar.name === 'default-avatar';
                          return (
                            <Card 
                              key={avatar.id}
                              className={`overflow-hidden cursor-pointer transition hover:bg-accent ${
                                user.profileImage === avatar.name ? 'ring-2 ring-primary' : ''
                              } ${!isUnlocked ? 'opacity-60' : ''}`}
                              onClick={() => isUnlocked && handleApply('avatar', avatar.name)}
                            >
                              <CardContent className="p-3 text-center">
                                <Avatar className="h-16 w-16 mx-auto">
                                  <AvatarImage src={`/assets/avatars/${avatar.name}.svg`} />
                                  <AvatarFallback>?</AvatarFallback>
                                </Avatar>
                                <p className="text-sm mt-2">{avatar.displayName}</p>
                                {!isUnlocked && (
                                  <div className="mt-2">
                                    <Badge variant="outline" className="flex items-center gap-1">
                                      <Coins className="h-3 w-3" /> {avatar.tokenCost}
                                    </Badge>
                                    
                                    {/* Show requirements */}
                                    {avatar.requiredScore && avatar.requiredScore > 0 && (
                                      <p className="text-xs text-muted-foreground mt-1">
                                        Required score: {avatar.requiredScore}%
                                      </p>
                                    )}
                                    
                                    {Array.isArray(avatar.requiredLessons) && avatar.requiredLessons.length > 0 && (
                                      <p className="text-xs text-muted-foreground mt-1">
                                        Required lessons: {avatar.requiredLessons.join(', ')}
                                      </p>
                                    )}
                                    
                                    <Button 
                                      size="sm" 
                                      className="mt-2 w-full"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handlePurchase(avatar.id);
                                      }}
                                      disabled={purchaseMutation.isPending || (user?.tokens || 0) < avatar.tokenCost}
                                    >
                                      {purchaseMutation.isPending ? (
                                        <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                      ) : (user?.tokens || 0) < avatar.tokenCost ? 
                                        'Not enough tokens' : 'Buy'}
                                    </Button>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <Award className="h-4 w-4 mr-1" /> Badges
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {isLoadingCustomizations ? (
                        <Loader2 className="h-8 w-8 animate-spin" />
                      ) : (
                        getCustomizationsByType('badge').map(badge => {
                          const isUnlocked = isCustomizationUnlocked(badge.name) || 
                                          badge.name === 'beginner';
                          return (
                            <Card 
                              key={badge.id}
                              className={`overflow-hidden cursor-pointer transition hover:bg-accent ${
                                user.profileBadge === badge.name ? 'ring-2 ring-primary' : ''
                              } ${!isUnlocked ? 'opacity-60' : ''}`}
                              onClick={() => isUnlocked && handleApply('badge', badge.name)}
                            >
                              <CardContent className="p-3 text-center">
                                <div className="h-16 w-16 mx-auto flex items-center justify-center">
                                  <Badge variant="secondary" className="text-md px-3 py-1">
                                    {badge.displayName}
                                  </Badge>
                                </div>
                                <p className="text-sm mt-2">{badge.description}</p>
                                {!isUnlocked && (
                                  <div className="mt-2">
                                    <Badge variant="outline" className="flex items-center gap-1">
                                      <Coins className="h-3 w-3" /> {badge.tokenCost}
                                    </Badge>
                                    
                                    {/* Show requirements */}
                                    {badge.requiredScore > 0 && (
                                      <p className="text-xs text-muted-foreground mt-1">
                                        Required score: {badge.requiredScore}%
                                      </p>
                                    )}
                                    
                                    {Array.isArray(badge.requiredLessons) && badge.requiredLessons.length > 0 && (
                                      <p className="text-xs text-muted-foreground mt-1">
                                        Required lessons: {badge.requiredLessons.join(', ')}
                                      </p>
                                    )}
                                    
                                    <Button 
                                      size="sm" 
                                      className="mt-2 w-full"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handlePurchase(badge.id);
                                      }}
                                      disabled={purchaseMutation.isPending || (user?.tokens || 0) < badge.tokenCost}
                                    >
                                      {purchaseMutation.isPending ? (
                                        <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                      ) : (user?.tokens || 0) < badge.tokenCost ? 
                                        'Not enough tokens' : 'Buy'}
                                    </Button>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <Palette className="h-4 w-4 mr-1" /> Themes
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {isLoadingCustomizations ? (
                        <Loader2 className="h-8 w-8 animate-spin" />
                      ) : (
                        getCustomizationsByType('theme').map(theme => {
                          const isUnlocked = isCustomizationUnlocked(theme.name) || 
                                          theme.name === 'default';
                          return (
                            <Card 
                              key={theme.id}
                              className={`overflow-hidden cursor-pointer transition hover:bg-accent ${
                                user.profileTheme === theme.name ? 'ring-2 ring-primary' : ''
                              } ${!isUnlocked ? 'opacity-60' : ''}`}
                              onClick={() => isUnlocked && handleApply('theme', theme.name)}
                            >
                              <CardContent className="p-3 text-center">
                                <div className="h-16 w-16 mx-auto flex items-center justify-center rounded-full overflow-hidden">
                                  {theme.name === 'default' && (
                                    <div className="bg-primary h-full w-full"></div>
                                  )}
                                  {theme.name === 'sakura' && (
                                    <div className="bg-pink-300 h-full w-full"></div>
                                  )}
                                  {theme.name === 'night' && (
                                    <div className="bg-slate-800 h-full w-full"></div>
                                  )}
                                </div>
                                <p className="text-sm mt-2">{theme.displayName}</p>
                                {!isUnlocked && (
                                  <div className="mt-2">
                                    <Badge variant="outline" className="flex items-center gap-1">
                                      <Coins className="h-3 w-3" /> {theme.tokenCost}
                                    </Badge>
                                    <Button 
                                      size="sm" 
                                      className="mt-2 w-full"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handlePurchase(theme.id);
                                      }}
                                      disabled={purchaseMutation.isPending}
                                    >
                                      {purchaseMutation.isPending ? (
                                        <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                      ) : 'Buy'}
                                    </Button>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="leaderboard">
                <div className="space-y-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-yellow-500" /> Top Learners
                  </h3>
                  
                  {isLoadingLeaderboard ? (
                    <div className="flex justify-center p-4">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {leaderboard.map((entry, index) => (
                        <Card 
                          key={entry.userId}
                          className={entry.userId === user.id ? 'bg-accent' : ''}
                        >
                          <CardContent className="p-4 flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="mr-4 font-bold text-xl w-6 text-center">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium">{entry.username}</p>
                                <p className="text-sm text-muted-foreground">
                                  {entry.quizzesTaken} quizzes completed
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{entry.totalScore}</p>
                              <p className="text-sm text-muted-foreground">points</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      {leaderboard.length === 0 && (
                        <p className="text-center py-4 text-muted-foreground">
                          No leaderboard data available yet.
                        </p>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => toast({
                        title: "Keep Learning!",
                        description: "Complete more quizzes to rise up the ranks!"
                      })}
                    >
                      View Full Leaderboard
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Achievements</CardTitle>
            <CardDescription>
              Track your learning progress and milestones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Lessons Completed</span>
                <span>{Object.keys(user.progress || {}).length}</span>
              </div>
              <Progress value={Object.keys(user.progress || {}).length * 10} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Customizations Unlocked</span>
                <span>{userCustomizations.length}</span>
              </div>
              <Progress 
                value={(userCustomizations.length / Math.max(customizations.length, 1)) * 100} 
                className="h-2" 
              />
            </div>
            
            <div className="pt-4">
              <h4 className="font-medium mb-3">Recent Rewards</h4>
              <div className="space-y-2">
                <div className="flex items-center p-2 bg-muted rounded">
                  <Coins className="h-4 w-4 mr-2 text-yellow-500" />
                  <span>+50 tokens for quiz completion</span>
                </div>
                <div className="flex items-center p-2 bg-muted rounded">
                  <Award className="h-4 w-4 mr-2 text-blue-500" />
                  <span>New badge unlocked</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setActiveTab("customize")}>
              Customize Profile
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}