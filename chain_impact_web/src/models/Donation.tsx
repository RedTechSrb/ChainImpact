import { Impactor } from "./Impactor";
import { Transaction } from "./Transaction";

export interface Donation {
  impactor: Impactor;
  amount: number;
  transactions: Transaction[];
}
