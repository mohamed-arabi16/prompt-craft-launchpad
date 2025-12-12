import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Calendar, Plus, Pencil, Trash2 } from "lucide-react";
import { useCourseDays, CourseDay } from "@/hooks/useCourseDays";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

const AdminCourseDays = () => {
  const { days, loading, createDay, updateDay, deleteDay } = useCourseDays();
  const [isOpen, setIsOpen] = useState(false);
  const [editingDay, setEditingDay] = useState<CourseDay | null>(null);
  const [formData, setFormData] = useState({
    day_number: 1,
    title_ar: '',
    title_en: '',
    description_ar: '',
    description_en: '',
    badge_ar: '',
    badge_en: '',
    duration: '4 ساعات',
    topics_ar: '',
    topics_en: '',
    techniques_ar: '',
    techniques_en: '',
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      day_number: days.length + 1,
      title_ar: '', title_en: '',
      description_ar: '', description_en: '',
      badge_ar: '', badge_en: '',
      duration: '4 ساعات',
      topics_ar: '', topics_en: '',
      techniques_ar: '', techniques_en: '',
      is_active: true,
    });
    setEditingDay(null);
  };

  const openEditDialog = (day: CourseDay) => {
    setEditingDay(day);
    setFormData({
      day_number: day.day_number,
      title_ar: day.title_ar,
      title_en: day.title_en,
      description_ar: day.description_ar,
      description_en: day.description_en,
      badge_ar: day.badge_ar || '',
      badge_en: day.badge_en || '',
      duration: day.duration || '4 ساعات',
      topics_ar: day.topics_ar.join('\n'),
      topics_en: day.topics_en.join('\n'),
      techniques_ar: day.techniques_ar.join('\n'),
      techniques_en: day.techniques_en.join('\n'),
      is_active: day.is_active,
    });
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const dayData = {
        day_number: formData.day_number,
        title_ar: formData.title_ar,
        title_en: formData.title_en,
        description_ar: formData.description_ar,
        description_en: formData.description_en,
        badge_ar: formData.badge_ar || null,
        badge_en: formData.badge_en || null,
        duration: formData.duration,
        topics_ar: formData.topics_ar.split('\n').filter(t => t.trim()),
        topics_en: formData.topics_en.split('\n').filter(t => t.trim()),
        techniques_ar: formData.techniques_ar.split('\n').filter(t => t.trim()),
        techniques_en: formData.techniques_en.split('\n').filter(t => t.trim()),
        is_active: formData.is_active,
      };

      if (editingDay) {
        await updateDay(editingDay.id, dayData);
        toast.success('تم تحديث اليوم بنجاح');
      } else {
        await createDay(dayData);
        toast.success('تم إضافة اليوم بنجاح');
      }
      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast.error('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDay(id);
      toast.success('تم حذف اليوم بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              إدارة أيام الدورة
            </CardTitle>
            <CardDescription>إضافة وتعديل وحذف أيام الدورة</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                إضافة يوم
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingDay ? 'تعديل اليوم' : 'إضافة يوم جديد'}</DialogTitle>
                <DialogDescription>أدخل بيانات اليوم بالعربية والإنجليزية</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>رقم اليوم</Label><Input type="number" value={formData.day_number} onChange={e => setFormData({...formData, day_number: Number(e.target.value)})} /></div>
                  <div><Label>المدة</Label><Input value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>العنوان (عربي)</Label><Input value={formData.title_ar} onChange={e => setFormData({...formData, title_ar: e.target.value})} /></div>
                  <div><Label>العنوان (إنجليزي)</Label><Input value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>الوصف (عربي)</Label><Textarea value={formData.description_ar} onChange={e => setFormData({...formData, description_ar: e.target.value})} /></div>
                  <div><Label>الوصف (إنجليزي)</Label><Textarea value={formData.description_en} onChange={e => setFormData({...formData, description_en: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>الشارة (عربي)</Label><Input value={formData.badge_ar} onChange={e => setFormData({...formData, badge_ar: e.target.value})} /></div>
                  <div><Label>الشارة (إنجليزي)</Label><Input value={formData.badge_en} onChange={e => setFormData({...formData, badge_en: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>المواضيع (عربي - سطر لكل موضوع)</Label><Textarea rows={5} value={formData.topics_ar} onChange={e => setFormData({...formData, topics_ar: e.target.value})} /></div>
                  <div><Label>المواضيع (إنجليزي - سطر لكل موضوع)</Label><Textarea rows={5} value={formData.topics_en} onChange={e => setFormData({...formData, topics_en: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>التقنيات (عربي - سطر لكل تقنية)</Label><Textarea rows={5} value={formData.techniques_ar} onChange={e => setFormData({...formData, techniques_ar: e.target.value})} /></div>
                  <div><Label>التقنيات (إنجليزي - سطر لكل تقنية)</Label><Textarea rows={5} value={formData.techniques_en} onChange={e => setFormData({...formData, techniques_en: e.target.value})} /></div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={formData.is_active} onCheckedChange={checked => setFormData({...formData, is_active: checked})} />
                  <Label>مفعّل</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>إلغاء</Button>
                <Button onClick={handleSubmit}>حفظ</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اليوم</TableHead>
              <TableHead>العنوان</TableHead>
              <TableHead>المدة</TableHead>
              <TableHead>المواضيع</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {days.map((day) => (
              <TableRow key={day.id}>
                <TableCell className="font-bold">اليوم {day.day_number}</TableCell>
                <TableCell>{day.title_ar}</TableCell>
                <TableCell>{day.duration}</TableCell>
                <TableCell>{day.topics_ar.length} موضوع</TableCell>
                <TableCell>
                  <Badge variant={day.is_active ? "default" : "secondary"}>
                    {day.is_active ? 'مفعّل' : 'معطّل'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(day)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>حذف اليوم</AlertDialogTitle>
                          <AlertDialogDescription>هل تريد حذف اليوم {day.day_number}؟</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(day.id)} className="bg-red-600">حذف</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminCourseDays;
