import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Save } from "lucide-react";
import { useCourseSettings } from "@/hooks/useCourseSettings";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

const AdminCourseSettings = () => {
  const { settings, loading, updateSetting, fetchSettings } = useCourseSettings();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings.length > 0) {
      const data: Record<string, string> = {};
      settings.forEach(s => {
        data[s.setting_key] = s.setting_value;
      });
      setFormData(data);
    }
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(formData)) {
        const original = settings.find(s => s.setting_key === key);
        if (original && original.setting_value !== value) {
          await updateSetting(key, value);
        }
      }
      toast.success('تم حفظ الإعدادات بنجاح');
      fetchSettings();
    } catch (error) {
      toast.error('حدث خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>;
  }

  const settingGroups = {
    'معلومات الدورة': ['course_start_date', 'course_duration_days', 'hours_per_day', 'course_location'],
    'الأسعار': ['current_price', 'original_price', 'currency'],
    'التسجيل': ['available_seats', 'show_seat_counter', 'registration_open'],
    'التواصل': ['whatsapp_number', 'contact_email'],
  };

  const settingLabels: Record<string, string> = {
    course_start_date: 'تاريخ البدء',
    course_duration_days: 'مدة الدورة (بالأيام)',
    hours_per_day: 'عدد الساعات في اليوم',
    course_location: 'مكان الدورة',
    current_price: 'السعر الحالي',
    original_price: 'السعر الأصلي',
    currency: 'العملة',
    available_seats: 'المقاعد المتاحة',
    show_seat_counter: 'عرض عداد المقاعد',
    registration_open: 'التسجيل مفتوح',
    whatsapp_number: 'رقم الواتساب',
    contact_email: 'البريد الإلكتروني',
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              إعدادات الدورة
            </CardTitle>
            <CardDescription>تعديل إعدادات الدورة والأسعار والتسجيل</CardDescription>
          </div>
          <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8">
          {Object.entries(settingGroups).map(([groupName, keys]) => (
            <div key={groupName} className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">{groupName}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keys.map(key => {
                  const setting = settings.find(s => s.setting_key === key);
                  if (!setting) return null;
                  
                  const isBoolean = setting.setting_type === 'boolean';
                  
                  return (
                    <div key={key} className="space-y-2">
                      <Label>{settingLabels[key] || key}</Label>
                      {isBoolean ? (
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={formData[key] === 'true'}
                            onCheckedChange={checked => setFormData({...formData, [key]: checked ? 'true' : 'false'})}
                          />
                          <span className="text-sm text-muted-foreground">
                            {formData[key] === 'true' ? 'مفعّل' : 'معطّل'}
                          </span>
                        </div>
                      ) : (
                        <Input
                          type={setting.setting_type === 'number' ? 'number' : setting.setting_type === 'date' ? 'date' : 'text'}
                          value={formData[key] || ''}
                          onChange={e => setFormData({...formData, [key]: e.target.value})}
                        />
                      )}
                      {setting.description && (
                        <p className="text-xs text-muted-foreground">{setting.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminCourseSettings;
