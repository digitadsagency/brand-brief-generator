import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          email: string
          name: string | null
          phone: string | null
          company: string | null
          website: string | null
          social: any | null
          sector: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          phone?: string | null
          company?: string | null
          website?: string | null
          social?: any | null
          sector?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          phone?: string | null
          company?: string | null
          website?: string | null
          social?: any | null
          sector?: string | null
          created_at?: string
        }
      }
      brand_onboardings: {
        Row: {
          id: string
          client_id: string
          objective: string | null
          palette: any | null
          fonts: string[] | null
          style_tags: string[] | null
          tone: string | null
          keywords: any | null
          sliders: any | null
          channels: string[] | null
          deliverables: string[] | null
          timeline: string | null
          budget_range: string | null
          notes: string | null
          files: any | null
          preview_snapshot_url: string | null
          pdf_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          objective?: string | null
          palette?: any | null
          fonts?: string[] | null
          style_tags?: string[] | null
          tone?: string | null
          keywords?: any | null
          sliders?: any | null
          channels?: string[] | null
          deliverables?: string[] | null
          timeline?: string | null
          budget_range?: string | null
          notes?: string | null
          files?: any | null
          preview_snapshot_url?: string | null
          pdf_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          objective?: string | null
          palette?: any | null
          fonts?: string[] | null
          style_tags?: string[] | null
          tone?: string | null
          keywords?: any | null
          sliders?: any | null
          channels?: string[] | null
          deliverables?: string[] | null
          timeline?: string | null
          budget_range?: string | null
          notes?: string | null
          files?: any | null
          preview_snapshot_url?: string | null
          pdf_url?: string | null
          created_at?: string
        }
      }
    }
  }
}