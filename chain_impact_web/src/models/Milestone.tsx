import { Transaction } from "./Transaction";

export interface Milestone {
    name: string,
    description: string,
    complete: number,
    projectid: number,
    transactions: Transaction[] // human-readable
}