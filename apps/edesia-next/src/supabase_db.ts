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
      booking: {
        Row: {
          BookingsID: string | null
          budget: string | null
          city: string | null
          date: string | null
          description: string | null
          email: string | null
          endTime: string | null
          id: string | null
          interested: string | null
          locationAddress: string | null
          mobileOrdering: string | null
          multipleTrucks: string | null
          name: string | null
          paying: string | null
          phoneNumber: string | null
          service: string | null
          startTime: string | null
          zipcode: number | null
        }
        Insert: {
          BookingsID?: string | null
          budget?: string | null
          city?: string | null
          date?: string | null
          description?: string | null
          email?: string | null
          endTime?: string | null
          id?: string | null
          interested?: string | null
          locationAddress?: string | null
          mobileOrdering?: string | null
          multipleTrucks?: string | null
          name?: string | null
          paying?: string | null
          phoneNumber?: string | null
          service?: string | null
          startTime?: string | null
          zipcode?: number | null
        }
        Update: {
          BookingsID?: string | null
          budget?: string | null
          city?: string | null
          date?: string | null
          description?: string | null
          email?: string | null
          endTime?: string | null
          id?: string | null
          interested?: string | null
          locationAddress?: string | null
          mobileOrdering?: string | null
          multipleTrucks?: string | null
          name?: string | null
          paying?: string | null
          phoneNumber?: string | null
          service?: string | null
          startTime?: string | null
          zipcode?: number | null
        }
        Relationships: []
      }
      chat: {
        Row: {
          bookingId: string | null
          ChatID: string | null
          eventTitle: string | null
          id: string | null
          isArchived: string | null
          isRequest: string | null
          lastMessageSentAt: string | null
          lastMessageSentBy: string | null
          lastMessageText: string | null
          participants: string | null
        }
        Insert: {
          bookingId?: string | null
          ChatID?: string | null
          eventTitle?: string | null
          id?: string | null
          isArchived?: string | null
          isRequest?: string | null
          lastMessageSentAt?: string | null
          lastMessageSentBy?: string | null
          lastMessageText?: string | null
          participants?: string | null
        }
        Update: {
          bookingId?: string | null
          ChatID?: string | null
          eventTitle?: string | null
          id?: string | null
          isArchived?: string | null
          isRequest?: string | null
          lastMessageSentAt?: string | null
          lastMessageSentBy?: string | null
          lastMessageText?: string | null
          participants?: string | null
        }
        Relationships: []
      }
      email: {
        Row: {
          delivery: string | null
          EmailID: string | null
          id: string | null
          message: string | null
          to: string | null
        }
        Insert: {
          delivery?: string | null
          EmailID?: string | null
          id?: string | null
          message?: string | null
          to?: string | null
        }
        Update: {
          delivery?: string | null
          EmailID?: string | null
          id?: string | null
          message?: string | null
          to?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          Comment: string | null
          FeedbackID: string | null
          Time: number | null
        }
        Insert: {
          Comment?: string | null
          FeedbackID?: string | null
          Time?: number | null
        }
        Update: {
          Comment?: string | null
          FeedbackID?: string | null
          Time?: number | null
        }
        Relationships: []
      }
      foodtrucks: {
        Row: {
          Category: string | null
          Cater: string | null
          Description: string | null
          dietary: string | null
          Email: string | null
          FoodTruckID: string | null
          Image: string | null
          likes: number | null
          Name: string | null
          OwnerName: string | null
          Phone: string | null
        }
        Insert: {
          Category?: string | null
          Cater?: string | null
          Description?: string | null
          dietary?: string | null
          Email?: string | null
          FoodTruckID?: string | null
          Image?: string | null
          likes?: number | null
          Name?: string | null
          OwnerName?: string | null
          Phone?: string | null
        }
        Update: {
          Category?: string | null
          Cater?: string | null
          Description?: string | null
          dietary?: string | null
          Email?: string | null
          FoodTruckID?: string | null
          Image?: string | null
          likes?: number | null
          Name?: string | null
          OwnerName?: string | null
          Phone?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          customerEmail: string | null
          customerFirstName: string | null
          customerId: string | null
          customerLastName: string | null
          dateTime: number | null
          estimate: string | null
          FCMToken: string | null
          foodTruckId: string | null
          FTFCMToken: string | null
          id: string | null
          isActive: string | null
          name: string | null
          note: string | null
          OrderNumber: string | null
          OrdersID: string | null
          orderTime: string | null
          OrderTotal: string | null
          paymentContext: string | null
          PaymentContext: string | null
          PaymentID: string | null
          paymentIntentParams: string | null
          PaymentIntentParams: string | null
          phoneNumber: string | null
          status: string | null
          StripePaymentIntent: string | null
          StripePaymentMethodId: string | null
          totalPrice: string | null
          user: string | null
          UserID: string | null
        }
        Insert: {
          customerEmail?: string | null
          customerFirstName?: string | null
          customerId?: string | null
          customerLastName?: string | null
          dateTime?: number | null
          estimate?: string | null
          FCMToken?: string | null
          foodTruckId?: string | null
          FTFCMToken?: string | null
          id?: string | null
          isActive?: string | null
          name?: string | null
          note?: string | null
          OrderNumber?: string | null
          OrdersID?: string | null
          orderTime?: string | null
          OrderTotal?: string | null
          paymentContext?: string | null
          PaymentContext?: string | null
          PaymentID?: string | null
          paymentIntentParams?: string | null
          PaymentIntentParams?: string | null
          phoneNumber?: string | null
          status?: string | null
          StripePaymentIntent?: string | null
          StripePaymentMethodId?: string | null
          totalPrice?: string | null
          user?: string | null
          UserID?: string | null
        }
        Update: {
          customerEmail?: string | null
          customerFirstName?: string | null
          customerId?: string | null
          customerLastName?: string | null
          dateTime?: number | null
          estimate?: string | null
          FCMToken?: string | null
          foodTruckId?: string | null
          FTFCMToken?: string | null
          id?: string | null
          isActive?: string | null
          name?: string | null
          note?: string | null
          OrderNumber?: string | null
          OrdersID?: string | null
          orderTime?: string | null
          OrderTotal?: string | null
          paymentContext?: string | null
          PaymentContext?: string | null
          PaymentID?: string | null
          paymentIntentParams?: string | null
          PaymentIntentParams?: string | null
          phoneNumber?: string | null
          status?: string | null
          StripePaymentIntent?: string | null
          StripePaymentMethodId?: string | null
          totalPrice?: string | null
          user?: string | null
          UserID?: string | null
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
