import { Impactor } from "../../Impactor"
import { Project } from "../../Project"
import { ProjectWithTotalDonations } from "./ProjectWithTotalDonations"

export interface ImpactorsWithProjects {
    impactor: Impactor
    donatedProjects: ProjectWithTotalDonations[]
    
}