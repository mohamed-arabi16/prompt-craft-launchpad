import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FileText, Plus, Pencil, Trash2 } from "lucide-react";
import { useSiteContent, SiteContent } from "@/hooks/useSiteContent";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

const SECTION_OPTIONS = [
  'hero',
  'philosophy',
  'cta',
  'target_audience',
  'day5_outcome',
  'benefits',
  'testimonials',
  'footer',
  'faq',
  'general'
];

// Human-readable section names for display
const SECTION_LABELS: Record<string, string> = {
  hero: 'الصفحة الرئيسية (Hero)',
  philosophy: 'كيف تعمل الدورة (Philosophy)',
  cta: 'التسجيل والأسعار (CTA)',
  target_audience: 'لمن هذه الدورة (Target Audience)',
  day5_outcome: 'مخرجات اليوم الخامس (Day 5 Outcome)',
  benefits: 'الفوائد (Benefits)',
  testimonials: 'آراء المشاركين (Testimonials)',
  footer: 'التذييل (Footer)',
  faq: 'الأسئلة الشائعة (FAQ)',
  general: 'عام (General)'
};

const AdminSiteContent = () => {
  const { content, loading, createContent, updateContent, deleteContent } = useSiteContent();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SiteContent | null>(null);
  const [formData, setFormData] = useState({
    section: 'hero',
    content_key: '',
    content_ar: '',
    content_en: '',
  });

  const resetForm = () => {
    setFormData({
      section: 'hero',
      content_key: '',
      content_ar: '',
      content_en: '',
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: SiteContent) => {
    setEditingItem(item);
    setFormData({
      section: item.section,
      content_key: item.content_key,
      content_ar: item.content_ar,
      content_en: item.content_en,
    });
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await updateContent(editingItem.id, {
          content_ar: formData.content_ar,
          content_en: formData.content_en,
        });
        toast.success('تم تحديث المحتوى بنجاح');
      } else {
        await createContent(formData);
        toast.success('تم إضافة المحتوى بنجاح');
      }
      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast.error('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContent(id);
      toast.success('تم حذف المحتوى بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, SiteContent[]>);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              إدارة محتوى الموقع
            </CardTitle>
            <CardDescription>تعديل النصوص والمحتوى في الموقع</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                إضافة محتوى
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'تعديل المحتوى' : 'إضافة محتوى جديد'}</DialogTitle>
                <DialogDescription>أدخل المحتوى بالعربية والإنجليزية</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {!editingItem && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>القسم</Label>
                      <select 
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        value={formData.section} 
                        onChange={e => setFormData({...formData, section: e.target.value})}
                      >
                        {SECTION_OPTIONS.map(section => (
                          <option key={section} value={section}>{SECTION_LABELS[section] || section}</option>
                        ))}
                      </select>
                    </div>
                    <div><Label>المفتاح</Label><Input value={formData.content_key} onChange={e => setFormData({...formData, content_key: e.target.value})} placeholder="مثال: title, subtitle" /></div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>المحتوى (عربي)</Label><Textarea rows={4} value={formData.content_ar} onChange={e => setFormData({...formData, content_ar: e.target.value})} /></div>
                  <div><Label>المحتوى (إنجليزي)</Label><Textarea rows={4} value={formData.content_en} onChange={e => setFormData({...formData, content_en: e.target.value})} /></div>
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
        {Object.entries(groupedContent).map(([section, items]) => (
          <div key={section} className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Badge variant="outline" className="text-sm">{SECTION_LABELS[section] || section}</Badge>
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المفتاح</TableHead>
                  <TableHead>المحتوى (عربي)</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.content_key}</TableCell>
                    <TableCell className="max-w-md truncate">{item.content_ar}</TableCell>
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
                              <AlertDialogTitle>حذف المحتوى</AlertDialogTitle>
                              <AlertDialogDescription>هل تريد حذف {item.content_key}؟</AlertDialogDescription>
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
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AdminSiteContent;
