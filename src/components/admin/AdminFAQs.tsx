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
import { HelpCircle, Plus, Pencil, Trash2 } from "lucide-react";
import { useFAQs, FAQ } from "@/hooks/useFAQs";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

const AdminFAQs = () => {
  const { faqs, loading, createFAQ, updateFAQ, deleteFAQ } = useFAQs();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question_ar: '', question_en: '',
    answer_ar: '', answer_en: '',
    is_active: true,
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({
      question_ar: '', question_en: '',
      answer_ar: '', answer_en: '',
      is_active: true,
      display_order: faqs.length,
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: FAQ) => {
    setEditingItem(item);
    setFormData({
      question_ar: item.question_ar, question_en: item.question_en,
      answer_ar: item.answer_ar, answer_en: item.answer_en,
      is_active: item.is_active,
      display_order: item.display_order,
    });
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await updateFAQ(editingItem.id, formData);
        toast.success('تم تحديث السؤال بنجاح');
      } else {
        await createFAQ(formData);
        toast.success('تم إضافة السؤال بنجاح');
      }
      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast.error('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFAQ(id);
      toast.success('تم حذف السؤال بنجاح');
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
              <HelpCircle className="h-5 w-5" />
              إدارة الأسئلة الشائعة
            </CardTitle>
            <CardDescription>إضافة وتعديل الأسئلة الشائعة</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                إضافة سؤال
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'تعديل السؤال' : 'إضافة سؤال جديد'}</DialogTitle>
                <DialogDescription>أدخل السؤال والإجابة بالعربية والإنجليزية</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>السؤال (عربي)</Label><Textarea rows={2} value={formData.question_ar} onChange={e => setFormData({...formData, question_ar: e.target.value})} /></div>
                  <div><Label>السؤال (إنجليزي)</Label><Textarea rows={2} value={formData.question_en} onChange={e => setFormData({...formData, question_en: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>الإجابة (عربي)</Label><Textarea rows={4} value={formData.answer_ar} onChange={e => setFormData({...formData, answer_ar: e.target.value})} /></div>
                  <div><Label>الإجابة (إنجليزي)</Label><Textarea rows={4} value={formData.answer_en} onChange={e => setFormData({...formData, answer_en: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>الترتيب</Label><Input type="number" value={formData.display_order} onChange={e => setFormData({...formData, display_order: Number(e.target.value)})} /></div>
                  <div className="flex items-center gap-2 pt-6">
                    <Switch checked={formData.is_active} onCheckedChange={checked => setFormData({...formData, is_active: checked})} />
                    <Label>مفعّل</Label>
                  </div>
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
              <TableHead>#</TableHead>
              <TableHead>السؤال</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.display_order}</TableCell>
                <TableCell className="max-w-md truncate">{item.question_ar}</TableCell>
                <TableCell>
                  <Badge variant={item.is_active ? "default" : "secondary"}>
                    {item.is_active ? 'مفعّل' : 'معطّل'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(item)}>
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
                          <AlertDialogTitle>حذف السؤال</AlertDialogTitle>
                          <AlertDialogDescription>هل تريد حذف هذا السؤال؟</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-600">حذف</AlertDialogAction>
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

export default AdminFAQs;
