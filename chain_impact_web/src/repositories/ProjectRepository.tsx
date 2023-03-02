import axios from "axios";
import { useEffect, useState } from "react";
import { Project } from "../models/Project";

const url = "http://167.99.246.54/"

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