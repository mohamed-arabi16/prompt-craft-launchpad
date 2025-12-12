import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Target, Plus, Pencil, Trash2 } from "lucide-react";
import { useTargetAudience, TargetAudienceItem } from "@/hooks/useTargetAudience";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

const ICON_OPTIONS = ['Briefcase', 'Megaphone', 'GraduationCap', 'Code', 'Users', 'Zap', 'CheckCircle', 'Target', 'Star'];

const AdminTargetAudience = () => {
  const { items, loading, createItem, updateItem, deleteItem } = useTargetAudience();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TargetAudienceItem | null>(null);
  const [formData, setFormData] = useState({
    content_ar: '', content_en: '',
    icon_name: 'CheckCircle',
    is_active: true,
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({
      content_ar: '', content_en: '',
      icon_name: 'CheckCircle',
      is_active: true,
      display_order: items.length,
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: TargetAudienceItem) => {
    setEditingItem(item);
    setFormData({
      content_ar: item.content_ar, content_en: item.content_en,
      icon_name: item.icon_name,
      is_active: item.is_active,
      display_order: item.display_order,
    });
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await updateItem(editingItem.id, formData);
        toast.success('تم تحديث العنصر بنجاح');
      } else {
        await createItem(formData);
        toast.success('تم إضافة العنصر بنجاح');
      }
      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast.error('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success('تم حذف العنصر بنجاح');
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
              <Target className="h-5 w-5" />
              إدارة الجمهور المستهدف
            </CardTitle>
            <CardDescription>إضافة وتعديل عناصر الجمهور المستهدف</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                إضافة عنصر
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingItem ? 'تعديل العنصر' : 'إضافة عنصر جديد'}</DialogTitle>
                <DialogDescription>أدخل بيانات الجمهور المستهدف</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div><Label>المحتوى (عربي)</Label><Input value={formData.content_ar} onChange={e => setFormData({...formData, content_ar: e.target.value})} /></div>
                <div><Label>المحتوى (إنجليزي)</Label><Input value={formData.content_en} onChange={e => setFormData({...formData, content_en: e.target.value})} /></div>
                <div className="grid grid-cols-2 gap-4">
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
              <TableHead>#</TableHead>
              <TableHead>المحتوى</TableHead>
              <TableHead>الأيقونة</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.display_order}</TableCell>
                <TableCell className="font-medium">{item.content_ar}</TableCell>
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
                          <AlertDialogTitle>حذف العنصر</AlertDialogTitle>
                          <AlertDialogDescription>هل تريد حذف هذا العنصر؟</AlertDialogDescription>
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

export default AdminTargetAudience;
