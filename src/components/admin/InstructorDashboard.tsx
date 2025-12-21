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
import { Switch } from "@/components/ui/switch";
import {
  GraduationCap, Calendar, Play, CheckCircle2, Clock, Users,
  BookOpen, AlertTriangle, Lightbulb, Plus, Settings, FileText, Globe
} from "lucide-react";
import { useInstructorProgress } from "@/hooks/useInstructorProgress";
import { allDaysContent, operatingPrinciples, troubleshootingScenarios, qaManagement, sharedAssets, templatesLibrary } from "@/data/instructorCourseContent";
import LoadingSpinner from "@/components/LoadingSpinner";
import DayProgressView from "./DayProgressView";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [language, setLanguage] = useState<'en' | 'ar'>('ar');

  const isArabic = language === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

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
    <div className="space-y-6" dir={dir}>
      {/* Header with Session Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                {isArabic ? "لوحة متابعة المدرب" : "Instructor Progress Dashboard"}
              </CardTitle>
              <CardDescription>
                {isArabic ? "تتبع تقديم الدورة التدريبية لمدة 5 أيام" : "Track your 5-day course delivery"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border p-1 rounded-lg bg-muted/20">
                <Button
                  variant={language === 'en' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                  className="px-3"
                >
                  English
                </Button>
                <Button
                  variant={language === 'ar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('ar')}
                  className="px-3"
                >
                  العربية
                </Button>
              </div>

              {activeSession ? (
                <div className={isArabic ? "text-left" : "text-right"}>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {allDaysContent.map((day) => {
              const progress = getDayProgress(day.dayNumber);
              const isCurrentDay = activeSession?.current_day === day.dayNumber;
              const isSelected = selectedDay === day.dayNumber;

              return (
                <button
                  key={day.dayNumber}
                  onClick={() => handleDayChange(day.dayNumber)}
                  className={`p-4 rounded-lg border-2 transition-all ${isArabic ? 'text-right' : 'text-left'} ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : isCurrentDay
                      ? "border-primary/50 bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">
                      {day.dayNumber === 0 ? (isArabic ? "جلسة 0" : "S0") : (isArabic ? `يوم ${day.dayNumber}` : `D${day.dayNumber}`)}
                    </span>
                    {isCurrentDay && (
                      <Badge variant="secondary" className="text-xs">
                        <Play className="h-3 w-3 mr-1" />
                        Live
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {isArabic ? (day.subtitle_ar || day.subtitle) : day.subtitle}
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
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full h-auto p-2 gap-2">
          <TabsTrigger value="day-content" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">{isArabic ? "محتوى اليوم" : "Day Content"}</span>
          </TabsTrigger>
          <TabsTrigger value="principles" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">{isArabic ? "المبادئ" : "Principles"}</span>
          </TabsTrigger>
          <TabsTrigger value="troubleshooting" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">{isArabic ? "حل المشاكل" : "If Stuck"}</span>
          </TabsTrigger>
          <TabsTrigger value="qa-management" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">{isArabic ? "الأسئلة والأجوبة" : "Q&A"}</span>
          </TabsTrigger>
          <TabsTrigger value="assets" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">{isArabic ? "الأصول" : "Assets"}</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">{isArabic ? "القوالب" : "Templates"}</span>
          </TabsTrigger>
        </TabsList>

        {/* Day Content Tab */}
        <TabsContent value="day-content">
          {dayContent ? (
            <DayProgressView
              dayContent={dayContent}
              sessionId={activeSession?.id || null}
              language={language}
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
                    {isArabic ? (principle.title_ar || principle.title) : principle.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(isArabic && principle.items_ar ? principle.items_ar : principle.items).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className={`h-4 w-4 text-green-500 mt-0.5 flex-shrink-0 ${isArabic ? 'ml-2' : 'mr-2'}`} />
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
                    {isArabic ? (scenario.title_ar || scenario.title) : scenario.title}
                  </CardTitle>
                  <CardDescription>
                    {isArabic ? "الأعراض: " : "Symptoms: "}
                    {isArabic ? (scenario.symptoms_ar || scenario.symptoms) : scenario.symptoms}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-3 rounded-lg text-sm whitespace-pre-wrap font-mono">
                    {isArabic ? (scenario.script_ar || scenario.script) : scenario.script}
                  </div>
                  {(isArabic ? (scenario.fallback_ar || scenario.fallback) : scenario.fallback) && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        {isArabic ? "الخطة البديلة:" : "Fallback:"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isArabic ? (scenario.fallback_ar || scenario.fallback) : scenario.fallback}
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
                  {isArabic ? (qaManagement.qaGate.title_ar || qaManagement.qaGate.title) : qaManagement.qaGate.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-muted p-3 rounded-lg text-sm font-mono">
                  {isArabic ? (qaManagement.qaGate.response_ar || qaManagement.qaGate.response) : qaManagement.qaGate.response}
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {isArabic ? "إذا لم يتمكنوا من إظهار ذلك:" : "If they can't show it:"}
                  </p>
                  <p className="text-sm">
                    {isArabic ? (qaManagement.qaGate.fallback_ar || qaManagement.qaGate.fallback) : qaManagement.qaGate.fallback}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {isArabic ? "قواعد الوقت" : "Time-box Rules"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {(isArabic && qaManagement.timeboxRules_ar ? qaManagement.timeboxRules_ar : qaManagement.timeboxRules).map((rule: string, idx: number) => (
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
                <CardTitle className="text-lg">
                  {isArabic ? (qaManagement.parkingLot_ar || qaManagement.parkingLot) : qaManagement.parkingLot}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded-lg text-sm font-mono whitespace-pre-wrap">
                  {isArabic ? "___" : "Parking Lot\n\n___\n___\n___"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {isArabic ? "نصيحة للنظام الهجين" : "Hybrid Tip"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  {isArabic ? (qaManagement.hybridTip_ar || qaManagement.hybridTip) : qaManagement.hybridTip}
                </p>
                {qaManagement.helpRule && (
                  <p className="text-xs text-muted-foreground mt-2 border-t pt-2">
                    {isArabic ? (qaManagement.helpRule_ar || qaManagement.helpRule) : qaManagement.helpRule}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Shared Assets Tab */}
        <TabsContent value="assets">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {isArabic ? "الأصول المشتركة (تجهيز قبل اليوم 1)" : "Shared Assets (Prepare Before Day 1)"}
              </CardTitle>
              <CardDescription>
                {isArabic ? "إنشاء مجلد مشترك يحتوي على هذه القوالب" : "Create a shared folder with these templates"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {sharedAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <h4 className="font-medium mb-1">
                      {isArabic ? (asset.name_ar || asset.name) : asset.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {isArabic ? (asset.description_ar || asset.description) : asset.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Library Tab */}
        <TabsContent value="templates">
          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(templatesLibrary).map(([key, template]: [string, any]) => (
              <Card key={key} className="h-full flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    {template.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-2">
                   <div className="flex-1 bg-muted p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-semibold uppercase text-muted-foreground">
                         {isArabic ? "النص" : "Content"}
                       </span>
                       <Button
                         variant="ghost"
                         size="sm"
                         className="h-6 w-6 p-0"
                         onClick={() => {
                           navigator.clipboard.writeText(isArabic ? (template.content_ar || template.content_en) : template.content_en);
                           toast.success("Copied to clipboard");
                         }}
                       >
                         <CheckCircle2 className="h-3 w-3" />
                       </Button>
                    </div>
                    <ScrollArea className="h-[150px]">
                      <pre className="text-xs whitespace-pre-wrap font-mono">
                        {isArabic ? (template.content_ar || template.content_en) : template.content_en}
                      </pre>
                    </ScrollArea>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstructorDashboard;
