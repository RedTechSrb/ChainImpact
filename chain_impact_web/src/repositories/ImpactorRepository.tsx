import axios from "axios";
import { useEffect, useState } from "react";
import { CreateNewImpactor } from "../models/dto/request/CreateNewImpactor";
import { ImpactorsWithProjectsSearch } from "../models/dto/request/ImpactorsWithProjectsSearch";
import { ImpactorTypeFilter } from "../models/dto/request/ImpactorTypeFilter";
import { ImpactorWalletSearch } from "../models/dto/request/ImpactorWalletSearch";
import { AngelImpactorData } from "../models/dto/response/AngelImpactorData";
import { ImpactorsWithDonations } from "../models/dto/response/ImpactorsWithDonations";
import { ImpactorsWithProjects } from "../models/dto/response/ImpactorsWithProjects";
import { ProjectWithTotalDonations } from "../models/dto/response/ProjectWithTotalDonations";
import { Impactor } from "../models/Impactor";
import { Project } from "../models/Project";

const url = process.env.REACT_APP_BASE_URL;

export function useGetAllImpactors() {
  const [impactors, setImpactors] = useState<Impactor[]>([]);

  useEffect(() => {
    axios.get(url + "Impactor").then((response) => {
      const impactorData = response.data as Impactor[];
      setImpactors(impactorData);
    });
  }, []);

  return impactors;
}

export async function getSpecificImpactor(filter: ImpactorWalletSearch) {
  let impactor: Impactor | null = null;

  await axios.post(url + "Impactor/Search", filter).then((response) => {
    const impactorData = response.data as Impactor[];
    impactor = impactorData[0];
  });
  return impactor;
}

export function useGetImpactorsWithDonations(
  filter: ImpactorTypeFilter | {},
  privateUser: boolean
) {
  const [impactors, setImpactors] = useState<ImpactorsWithDonations[]>([]);

  useEffect(() => {
    axios
      .post(url + "Donation/ImpactorsWithDonations", filter)
      .then((response) => {
        const impactorData = response.data as ImpactorsWithDonations[];
        let privateUserImpactorData = [];
        let companyImpactorData = [];

        for (let i = 0; i < impactorData.length; i++) {
          if (impactorData[i].userType === 1)
            privateUserImpactorData.push(impactorData[i]);
          else companyImpactorData.push(impactorData[i]);
        }

        if (privateUser) setImpactors(privateUserImpactorData);
        else setImpactors(companyImpactorData);
      });
  }, []);

  return impactors;

  //return ImpactorData.slice(0, 5) as Impactor[];
}

export function createNewImpactor(newImpactor: CreateNewImpactor) {
  axios.post(url + "Impactor/Save", newImpactor).then((response) => {
    const impactorData = response.data as Impactor;
    return impactorData;
  });
}

export function useGetImpactorsWithProjects(
  searchDto: ImpactorsWithProjectsSearch
) {
  const [projects, setProjects] = useState<ProjectWithTotalDonations[]>([]);

  useEffect(() => {
    axios
      .post(url + "Impactor/ImpactorsWithProjects", searchDto)
      .then((response) => {
        const impactorsWithProjectsData =
          response.data as ImpactorsWithProjects[];
        setProjects(impactorsWithProjectsData[0].donatedProjects);
      });
  }, []);
  return projects;
}

export function useGetAngelImpactorData(
  searchDto: ImpactorWalletSearch
) {
  const [angelImpactorData, setAngelImpactorData] = useState<AngelImpactorData>();

  useEffect(() => {
    axios
      .post(url + "Impactor/ImpactorsWithProjects", searchDto)
      .then((response) => {
        const impactorsWithProjectsData = response.data as ImpactorsWithProjects[];
          let totalDonated = 0;
          let totalProjects = impactorsWithProjectsData[0].donatedProjects.length;
          impactorsWithProjectsData[0].donatedProjects.map((projectWithDonations) => {
            if (Number(impactorsWithProjectsData[0]?.impactor?.id) === Number(projectWithDonations.project.angelimpactor?.id)) {
              totalDonated = projectWithDonations.totalDonation;
            }
          })
          let donatedProjects =  impactorsWithProjectsData[0].donatedProjects;
          setAngelImpactorData({donatedProjects , totalDonated, totalProjects});
      });
  }, []);
  return angelImpactorData;
}