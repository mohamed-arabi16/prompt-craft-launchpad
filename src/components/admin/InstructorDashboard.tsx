import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  GraduationCap, Calendar, Play, CheckCircle2, Clock, Users,
  BookOpen, AlertTriangle, Lightbulb, Plus, Settings
} from "lucide-react";
import { useInstructorProgress } from "@/hooks/useInstructorProgress";
import { allDaysContent, operatingPrinciples, troubleshootingScenarios, qaManagement, sharedAssets } from "@/data/instructorCourseContent";
import LoadingSpinner from "@/components/LoadingSpinner";
import DayProgressView from "./DayProgressView";
import { toast } from "sonner";

const InstructorDashboard = () => {
  const {
    sessions,
    activeSession,
    loading,
    createSession,
    setSessionActive,
    updateCurrentDay,
    getDayProgress
  } = useInstructorProgress();

  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [isNewSessionOpen, setIsNewSessionOpen] = useState(false);
  const [newSessionName, setNewSessionName] = useState("");
  const [newSessionStartDate, setNewSessionStartDate] = useState("");

  const handleCreateSession = async () => {
    if (!newSessionName || !newSessionStartDate) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const session = await createSession({
        session_name: newSessionName,
        start_date: newSessionStartDate,
        end_date: null,
        current_day: 0,
        is_active: true,
        notes: null
      });
      toast.success("Session created successfully");
      setIsNewSessionOpen(false);
      setNewSessionName("");
      setNewSessionStartDate("");
    } catch (error: any) {
      toast.error(error.message || "Failed to create session");
    }
  };

  const handleDayChange = async (dayNumber: number) => {
    setSelectedDay(dayNumber);
    if (activeSession) {
      await updateCurrentDay(activeSession.id, dayNumber);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const dayContent = allDaysContent.find(d => d.dayNumber === selectedDay);

  return (
    <div className="space-y-6">
      {/* Header with Session Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                لوحة متابعة المدرب
              </CardTitle>
              <CardDescription>
                Instructor Progress Dashboard - Track your 5-day course delivery
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              {activeSession ? (
                <div className="text-right">
                  <p className="text-sm font-medium">{activeSession.session_name}</p>
                  <p className="text-xs text-muted-foreground">
                    Started: {new Date(activeSession.start_date).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No active session</p>
              )}
              <Dialog open={isNewSessionOpen} onOpenChange={setIsNewSessionOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Session
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Cohort Session</DialogTitle>
                    <DialogDescription>
                      Start a new 5-day course session for a cohort
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label>Session Name</Label>
                      <Input
                        value={newSessionName}
                        onChange={(e) => setNewSessionName(e.target.value)}
                        placeholder="e.g., Cohort January 2025"
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={newSessionStartDate}
                        onChange={(e) => setNewSessionStartDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewSessionOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateSession}>
                      Create Session
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {sessions.length > 0 && (
                <Select
                  value={activeSession?.id || ""}
                  onValueChange={(id) => setSessionActive(id)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select session" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map((session) => (
                      <SelectItem key={session.id} value={session.id}>
                        {session.session_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day Progress Overview */}
          <div className="grid grid-cols-6 gap-4">
            {allDaysContent.map((day) => {
              const progress = getDayProgress(day.dayNumber);
              const isCurrentDay = activeSession?.current_day === day.dayNumber;
              const isSelected = selectedDay === day.dayNumber;

              return (
                <button
                  key={day.dayNumber}
                  onClick={() => handleDayChange(day.dayNumber)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : isCurrentDay
                      ? "border-primary/50 bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">
                      {day.dayNumber === 0 ? "S0" : `D${day.dayNumber}`}
                    </span>
                    {isCurrentDay && (
                      <Badge variant="secondary" className="text-xs">
                        <Play className="h-3 w-3 mr-1" />
                        Live
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {day.subtitle}
                  </p>
                  <Progress value={progress} className="h-1" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {progress}% complete
                  </p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="day-content" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="day-content" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Day Content
          </TabsTrigger>
          <TabsTrigger value="principles" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Principles
          </TabsTrigger>
          <TabsTrigger value="troubleshooting" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            If Stuck
          </TabsTrigger>
          <TabsTrigger value="qa-management" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Q&A
          </TabsTrigger>
          <TabsTrigger value="assets" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Assets
          </TabsTrigger>
        </TabsList>

        {/* Day Content Tab */}
        <TabsContent value="day-content">
          {dayContent ? (
            <DayProgressView
              dayContent={dayContent}
              sessionId={activeSession?.id || null}
            />
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Select a day to view its content
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Operating Principles Tab */}
        <TabsContent value="principles">
          <div className="grid gap-4 md:grid-cols-2">
            {operatingPrinciples.map((principle) => (
              <Card key={principle.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    {principle.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {principle.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Troubleshooting Tab */}
        <TabsContent value="troubleshooting">
          <div className="grid gap-4">
            {troubleshootingScenarios.map((scenario) => (
              <Card key={scenario.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    {scenario.title}
                  </CardTitle>
                  <CardDescription>
                    Symptoms: {scenario.symptoms}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-3 rounded-lg text-sm whitespace-pre-wrap font-mono">
                    {scenario.script}
                  </div>
                  {scenario.fallback && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Fallback:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {scenario.fallback}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Q&A Management Tab */}
        <TabsContent value="qa-management">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {qaManagement.qaGate.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-muted p-3 rounded-lg text-sm font-mono">
                  {qaManagement.qaGate.response}
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    If they can't show it:
                  </p>
                  <p className="text-sm">{qaManagement.qaGate.fallback}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Time-box Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {qaManagement.timeboxRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Clock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Parking Lot Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded-lg text-sm font-mono whitespace-pre-wrap">
                  {qaManagement.parkingLot}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hybrid Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{qaManagement.hybridTip}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Shared Assets Tab */}
        <TabsContent value="assets">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Shared Assets (Prepare Before Day 1)
              </CardTitle>
              <CardDescription>
                Create a shared folder with these templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {sharedAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <h4 className="font-medium mb-1">{asset.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {asset.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstructorDashboard;
