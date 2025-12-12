export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          status: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          status?: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          status?: string
          subject?: string | null
        }
        Relationships: []
      }
      course_access: {
        Row: {
          access_expires_at: string | null
          access_granted_at: string | null
          course_id: string
          created_at: string
          has_access: boolean
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          access_expires_at?: string | null
          access_granted_at?: string | null
          course_id?: string
          created_at?: string
          has_access?: boolean
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          access_expires_at?: string | null
          access_granted_at?: string | null
          course_id?: string
          created_at?: string
          has_access?: boolean
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      course_days: {
        Row: {
          badge_ar: string | null
          badge_en: string | null
          created_at: string
          day_number: number
          description_ar: string
          description_en: string
          duration: string | null
          id: string
          is_active: boolean
          techniques_ar: Json
          techniques_en: Json
          title_ar: string
          title_en: string
          topics_ar: Json
          topics_en: Json
          updated_at: string
        }
        Insert: {
          badge_ar?: string | null
          badge_en?: string | null
          created_at?: string
          day_number: number
          description_ar: string
          description_en: string
          duration?: string | null
          id?: string
          is_active?: boolean
          techniques_ar?: Json
          techniques_en?: Json
          title_ar: string
          title_en: string
          topics_ar?: Json
          topics_en?: Json
          updated_at?: string
        }
        Update: {
          badge_ar?: string | null
          badge_en?: string | null
          created_at?: string
          day_number?: number
          description_ar?: string
          description_en?: string
          duration?: string | null
          id?: string
          is_active?: boolean
          techniques_ar?: Json
          techniques_en?: Json
          title_ar?: string
          title_en?: string
          topics_ar?: Json
          topics_en?: Json
          updated_at?: string
        }
        Relationships: []
      }
      course_materials: {
        Row: {
          category: string
          course_day: number | null
          created_at: string
          description: string | null
          description_ar: string | null
          file_name: string
          file_path: string
          file_type: string
          file_url: string | null
          id: string
          is_active: boolean
          requires_access: boolean
          title: string
          title_ar: string | null
          updated_at: string
        }
        Insert: {
          category?: string
          course_day?: number | null
          created_at?: string
          description?: string | null
          description_ar?: string | null
          file_name: string
          file_path: string
          file_type?: string
          file_url?: string | null
          id?: string
          is_active?: boolean
          requires_access?: boolean
          title: string
          title_ar?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          course_day?: number | null
          created_at?: string
          description?: string | null
          description_ar?: string | null
          file_name?: string
          file_path?: string
          file_type?: string
          file_url?: string | null
          id?: string
          is_active?: boolean
          requires_access?: boolean
          title?: string
          title_ar?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      course_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_type: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_type?: string
          setting_value: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_type?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          ai_experience: string
          company: string | null
          created_at: string
          email: string
          enrollment_completed: boolean
          enrollment_date: string
          first_name: string
          goals: string | null
          id: string
          last_name: string
          linked_user_id: string | null
          payment_completed: boolean
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          ai_experience: string
          company?: string | null
          created_at?: string
          email: string
          enrollment_completed?: boolean
          enrollment_date?: string
          first_name: string
          goals?: string | null
          id?: string
          last_name: string
          linked_user_id?: string | null
          payment_completed?: boolean
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          ai_experience?: string
          company?: string | null
          created_at?: string
          email?: string
          enrollment_completed?: boolean
          enrollment_date?: string
          first_name?: string
          goals?: string | null
          id?: string
          last_name?: string
          linked_user_id?: string | null
          payment_completed?: boolean
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ai_experience: string | null
          company: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_experience?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_experience?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_enrollment_status: {
        Args: { p_email: string }
        Returns: {
          enrollment_completed: boolean
          enrollment_id: string
          payment_completed: boolean
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      link_enrollment_to_user: {
        Args: { p_email: string; p_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
