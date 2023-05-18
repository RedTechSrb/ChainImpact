import { Donation } from "./Donation";
import { Impactor } from "./Impactor";
import { Project } from "./Project";

export interface Transaction { // human-readable
  id: number;
  blockchainaddress: string;
  sender: string;
  receiver: string;
  amount: number;
  donation: Donation;
  milestoneid: number;
}
