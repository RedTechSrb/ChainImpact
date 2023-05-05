import axios from "axios";
import { useEffect, useState } from "react";
import { DonationSearch } from "../models/dto/request/DonationSearch";
import { ProjectSearch } from "../models/dto/request/ProjectSearch";
import { BiggestDonators } from "../models/dto/response/BiggestDonators";
import { Project } from "../models/Project";
import { Milestone } from "../models/Milestone";
import { MilestoneSearch } from "../models/dto/request/MilestoneSearch";
import { MilestoneResponse } from "../models/dto/response/MilestonesResponse";

const url = "https://www.chain-impact.com/"

export function useGetAllProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios.get(url + "Project").then((response) => {
      const projectData = response.data as Project[];
      setProjects(projectData);
    });
  }, []);

  return projects;

  //return ImpactorData.slice(0, 5) as Impactor[];
}

export function useGetSpecificProject(searchDto: ProjectSearch) {
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    axios.post(url + "Project/Search", searchDto).then((response) => {
      const projectData = response.data as Project[];
      setProject(projectData[0]);
    });
  }, []);

  return project;
}

export function useGetBiggestImpactors(filter: DonationSearch) {
  const [impactors, setImpactors] = useState<BiggestDonators[]>([]);
  useEffect(() => {
    axios.post(url + "Donation/BiggestDonations", filter).then((response) => {
      const donationData = response.data as BiggestDonators[];
      setImpactors(donationData);
    });
  }, []);

  return impactors;
}

export function useGetMilestones(filter: MilestoneSearch) {
  const [milestones, setMilestones] = useState<MilestoneResponse[]>([]);
  useEffect(() => {
    axios.post(url + "Milestone/search", filter).then((response) => {
      const milestoneData = response.data as MilestoneResponse[];
      setMilestones(milestoneData);
    });
  }, []);

  return milestones;
}
