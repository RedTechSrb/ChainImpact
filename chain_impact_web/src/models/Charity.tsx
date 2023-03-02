import { BaseEntity } from "./BaseEntity";

export interface Charity extends BaseEntity {
    name: string,
    wallet: string | null,
    website: string | null,
    facebook: string | null,
    discord: string | null,
    twitter: string | null,
    imageurl: string | null,
    description: string | null,
}