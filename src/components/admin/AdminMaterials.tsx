import { useState } from "react";
import { useAdminMaterials } from "@/hooks/useAdminMaterials";
import { useCourseDays } from "@/hooks/useCourseDays";
import type { CourseMaterial } from "@/hooks/useCourseMaterials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, FileText, Download, Lock, Unlock } from "lucide-react";
import { toast } from "sonner";

const AdminMaterials = () => {
  const { materials, loading, createMaterial, updateMaterial, deleteMaterial } = useAdminMaterials();
  const { days } = useCourseDays();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<CourseMaterial | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    title_ar: "",
    description: "",
    description_ar: "",
    file_name: "",
    file_path: "",
    file_type: "pdf",
    file_url: "",
    category: "daily",
    course_day: null as number | null,
    is_active: true,
    requires_access: true,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      title_ar: "",
      description: "",
      description_ar: "",
      file_name: "",
      file_path: "",
      file_type: "pdf",
      file_url: "",
      category: "daily",
      course_day: null,
      is_active: true,
      requires_access: true,
    });
    setEditingMaterial(null);
  };

  const handleEdit = (material: CourseMaterial) => {
    setEditingMaterial(material);
    setFormData({
      title: material.title,
      title_ar: material.title_ar || "",
      description: material.description || "",
      description_ar: material.description_ar || "",
      file_name: material.file_name,
      file_path: material.file_path,
      file_type: material.file_type,
      file_url: material.file_url || "",
      category: material.category,
      course_day: material.course_day,
      is_active: material.is_active,
      requires_access: material.requires_access,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMaterial) {
        await updateMaterial(editingMaterial.id, formData);
        toast.success("تم تحديث المادة بنجاح");
      } else {
        await createMaterial(formData);
        toast.success("تم إضافة المادة بنجاح");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه المادة؟")) {
      try {
        await deleteMaterial(id);
        toast.success("تم حذف المادة بنجاح");
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleToggleActive = async (material: CourseMaterial) => {
    try {
      await updateMaterial(material.id, { is_active: !material.is_active });
      toast.success(material.is_active ? "تم إلغاء تفعيل المادة" : "تم تفعيل المادة");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          مواد الدورة ({materials.length})
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              إضافة مادة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMaterial ? "تعديل المادة" : "إضافة مادة جديدة"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>العنوان (إنجليزي)</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>العنوان (عربي)</Label>
                  <Input
                    value={formData.title_ar}
                    onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الوصف (إنجليزي)</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>الوصف (عربي)</Label>
                  <Textarea
                    value={formData.description_ar}
                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                    dir="rtl"
                    rows={2}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>اسم الملف</Label>
                  <Input
                    value={formData.file_name}
                    onChange={(e) => setFormData({ ...formData, file_name: e.target.value })}
                    placeholder="course-guide.pdf"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>مسار الملف (في Storage)</Label>
                  <Input
                    value={formData.file_path}
                    onChange={(e) => setFormData({ ...formData, file_path: e.target.value })}
                    placeholder="course-materials/course-guide.pdf"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>نوع الملف</Label>
                  <Select
                    value={formData.file_type}
                    onValueChange={(value) => setFormData({ ...formData, file_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="doc">Word</SelectItem>
                      <SelectItem value="xlsx">Excel</SelectItem>
                      <SelectItem value="zip">ZIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>الفئة</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">ملخص يومي</SelectItem>
                      <SelectItem value="guide">دليل الدورة</SelectItem>
                      <SelectItem value="template">قالب</SelectItem>
                      <SelectItem value="resource">مورد إضافي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>اليوم (للملخصات)</Label>
                  <Select
                    value={formData.course_day?.toString() || "none"}
                    onValueChange={(value) => setFormData({ ...formData, course_day: value === "none" ? null : parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر اليوم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">بدون يوم</SelectItem>
                      {days.filter(d => d.is_active).map((day) => (
                        <SelectItem key={day.day_number} value={day.day_number.toString()}>
                          اليوم {day.day_number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>رابط الملف (اختياري - للملفات الخارجية)</Label>
                <Input
                  value={formData.file_url}
                  onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label>مفعّل</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.requires_access}
                    onCheckedChange={(checked) => setFormData({ ...formData, requires_access: checked })}
                  />
                  <Label>يتطلب صلاحية الوصول</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit">
                  {editingMaterial ? "تحديث" : "إضافة"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">العنوان</TableHead>
              <TableHead className="text-right">الفئة</TableHead>
              <TableHead className="text-right">اليوم</TableHead>
              <TableHead className="text-right">النوع</TableHead>
              <TableHead className="text-right">الوصول</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{material.title_ar || material.title}</div>
                    <div className="text-sm text-muted-foreground">{material.file_name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 text-xs rounded-full bg-muted">
                    {material.category === 'daily' && 'ملخص يومي'}
                    {material.category === 'guide' && 'دليل الدورة'}
                    {material.category === 'template' && 'قالب'}
                    {material.category === 'resource' && 'مورد إضافي'}
                  </span>
                </TableCell>
                <TableCell>
                  {material.course_day ? `اليوم ${material.course_day}` : '-'}
                </TableCell>
                <TableCell>
                  <span className="uppercase text-xs font-medium">{material.file_type}</span>
                </TableCell>
                <TableCell>
                  {material.requires_access ? (
                    <Lock className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Unlock className="h-4 w-4 text-green-500" />
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={material.is_active}
                    onCheckedChange={() => handleToggleActive(material)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(material)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(material.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {materials.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  لا توجد مواد حالياً. أضف مادة جديدة للبدء.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminMaterials;