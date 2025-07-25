
// types/user.ts
interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    accounts: Account[];
    sessions: Session[];
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    stripePriceId: string | null;
    stripeCurrentPeriodEnd: Date | null;
  }
  
  interface Account {
    id: string;
    userId: string;
    providerType: string;
    providerId: string;
    providerAccountId: string;
    refreshToken: string | null;
    accessToken: string | null;
    accessTokenExpires: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface Session {
    id: string;
    userId: string;
    expires: Date;
    sessionToken: string;
    accessToken: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type { User, Account, Session };
  