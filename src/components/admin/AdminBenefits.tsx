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
import { Star, Plus, Pencil, Trash2 } from "lucide-react";
import { useBenefits, Benefit } from "@/hooks/useBenefits";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

const ICON_OPTIONS = ['Clock', 'Award', 'FileText', 'Target', 'Users', 'GraduationCap', 'Zap', 'CheckCircle', 'Star', 'Heart'];

const AdminBenefits = () => {
  const { benefits, loading, createBenefit, updateBenefit, deleteBenefit } = useBenefits();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Benefit | null>(null);
  const [formData, setFormData] = useState({
    title_ar: '', title_en: '',
    description_ar: '', description_en: '',
    icon_name: 'Star',
    is_active: true,
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({
      title_ar: '', title_en: '',
      description_ar: '', description_en: '',
      icon_name: 'Star',
      is_active: true,
      display_order: benefits.length,
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: Benefit) => {
    setEditingItem(item);
    setFormData({
      title_ar: item.title_ar, title_en: item.title_en,
      description_ar: item.description_ar, description_en: item.description_en,
      icon_name: item.icon_name,
      is_active: item.is_active,
      display_order: item.display_order,
    });
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await updateBenefit(editingItem.id, formData);
        toast.success('تم تحديث الميزة بنجاح');
      } else {
        await createBenefit(formData);
        toast.success('تم إضافة الميزة بنجاح');
      }
      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast.error('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBenefit(id);
      toast.success('تم حذف الميزة بنجاح');
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
              <Star className="h-5 w-5" />
              إدارة المزايا
            </CardTitle>
            <CardDescription>إضافة وتعديل مزايا الدورة</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                إضافة ميزة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'تعديل الميزة' : 'إضافة ميزة جديدة'}</DialogTitle>
                <DialogDescription>أدخل بيانات الميزة بالعربية والإنجليزية</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>العنوان (عربي)</Label><Input value={formData.title_ar} onChange={e => setFormData({...formData, title_ar: e.target.value})} /></div>
                  <div><Label>العنوان (إنجليزي)</Label><Input value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>الوصف (عربي)</Label><Textarea rows={3} value={formData.description_ar} onChange={e => setFormData({...formData, description_ar: e.target.value})} /></div>
                  <div><Label>الوصف (إنجليزي)</Label><Textarea rows={3} value={formData.description_en} onChange={e => setFormData({...formData, description_en: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>الأيقونة</Label>
                    <select 
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      value={formData.icon_name} 
                      onChange={e => setFormData({...formData, icon_name: e.target.value})}
                    >
                      {ICON_OPTIONS.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
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
              <TableHead>العنوان</TableHead>
              <TableHead>الأيقونة</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {benefits.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.display_order}</TableCell>
                <TableCell className="font-medium">{item.title_ar}</TableCell>
                <TableCell><Badge variant="outline">{item.icon_name}</Badge></TableCell>
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
                          <AlertDialogTitle>حذف الميزة</AlertDialogTitle>
                          <AlertDialogDescription>هل تريد حذف ميزة {item.title_ar}؟</AlertDialogDescription>
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

export default AdminBenefits;
