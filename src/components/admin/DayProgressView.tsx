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
}

const DayProgressView = ({ dayContent, sessionId }: DayProgressViewProps) => {
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
    <div className="space-y-6">
      {/* Day Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{dayContent.title}</CardTitle>
              <CardDescription className="text-base mt-1">
                {dayContent.subtitle}
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
        {/* Left Column: Outcomes + Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Outcomes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                Day Outcomes (What "Done" Means)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dayContent.outcomes.map((outcome) => (
                  <li key={outcome.id} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{outcome.description}</span>
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
                Minute-by-Minute Run-of-Show
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dayContent.timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-20 text-right">
                      <Badge variant="outline" className="font-mono">
                        {item.time}
                      </Badge>
                    </div>
                    <div className="flex-shrink-0 w-16 text-sm text-muted-foreground">
                      {item.duration}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
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
                Talk Track Scripts
              </CardTitle>
              <CardDescription>
                Copy/paste scripts for each section
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {dayContent.talkTracks.map((track) => (
                  <AccordionItem key={track.id} value={track.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <Badge variant="secondary" className="font-mono text-xs">
                          {track.time}
                        </Badge>
                        <span>{track.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-muted p-4 rounded-lg">
                        <ScrollArea className="max-h-[400px]">
                          <pre className="text-sm whitespace-pre-wrap font-sans">
                            {track.script}
                          </pre>
                        </ScrollArea>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3"
                          onClick={() => {
                            navigator.clipboard.writeText(track.script);
                            toast.success("Copied to clipboard");
                          }}
                        >
                          Copy Script
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
                Exercises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dayContent.exercises.map((exercise) => (
                  <div key={exercise.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{exercise.title}</h4>
                      <Badge variant="outline">
                        <Timer className="h-3 w-3 mr-1" />
                        {exercise.duration}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Instructions (say + paste):
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          {exercise.instructions.map((instruction, idx) => (
                            <li key={idx}>{instruction}</li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Expected Output:
                        </p>
                        <p className="text-sm bg-muted p-2 rounded">
                          {exercise.expectedOutput}
                        </p>
                      </div>

                      {exercise.debriefQuestions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">
                            Debrief Questions:
                          </p>
                          <ul className="space-y-1 text-sm">
                            {exercise.debriefQuestions.map((question, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
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
                Instructor Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pre-Session */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Badge variant="secondary">PRE</Badge>
                  Before Session
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
                          {item.content_en}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No pre-session items for this day
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {/* During Session */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Badge variant="secondary">DURING</Badge>
                  During Session
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
                          {item.content_en}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No during-session items for this day
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {/* After Session */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Badge variant="secondary">AFTER</Badge>
                  After Session
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
                          {item.content_en}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No after-session items for this day
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Session Notes</CardTitle>
              <CardDescription>
                Document observations for this day
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Common Mistakes Observed</Label>
                <Textarea
                  placeholder="Note common mistakes you observed..."
                  value={localNotes.common_mistakes}
                  onChange={(e) =>
                    setLocalNotes({ ...localNotes, common_mistakes: e.target.value })
                  }
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-sm">General Observations</Label>
                <Textarea
                  placeholder="General observations about the session..."
                  value={localNotes.observations}
                  onChange={(e) =>
                    setLocalNotes({ ...localNotes, observations: e.target.value })
                  }
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-sm">Learner Highlights</Label>
                <Textarea
                  placeholder="Notable learner achievements or examples..."
                  value={localNotes.learner_highlights}
                  onChange={(e) =>
                    setLocalNotes({ ...localNotes, learner_highlights: e.target.value })
                  }
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-sm">Improvements for Next Time</Label>
                <Textarea
                  placeholder="What to improve for the next cohort..."
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
                Save Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DayProgressView;
