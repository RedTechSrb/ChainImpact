export interface CreateNewImpactor {
    wallet: string,
    name: string | null,
    description: string | null,
    website: string | null,
    facebook: string | null,
    discord: string | null,
    twitter: string | null,
    instagram: string | null,
    imageurl: string | null,
    role: number | null,
    type: number,
}