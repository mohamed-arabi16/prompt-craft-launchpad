import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Target, Clock, MessageSquare, Dumbbell, ClipboardCheck,
  ChevronRight, Save, CheckCircle2, Circle, Timer
} from "lucide-react";
import { DayContent } from "@/types/instructorDashboard";
import { useInstructorProgress } from "@/hooks/useInstructorProgress";
import { toast } from "sonner";

interface DayProgressViewProps {
  dayContent: DayContent;
  sessionId: string | null;
  language?: 'en' | 'ar';
}

const DayProgressView = ({ dayContent, sessionId, language = 'en' }: DayProgressViewProps) => {
  const {
    getChecklistItemsWithProgress,
    toggleChecklistItem,
    getNotesForDay,
    saveSessionNotes
  } = useInstructorProgress();

  const [localNotes, setLocalNotes] = useState({
    common_mistakes: "",
    observations: "",
    learner_highlights: "",
    improvements_for_next_time: ""
  });

  const preItems = getChecklistItemsWithProgress(dayContent.dayNumber, "pre");
  const duringItems = getChecklistItemsWithProgress(dayContent.dayNumber, "during");
  const afterItems = getChecklistItemsWithProgress(dayContent.dayNumber, "after");

  const isArabic = language === 'ar';
  const dir = isArabic ? "rtl" : "ltr";
  const align = isArabic ? "text-right" : "text-left";

  const handleToggleItem = async (checklistItemId: string, currentState: boolean) => {
    if (!sessionId) {
      toast.error("Please select or create a session first");
      return;
    }

    try {
      await toggleChecklistItem(sessionId, checklistItemId, !currentState);
    } catch (error: any) {
      toast.error(error.message || "Failed to update checklist");
    }
  };

  const handleSaveNotes = async () => {
    if (!sessionId) {
      toast.error("Please select or create a session first");
      return;
    }

    try {
      await saveSessionNotes(sessionId, dayContent.dayNumber, localNotes);
      toast.success("Notes saved successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to save notes");
    }
  };

  return (
    <div className={`space-y-6 ${align}`} dir={dir}>
      {/* Day Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">
                {isArabic ? (dayContent.title_ar || dayContent.title) : dayContent.title}
              </CardTitle>
              <CardDescription className="text-base mt-1">
                {isArabic ? (dayContent.subtitle_ar || dayContent.subtitle) : dayContent.subtitle}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Timer className="h-4 w-4 mr-2" />
              {dayContent.sessionLength}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Outcomes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                {isArabic ? "مخرجات اليوم (Definition of Done)" : "Day Outcomes (What \"Done\" Means)"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dayContent.outcomes.map((outcome) => (
                  <li key={outcome.id} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{isArabic ? (outcome.description_ar || outcome.description) : outcome.description}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Timeline / Run of Show */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                {isArabic ? "جدول العمل دقيقة بدقيقة" : "Minute-by-Minute Run-of-Show"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dayContent.timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-24 text-center">
                      <Badge variant="outline" className="font-mono">
                        {item.time}
                      </Badge>
                    </div>
                    <div className="flex-shrink-0 w-16 text-sm text-muted-foreground text-center">
                      {item.duration}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {isArabic ? (item.title_ar || item.title) : item.title}
                      </p>
                      {(item.description || item.description_ar) && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {isArabic ? (item.description_ar || item.description) : item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Talk Tracks */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                {isArabic ? "نصوص الحديث (Talk Tracks)" : "Talk Track Scripts"}
              </CardTitle>
              <CardDescription>
                {isArabic ? "انسخ والصق النصوص لكل قسم" : "Copy/paste scripts for each section"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {dayContent.talkTracks.map((track) => (
                  <AccordionItem key={track.id} value={track.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 text-left w-full">
                        <Badge variant="secondary" className="font-mono text-xs">
                          {track.time}
                        </Badge>
                        <span className={isArabic ? "text-right flex-1" : "text-left"}>
                          {isArabic ? (track.title_ar || track.title) : track.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-muted p-4 rounded-lg">
                        <ScrollArea className="max-h-[400px]">
                          <pre className={`text-sm whitespace-pre-wrap font-sans ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'inherit' : undefined }}>
                            {isArabic ? (track.script_ar || track.script) : track.script}
                          </pre>
                        </ScrollArea>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3"
                          onClick={() => {
                            navigator.clipboard.writeText(isArabic ? (track.script_ar || track.script) : track.script);
                            toast.success("Copied to clipboard");
                          }}
                        >
                          {isArabic ? "نسخ النص" : "Copy Script"}
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Exercises */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-orange-500" />
                {isArabic ? "التمارين" : "Exercises"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dayContent.exercises.map((exercise) => (
                  <div key={exercise.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">
                        {isArabic ? (exercise.title_ar || exercise.title) : exercise.title}
                      </h4>
                      <Badge variant="outline">
                        <Timer className="h-3 w-3 mr-1" />
                        {exercise.duration}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          {isArabic ? "التعليمات (قل + انسخ):" : "Instructions (say + paste):"}
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          {(isArabic && exercise.instructions_ar ? exercise.instructions_ar : exercise.instructions).map((instruction, idx) => (
                            <li key={idx}>{instruction}</li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          {isArabic ? "النتيجة المتوقعة:" : "Expected Output:"}
                        </p>
                        <p className="text-sm bg-muted p-2 rounded">
                          {isArabic ? (exercise.expectedOutput_ar || exercise.expectedOutput) : exercise.expectedOutput}
                        </p>
                      </div>

                      {exercise.debriefQuestions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">
                            {isArabic ? "أسئلة النقاش:" : "Debrief Questions:"}
                          </p>
                          <ul className="space-y-1 text-sm">
                            {(isArabic && exercise.debriefQuestions_ar ? exercise.debriefQuestions_ar : exercise.debriefQuestions).map((question, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <ChevronRight className={`h-4 w-4 mt-0.5 flex-shrink-0 ${isArabic ? 'rotate-180' : ''}`} />
                                <span>{question}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Checklists + Notes */}
        <div className="space-y-6">
          {/* Instructor Checklist */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-red-500" />
                {isArabic ? "قائمة تحقق المدرب" : "Instructor Checklist"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pre-Session */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Badge variant="secondary">PRE</Badge>
                  {isArabic ? "قبل الجلسة" : "Before Session"}
                </h4>
                <div className="space-y-2">
                  {preItems.length > 0 ? (
                    preItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-2 rounded hover:bg-muted/50"
                      >
                        <Checkbox
                          checked={item.progress?.is_completed || false}
                          onCheckedChange={() =>
                            handleToggleItem(item.id, item.progress?.is_completed || false)
                          }
                        />
                        <span className={`text-sm ${item.progress?.is_completed ? "line-through text-muted-foreground" : ""}`}>
                          {isArabic ? (item.content_ar || item.content_en) : item.content_en}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      {isArabic ? "لا يوجد عناصر قبل الجلسة لهذا اليوم" : "No pre-session items for this day"}
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {/* During Session */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Badge variant="secondary">DURING</Badge>
                  {isArabic ? "أثناء الجلسة" : "During Session"}
                </h4>
                <div className="space-y-2">
                  {duringItems.length > 0 ? (
                    duringItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-2 rounded hover:bg-muted/50"
                      >
                        <Checkbox
                          checked={item.progress?.is_completed || false}
                          onCheckedChange={() =>
                            handleToggleItem(item.id, item.progress?.is_completed || false)
                          }
                        />
                        <span className={`text-sm ${item.progress?.is_completed ? "line-through text-muted-foreground" : ""}`}>
                          {isArabic ? (item.content_ar || item.content_en) : item.content_en}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      {isArabic ? "لا يوجد عناصر أثناء الجلسة لهذا اليوم" : "No during-session items for this day"}
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {/* After Session */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Badge variant="secondary">AFTER</Badge>
                  {isArabic ? "بعد الجلسة" : "After Session"}
                </h4>
                <div className="space-y-2">
                  {afterItems.length > 0 ? (
                    afterItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-2 rounded hover:bg-muted/50"
                      >
                        <Checkbox
                          checked={item.progress?.is_completed || false}
                          onCheckedChange={() =>
                            handleToggleItem(item.id, item.progress?.is_completed || false)
                          }
                        />
                        <span className={`text-sm ${item.progress?.is_completed ? "line-through text-muted-foreground" : ""}`}>
                          {isArabic ? (item.content_ar || item.content_en) : item.content_en}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      {isArabic ? "لا يوجد عناصر بعد الجلسة لهذا اليوم" : "No after-session items for this day"}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                {isArabic ? "ملاحظات الجلسة" : "Session Notes"}
              </CardTitle>
              <CardDescription>
                {isArabic ? "وثّق ملاحظاتك لهذا اليوم" : "Document observations for this day"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">
                  {isArabic ? "أخطاء شائعة" : "Common Mistakes Observed"}
                </Label>
                <Textarea
                  placeholder={isArabic ? "سجّل الأخطاء الشائعة..." : "Note common mistakes you observed..."}
                  value={localNotes.common_mistakes}
                  onChange={(e) =>
                    setLocalNotes({ ...localNotes, common_mistakes: e.target.value })
                  }
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-sm">
                  {isArabic ? "ملاحظات عامة" : "General Observations"}
                </Label>
                <Textarea
                  placeholder={isArabic ? "ملاحظات عامة حول الجلسة..." : "General observations about the session..."}
                  value={localNotes.observations}
                  onChange={(e) =>
                    setLocalNotes({ ...localNotes, observations: e.target.value })
                  }
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-sm">
                  {isArabic ? "إنجازات الطلاب" : "Learner Highlights"}
                </Label>
                <Textarea
                  placeholder={isArabic ? "إنجازات مميزة للطلاب..." : "Notable learner achievements or examples..."}
                  value={localNotes.learner_highlights}
                  onChange={(e) =>
                    setLocalNotes({ ...localNotes, learner_highlights: e.target.value })
                  }
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-sm">
                  {isArabic ? "تحسينات للمرة القادمة" : "Improvements for Next Time"}
                </Label>
                <Textarea
                  placeholder={isArabic ? "ما يجب تحسينه للدفعة القادمة..." : "What to improve for the next cohort..."}
                  value={localNotes.improvements_for_next_time}
                  onChange={(e) =>
                    setLocalNotes({
                      ...localNotes,
                      improvements_for_next_time: e.target.value
                    })
                  }
                  className="mt-1"
                  rows={3}
                />
              </div>

              <Button onClick={handleSaveNotes} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                {isArabic ? "حفظ الملاحظات" : "Save Notes"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DayProgressView;
