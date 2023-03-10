import { ProjectWithTotalDonations } from "./ProjectWithTotalDonations";

export interface AngelImpactorData {
    donatedProjects: ProjectWithTotalDonations[];
    totalDonated: number;
    totalProjects: number;
}