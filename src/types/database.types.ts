export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_users: {
        Row: {
          company_id: string | null
          created_at: string | null
          created_by: string | null
          email: string
          id: string
          is_active: boolean | null
          provider_id: string | null
          token: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          provider_id?: string | null
          token?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          provider_id?: string | null
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_users_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_users_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_occasions: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_occasions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_tags: {
        Row: {
          booking_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          tag_id: string | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          tag_id?: string | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          tag_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_tags_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          arrived_guests: number | null
          booking_occasion: string | null
          booking_reference: string
          booking_seated_date: string
          booking_seated_time: string
          booking_source: string
          booking_status: string
          booking_type: string
          company_id: string | null
          contact_id: string | null
          covers_adult: number
          covers_child: number
          created: string | null
          datetime_of_slot: string
          deleted: string | null
          deposit_amount_required: number | null
          deposit_paid: number | null
          deposit_required: boolean | null
          duration: number | null
          external_reference: string | null
          id: string
          left_time: string | null
          location_group_id: string | null
          location_id: string | null
          notes: string | null
          outstanding_balance: number | null
          pos_tickets: Json | null
          seated_time: string | null
          special_requests: string | null
          table_ids: string[] | null
          tags: string[] | null
          time_slot_iso: string
          total_gross_payment: number | null
          total_net_payment: number | null
          total_payment: number | null
          updated: string | null
        }
        Insert: {
          arrived_guests?: number | null
          booking_occasion?: string | null
          booking_reference: string
          booking_seated_date: string
          booking_seated_time: string
          booking_source: string
          booking_status: string
          booking_type: string
          company_id?: string | null
          contact_id?: string | null
          covers_adult?: number
          covers_child?: number
          created?: string | null
          datetime_of_slot: string
          deleted?: string | null
          deposit_amount_required?: number | null
          deposit_paid?: number | null
          deposit_required?: boolean | null
          duration?: number | null
          external_reference?: string | null
          id?: string
          left_time?: string | null
          location_group_id?: string | null
          location_id?: string | null
          notes?: string | null
          outstanding_balance?: number | null
          pos_tickets?: Json | null
          seated_time?: string | null
          special_requests?: string | null
          table_ids?: string[] | null
          tags?: string[] | null
          time_slot_iso: string
          total_gross_payment?: number | null
          total_net_payment?: number | null
          total_payment?: number | null
          updated?: string | null
        }
        Update: {
          arrived_guests?: number | null
          booking_occasion?: string | null
          booking_reference?: string
          booking_seated_date?: string
          booking_seated_time?: string
          booking_source?: string
          booking_status?: string
          booking_type?: string
          company_id?: string | null
          contact_id?: string | null
          covers_adult?: number
          covers_child?: number
          created?: string | null
          datetime_of_slot?: string
          deleted?: string | null
          deposit_amount_required?: number | null
          deposit_paid?: number | null
          deposit_required?: boolean | null
          duration?: number | null
          external_reference?: string | null
          id?: string
          left_time?: string | null
          location_group_id?: string | null
          location_id?: string | null
          notes?: string | null
          outstanding_balance?: number | null
          pos_tickets?: Json | null
          seated_time?: string | null
          special_requests?: string | null
          table_ids?: string[] | null
          tags?: string[] | null
          time_slot_iso?: string
          total_gross_payment?: number | null
          total_net_payment?: number | null
          total_payment?: number | null
          updated?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_location_group_id_fkey"
            columns: ["location_group_id"]
            isOneToOne: false
            referencedRelation: "venue_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address_1: string
          address_2: string | null
          city: string
          country: string
          created_at: string | null
          id: string
          name: string
          postcode: string
          promo_code: string | null
          website: string | null
        }
        Insert: {
          address_1: string
          address_2?: string | null
          city: string
          country: string
          created_at?: string | null
          id?: string
          name: string
          postcode: string
          promo_code?: string | null
          website?: string | null
        }
        Update: {
          address_1?: string
          address_2?: string | null
          city?: string
          country?: string
          created_at?: string | null
          id?: string
          name?: string
          postcode?: string
          promo_code?: string | null
          website?: string | null
        }
        Relationships: []
      }
      company_settings: {
        Row: {
          company_id: string | null
          created_at: string | null
          currency_code: string
          id: string
          modified_at: string | null
          modified_by: string | null
          timezone: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          currency_code?: string
          id?: string
          modified_at?: string | null
          modified_by?: string | null
          timezone?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          currency_code?: string
          id?: string
          modified_at?: string | null
          modified_by?: string | null
          timezone?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_users: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          role: string
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_users_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_tags: {
        Row: {
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          tag_id: string | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          tag_id?: string | null
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          tag_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_tags_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          birthday_day: number | null
          birthday_month: number | null
          city: string | null
          company_id: string | null
          company_name: string | null
          contact_source: string | null
          country: string | null
          created_at: string | null
          email: string
          email_consent: boolean | null
          email_consent_timestamp: string | null
          first_name: string
          id: string
          is_active: boolean | null
          is_test_profile: boolean | null
          last_contact_date: string | null
          last_name: string
          mobile: string
          modified_at: string | null
          notes: string | null
          postal_code: string | null
          preferred_contact_method: string | null
          sms_consent: boolean | null
          sms_consent_timestamp: string | null
          state: string | null
          street_address: string | null
        }
        Insert: {
          birthday_day?: number | null
          birthday_month?: number | null
          city?: string | null
          company_id?: string | null
          company_name?: string | null
          contact_source?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          email_consent?: boolean | null
          email_consent_timestamp?: string | null
          first_name: string
          id?: string
          is_active?: boolean | null
          is_test_profile?: boolean | null
          last_contact_date?: string | null
          last_name: string
          mobile: string
          modified_at?: string | null
          notes?: string | null
          postal_code?: string | null
          preferred_contact_method?: string | null
          sms_consent?: boolean | null
          sms_consent_timestamp?: string | null
          state?: string | null
          street_address?: string | null
        }
        Update: {
          birthday_day?: number | null
          birthday_month?: number | null
          city?: string | null
          company_id?: string | null
          company_name?: string | null
          contact_source?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          email_consent?: boolean | null
          email_consent_timestamp?: string | null
          first_name?: string
          id?: string
          is_active?: boolean | null
          is_test_profile?: boolean | null
          last_contact_date?: string | null
          last_name?: string
          mobile?: string
          modified_at?: string | null
          notes?: string | null
          postal_code?: string | null
          preferred_contact_method?: string | null
          sms_consent?: boolean | null
          sms_consent_timestamp?: string | null
          state?: string | null
          street_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          booking_id: string | null
          company_id: string | null
          error_message: string | null
          id: string
          recipient: string
          sent_at: string | null
          status: string
          subject: string
          template_id: string | null
        }
        Insert: {
          booking_id?: string | null
          company_id?: string | null
          error_message?: string | null
          id?: string
          recipient: string
          sent_at?: string | null
          status: string
          subject: string
          template_id?: string | null
        }
        Update: {
          booking_id?: string | null
          company_id?: string | null
          error_message?: string | null
          id?: string
          recipient?: string
          sent_at?: string | null
          status?: string
          subject?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_logs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_template_versions: {
        Row: {
          created_at: string | null
          created_by: string | null
          html_content: string
          id: string
          is_active: boolean | null
          subject: string
          template_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          html_content: string
          id?: string
          is_active?: boolean | null
          subject: string
          template_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          html_content?: string
          id?: string
          is_active?: boolean | null
          subject?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_template_versions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          code: string
          company_id: string | null
          created_at: string | null
          created_by: string | null
          html_content: string
          id: string
          is_enabled: boolean | null
          modified_at: string | null
          modified_by: string | null
          name: string
          subject: string
        }
        Insert: {
          code: string
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          html_content: string
          id?: string
          is_enabled?: boolean | null
          modified_at?: string | null
          modified_by?: string | null
          name: string
          subject: string
        }
        Update: {
          code?: string
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          html_content?: string
          id?: string
          is_enabled?: boolean | null
          modified_at?: string | null
          modified_by?: string | null
          name?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_templates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      location_photos: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          location_id: string | null
          sort_order: number | null
          url: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          location_id?: string | null
          sort_order?: number | null
          url: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          location_id?: string | null
          sort_order?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_photos_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address_line1: string
          address_line2: string | null
          city: string
          client_reference: string
          company_id: string | null
          country: string
          created_at: string | null
          created_by: string | null
          currency_code: string
          id: string
          internal_name: string
          is_active: boolean | null
          latitude: number | null
          longitude: number | null
          modified_at: string | null
          modified_by: string | null
          phone: string
          postal_code: string
          public_name: string
          reservation_url: string | null
          state: string
          venue_group: string | null
          venue_group_id: string | null
          venue_type: string
          website_url: string | null
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          city: string
          client_reference: string
          company_id?: string | null
          country: string
          created_at?: string | null
          created_by?: string | null
          currency_code: string
          id?: string
          internal_name: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          modified_at?: string | null
          modified_by?: string | null
          phone: string
          postal_code: string
          public_name: string
          reservation_url?: string | null
          state: string
          venue_group?: string | null
          venue_group_id?: string | null
          venue_type: string
          website_url?: string | null
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          city?: string
          client_reference?: string
          company_id?: string | null
          country?: string
          created_at?: string | null
          created_by?: string | null
          currency_code?: string
          id?: string
          internal_name?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          modified_at?: string | null
          modified_by?: string | null
          phone?: string
          postal_code?: string
          public_name?: string
          reservation_url?: string | null
          state?: string
          venue_group?: string | null
          venue_group_id?: string | null
          venue_type?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locations_venue_group_id_fkey"
            columns: ["venue_group_id"]
            isOneToOne: false
            referencedRelation: "venue_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string
          id: string
          last_name: string
          mobile: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name: string
          id: string
          last_name: string
          mobile: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          mobile?: string
        }
        Relationships: []
      }
      providers: {
        Row: {
          code: string
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          action_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          role_id: string | null
        }
        Insert: {
          action_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          role_id?: string | null
        }
        Update: {
          action_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_action_id_fkey"
            columns: ["action_id"]
            isOneToOne: false
            referencedRelation: "system_actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          company_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_system: boolean | null
          modified_at: string | null
          modified_by: string | null
          name: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_system?: boolean | null
          modified_at?: string | null
          modified_by?: string | null
          name: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_system?: boolean | null
          modified_at?: string | null
          modified_by?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      system_actions: {
        Row: {
          category: string
          code: string
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      tables: {
        Row: {
          capacity: number
          company_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          location: string | null
          name: string
        }
        Insert: {
          capacity: number
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          name: string
        }
        Update: {
          capacity?: number
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tables_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          category: string
          color: string
          company_id: string | null
          created_at: string | null
          created_by: string | null
          icon: string
          id: string
          modified_at: string | null
          modified_by: string | null
          name: string
          sort_order: number | null
        }
        Insert: {
          category: string
          color: string
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          icon: string
          id?: string
          modified_at?: string | null
          modified_by?: string | null
          name: string
          sort_order?: number | null
        }
        Update: {
          category?: string
          color?: string
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          icon?: string
          id?: string
          modified_at?: string | null
          modified_by?: string | null
          name?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tags_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_invitations: {
        Row: {
          company_id: string | null
          created_at: string | null
          created_by: string | null
          email: string
          expires_at: string
          first_name: string
          id: string
          last_name: string
          mobile: string
          role_id: string | null
          status: string
          token: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          email: string
          expires_at?: string
          first_name: string
          id?: string
          last_name: string
          mobile: string
          role_id?: string | null
          status?: string
          token: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string
          expires_at?: string
          first_name?: string
          id?: string
          last_name?: string
          mobile?: string
          role_id?: string | null
          status?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_invitations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      venue_groups: {
        Row: {
          company_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          modified_at: string | null
          modified_by: string | null
          name: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          modified_at?: string | null
          modified_by?: string | null
          name: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          modified_at?: string | null
          modified_by?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "venue_groups_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_invitations: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_booking_with_contact: {
        Args: {
          p_company_id: string
          p_first_name: string
          p_last_name: string
          p_email: string
          p_mobile: string
          p_location_id: string
          p_booking_source: string
          p_booking_type: string
          p_booking_seated_date: string
          p_booking_seated_time: string
          p_covers_adult: number
          p_birthday_month?: number
          p_birthday_day?: number
          p_street_address?: string
          p_city?: string
          p_state?: string
          p_postal_code?: string
          p_country?: string
          p_email_consent?: boolean
          p_sms_consent?: boolean
          p_booking_occasion?: string
          p_covers_child?: number
          p_duration?: number
          p_special_requests?: string
          p_notes?: string
        }
        Returns: Json
      }
      format_booking_datetime: {
        Args: {
          p_date: string
          p_time: string
        }
        Returns: string
      }
      generate_booking_reference: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_booking_with_tags: {
        Args: {
          booking_id: string
        }
        Returns: Json
      }
      get_paginated_contacts: {
        Args: {
          p_company_id: string
          p_cursor?: string
          p_limit?: number
          p_search?: string
          p_is_active?: boolean
          p_source?: string
          p_contact_method?: string
        }
        Returns: {
          id: string
          first_name: string
          last_name: string
          email: string
          mobile: string
          company_name: string
          contact_source: string
          last_contact_date: string
          is_active: boolean
          next_cursor: string
          total_count: number
        }[]
      }
      get_paginated_contacts_v2: {
        Args: {
          p_company_id: string
          p_limit?: number
          p_cursor?: string
          p_sort_by?: string
          p_sort_direction?: string
          p_search?: string
          p_is_active?: boolean
          p_source?: string
          p_contact_method?: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
