import axios from "axios";
import { useEffect, useState } from "react";
import { DonationSearch } from "../models/dto/request/DonationSearch";
import { ProjectSearch } from "../models/dto/request/ProjectSearch";
import { BiggestDonators } from "../models/dto/response/BiggestDonators";
import { Project } from "../models/Project";

const url = process.env.REACT_APP_BASE_URL

export function useGetAllProjects(){

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect( () => {
        axios.get(url+"Project")
        .then(response => {
            const projectData = response.data as Project[];
            setProjects(projectData)
        })
    },[]);

    return projects;

    //return ImpactorData.slice(0, 5) as Impactor[];
}

export function useGetSpecificProject(searchDto: ProjectSearch){

    const [project, setProject] = useState<Project>();

    useEffect( () => {
        axios.post(url+"Project/Search", searchDto)
        .then(response => {
            const projectData = response.data as Project[];
            setProject(projectData[0])
        })
    },[]);

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
