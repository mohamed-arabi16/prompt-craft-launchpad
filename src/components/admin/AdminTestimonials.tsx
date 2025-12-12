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
import { MessageSquare, Plus, Pencil, Trash2, Star } from "lucide-react";
import { useTestimonials, Testimonial } from "@/hooks/useTestimonials";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

const AdminTestimonials = () => {
  const { testimonials, loading, createTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name_ar: '', name_en: '',
    role_ar: '', role_en: '',
    content_ar: '', content_en: '',
    rating: 5,
    is_active: true,
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({
      name_ar: '', name_en: '',
      role_ar: '', role_en: '',
      content_ar: '', content_en: '',
      rating: 5, is_active: true,
      display_order: testimonials.length,
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({
      name_ar: item.name_ar, name_en: item.name_en,
      role_ar: item.role_ar, role_en: item.role_en,
      content_ar: item.content_ar, content_en: item.content_en,
      rating: item.rating, is_active: item.is_active,
      display_order: item.display_order,
    });
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await updateTestimonial(editingItem.id, formData);
        toast.success('تم تحديث الرأي بنجاح');
      } else {
        await createTestimonial(formData);
        toast.success('تم إضافة الرأي بنجاح');
      }
      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast.error('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTestimonial(id);
      toast.success('تم حذف الرأي بنجاح');
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
              <MessageSquare className="h-5 w-5" />
              إدارة آراء المشاركين
            </CardTitle>
            <CardDescription>إضافة وتعديل آراء المشاركين في الدورة</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                إضافة رأي
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'تعديل الرأي' : 'إضافة رأي جديد'}</DialogTitle>
                <DialogDescription>أدخل بيانات الرأي بالعربية والإنجليزية</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>الاسم (عربي)</Label><Input value={formData.name_ar} onChange={e => setFormData({...formData, name_ar: e.target.value})} /></div>
                  <div><Label>الاسم (إنجليزي)</Label><Input value={formData.name_en} onChange={e => setFormData({...formData, name_en: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>الدور (عربي)</Label><Input value={formData.role_ar} onChange={e => setFormData({...formData, role_ar: e.target.value})} /></div>
                  <div><Label>الدور (إنجليزي)</Label><Input value={formData.role_en} onChange={e => setFormData({...formData, role_en: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>المحتوى (عربي)</Label><Textarea rows={4} value={formData.content_ar} onChange={e => setFormData({...formData, content_ar: e.target.value})} /></div>
                  <div><Label>المحتوى (إنجليزي)</Label><Textarea rows={4} value={formData.content_en} onChange={e => setFormData({...formData, content_en: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>التقييم (1-5)</Label><Input type="number" min={1} max={5} value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} /></div>
                  <div><Label>الترتيب</Label><Input type="number" value={formData.display_order} onChange={e => setFormData({...formData, display_order: Number(e.target.value)})} /></div>
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
              <TableHead>الاسم</TableHead>
              <TableHead>الدور</TableHead>
              <TableHead>التقييم</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name_ar}</TableCell>
                <TableCell>{item.role_ar}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </TableCell>
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
                          <AlertDialogTitle>حذف الرأي</AlertDialogTitle>
                          <AlertDialogDescription>هل تريد حذف رأي {item.name_ar}؟</AlertDialogDescription>
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

export default AdminTestimonials;
