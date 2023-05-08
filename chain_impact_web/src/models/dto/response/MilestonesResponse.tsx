import { Milestone } from "../../Milestone";
import { Transaction } from "../../Transaction";

export interface MilestoneResponse {
    milestone: Milestone;
    transactions: Transaction[];
}