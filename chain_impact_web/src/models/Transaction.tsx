import { Impactor } from "./Impactor";
import { Project } from "./Project";

export interface Transaction {
  id: number;
  blockchainaddress: string;
  sender: string;
  receiver: string;
  amount: number;
  project: Project;
  donator: Impactor;
}
