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
import { Loader2, Trophy, Coins, User, Award, Palette, Grid3X3 } from "lucide-react";
import { useState } from "react";
import { Redirect } from "wouter";
import CustomizationDetail from "@/components/customization-detail";
import { Customization } from "@shared/schema";

export default function ProfilePage() {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCustomizationType, setSelectedCustomizationType] = useState<string | null>(null);
  const [selectedCustomization, setSelectedCustomization] = useState<Customization | null>(null);
  
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
  
  // For development/testing only - would be removed in production
  const handleAddTokens = () => {
    addTokensMutation.mutate({ 
      amount: 100, 
      reason: "Developer testing" 
    });
  };
  
  const handleShowCustomizationDetails = (customization: Customization) => {
    setSelectedCustomization(customization);
  };
  
  const handleBackFromDetails = () => {
    setSelectedCustomization(null);
  };
  
  const handleSelectCustomizationType = (type: string) => {
    setSelectedCustomizationType(type);
    setSelectedCustomization(null);
  };
  
  const handleBackToTypes = () => {
    setSelectedCustomizationType(null);
  };
  
  // Use the mutations from useCustomizations hook
  const handlePurchase = (customizationId: number) => {
    purchaseMutation.mutate(customizationId);
  };
  
  const handleApply = (type: string, name: string) => {
    applyMutation.mutate({ type, name });
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
                {selectedCustomization ? (
                  <CustomizationDetail
                    customization={selectedCustomization}
                    unlockedCustomizations={userCustomizations}
                    onBack={handleBackFromDetails}
                  />
                ) : selectedCustomizationType ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <Button variant="ghost" size="sm" onClick={handleBackToTypes}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Categories
                      </Button>
                      <h3 className="font-medium text-lg">
                        {selectedCustomizationType === 'avatar' && 'Choose an Avatar'}
                        {selectedCustomizationType === 'badge' && 'Choose a Badge'}
                        {selectedCustomizationType === 'theme' && 'Choose a Theme'}
                      </h3>
                      <div className="w-8"></div> {/* Spacer for alignment */}
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {isLoadingCustomizations ? (
                        <Loader2 className="h-8 w-8 animate-spin" />
                      ) : (
                        getCustomizationsByType(selectedCustomizationType).map(item => {
                          const isUnlocked = isCustomizationUnlocked(item.name) || 
                                          (item.name === 'default-avatar') ||
                                          (item.name === 'beginner') ||
                                          (item.name === 'default');
                          
                          return (
                            <Card 
                              key={item.id}
                              className={`overflow-hidden cursor-pointer transition hover:bg-accent ${
                                ((selectedCustomizationType === 'avatar' && user.profileImage === item.name) ||
                                 (selectedCustomizationType === 'badge' && user.profileBadge === item.name) ||
                                 (selectedCustomizationType === 'theme' && user.profileTheme === item.name))
                                 ? 'ring-2 ring-primary' : ''
                              } ${!isUnlocked ? 'opacity-70' : ''}`}
                              onClick={() => handleShowCustomizationDetails(item)}
                            >
                              <CardContent className="p-3 text-center">
                                {/* Avatar preview */}
                                {selectedCustomizationType === 'avatar' && (
                                  <Avatar className="h-16 w-16 mx-auto">
                                    <AvatarImage src={`/assets/avatars/${item.name}.svg`} />
                                    <AvatarFallback>?</AvatarFallback>
                                  </Avatar>
                                )}
                                
                                {/* Badge preview */}
                                {selectedCustomizationType === 'badge' && (
                                  <div className="h-16 w-16 mx-auto flex items-center justify-center">
                                    <Badge variant="secondary" className="text-md px-3 py-1">
                                      {item.displayName}
                                    </Badge>
                                  </div>
                                )}
                                
                                {/* Theme preview */}
                                {selectedCustomizationType === 'theme' && (
                                  <div className="h-16 w-16 mx-auto flex items-center justify-center rounded-full overflow-hidden">
                                    {item.name === 'default' && (
                                      <div className="bg-primary h-full w-full"></div>
                                    )}
                                    {item.name === 'sakura' && (
                                      <div className="bg-pink-300 h-full w-full"></div>
                                    )}
                                    {item.name === 'night' && (
                                      <div className="bg-slate-800 h-full w-full"></div>
                                    )}
                                  </div>
                                )}
                                
                                <p className="text-sm mt-2 font-medium">{item.displayName}</p>
                                
                                {!isUnlocked && (
                                  <Badge variant="outline" className="mt-1">
                                    <Coins className="h-3 w-3 mr-1" /> {item.tokenCost}
                                  </Badge>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="font-medium mb-4">Customize Your Profile</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card 
                        className="cursor-pointer hover:bg-accent transition"
                        onClick={() => handleSelectCustomizationType('avatar')}
                      >
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <User className="h-12 w-12 mb-3 text-primary" />
                          <h4 className="font-medium">Avatars</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Choose how you appear to others
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card 
                        className="cursor-pointer hover:bg-accent transition"
                        onClick={() => handleSelectCustomizationType('badge')}
                      >
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <Award className="h-12 w-12 mb-3 text-primary" />
                          <h4 className="font-medium">Badges</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Show off your achievements
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card 
                        className="cursor-pointer hover:bg-accent transition"
                        onClick={() => handleSelectCustomizationType('theme')}
                      >
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <Palette className="h-12 w-12 mb-3 text-primary" />
                          <h4 className="font-medium">Themes</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Personalize your experience
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card className="mt-8">
                      <CardHeader>
                        <CardTitle>Your Collection</CardTitle>
                        <CardDescription>
                          Items you've unlocked so far
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {isLoadingCustomizations ? (
                          <div className="flex justify-center p-4">
                            <Loader2 className="h-8 w-8 animate-spin" />
                          </div>
                        ) : userCustomizations.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {customizations
                              .filter(item => userCustomizations.includes(item.name))
                              .map(item => (
                                <div 
                                  key={item.id} 
                                  className="text-center cursor-pointer"
                                  onClick={() => handleShowCustomizationDetails(item)}
                                >
                                  {item.type === 'avatar' && (
                                    <Avatar className="mx-auto h-10 w-10">
                                      <AvatarImage src={`/assets/avatars/${item.name}.svg`} />
                                      <AvatarFallback>{item.displayName[0]}</AvatarFallback>
                                    </Avatar>
                                  )}
                                  {item.type === 'badge' && (
                                    <Badge variant="secondary" className="mx-auto">
                                      {item.displayName}
                                    </Badge>
                                  )}
                                  {item.type === 'theme' && (
                                    <div className="h-10 w-10 rounded-full mx-auto bg-primary"></div>
                                  )}
                                  <p className="text-xs mt-1">{item.displayName}</p>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <p className="text-center text-muted-foreground py-4">
                            You haven't unlocked any customizations yet.
                            Complete quizzes to earn tokens!
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
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