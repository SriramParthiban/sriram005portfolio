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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string
          booking_time: string
          created_at: string
          duration: number
          email: string
          id: string
          message: string | null
          name: string
          status: string
        }
        Insert: {
          booking_date: string
          booking_time: string
          created_at?: string
          duration?: number
          email: string
          id?: string
          message?: string | null
          name: string
          status?: string
        }
        Update: {
          booking_date?: string
          booking_time?: string
          created_at?: string
          duration?: number
          email?: string
          id?: string
          message?: string | null
          name?: string
          status?: string
        }
        Relationships: []
      }
      budget_transactions: {
        Row: {
          amount: number
          category: string
          created_at: string
          currency: string
          id: string
          note: string | null
          transaction_date: string
          type: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          currency?: string
          id?: string
          note?: string | null
          transaction_date?: string
          type: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          currency?: string
          id?: string
          note?: string | null
          transaction_date?: string
          type?: string
        }
        Relationships: []
      }
      chat_leads: {
        Row: {
          ai_response_summary: string | null
          created_at: string
          email: string | null
          full_conversation: Json | null
          id: string
          name: string | null
          phone: string | null
          summary: string | null
          tag: string | null
        }
        Insert: {
          ai_response_summary?: string | null
          created_at?: string
          email?: string | null
          full_conversation?: Json | null
          id?: string
          name?: string | null
          phone?: string | null
          summary?: string | null
          tag?: string | null
        }
        Update: {
          ai_response_summary?: string | null
          created_at?: string
          email?: string | null
          full_conversation?: Json | null
          id?: string
          name?: string | null
          phone?: string | null
          summary?: string | null
          tag?: string | null
        }
        Relationships: []
      }
      content_plans: {
        Row: {
          call_to_action: string | null
          content: string | null
          content_angle: string | null
          created_at: string
          hashtags: Json
          hook: string | null
          id: string
          key_insight: string | null
          keywords: Json
          main_idea: string | null
          notes: string | null
          platform: string | null
          post_idea: string
          posting_day: string | null
          subject: string | null
          tone: string | null
        }
        Insert: {
          call_to_action?: string | null
          content?: string | null
          content_angle?: string | null
          created_at?: string
          hashtags?: Json
          hook?: string | null
          id?: string
          key_insight?: string | null
          keywords?: Json
          main_idea?: string | null
          notes?: string | null
          platform?: string | null
          post_idea: string
          posting_day?: string | null
          subject?: string | null
          tone?: string | null
        }
        Update: {
          call_to_action?: string | null
          content?: string | null
          content_angle?: string | null
          created_at?: string
          hashtags?: Json
          hook?: string | null
          id?: string
          key_insight?: string | null
          keywords?: Json
          main_idea?: string | null
          notes?: string | null
          platform?: string | null
          post_idea?: string
          posting_day?: string | null
          subject?: string | null
          tone?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          client_address: string | null
          client_email: string | null
          client_name: string
          client_phone: string | null
          created_at: string
          currency: string
          custom_role: string | null
          due_date: string | null
          id: string
          invoice_date: string
          items: Json
          notes: string | null
          total: number
        }
        Insert: {
          client_address?: string | null
          client_email?: string | null
          client_name: string
          client_phone?: string | null
          created_at?: string
          currency?: string
          custom_role?: string | null
          due_date?: string | null
          id?: string
          invoice_date: string
          items?: Json
          notes?: string | null
          total?: number
        }
        Update: {
          client_address?: string | null
          client_email?: string | null
          client_name?: string
          client_phone?: string | null
          created_at?: string
          currency?: string
          custom_role?: string | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          items?: Json
          notes?: string | null
          total?: number
        }
        Relationships: []
      }
      page_views: {
        Row: {
          created_at: string
          id: string
          page: string
          referrer: string | null
          session_id: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          page: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          page?: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      personal_tasks: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      savings_goals: {
        Row: {
          created_at: string
          currency: string
          deadline: string | null
          id: string
          notes: string | null
          saved_amount: number
          status: string
          target_amount: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          deadline?: string | null
          id?: string
          notes?: string | null
          saved_amount?: number
          status?: string
          target_amount: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          deadline?: string | null
          id?: string
          notes?: string | null
          saved_amount?: number
          status?: string
          target_amount?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      time_entries: {
        Row: {
          billable: boolean
          client: string | null
          created_at: string
          description: string | null
          duration_minutes: number
          entry_date: string
          hourly_rate: number | null
          id: string
          project: string
        }
        Insert: {
          billable?: boolean
          client?: string | null
          created_at?: string
          description?: string | null
          duration_minutes: number
          entry_date?: string
          hourly_rate?: number | null
          id?: string
          project: string
        }
        Update: {
          billable?: boolean
          client?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          entry_date?: string
          hourly_rate?: number | null
          id?: string
          project?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
