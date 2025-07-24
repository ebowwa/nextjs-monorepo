// types/storage.ts
// supabase bucket
export type Bucket = {
    id: string;
    name: string;
    public: boolean;
    createdAt: string; 
};

export type PublicUrlResponse = {
    publicUrl: string;
};

