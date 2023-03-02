import axios from "axios";
import { useEffect, useState } from "react";
import { ImpactorTypeFilter } from "../models/dto/request/ImpactorTypeFilter";
import { ImpactorsWithDonations } from "../models/dto/response/ImpactorsWithDonations";
import { Impactor } from "../models/Impactor";

const url = "http://167.99.246.54/"

export function useGetAllImpactors(){

    const [impactors, setImpactors] = useState<Impactor[]>([]);

    useEffect( () => {
        axios.get(url+"Impactor")
        .then(response => {
            const impactorData = response.data as Impactor[];
            setImpactors(impactorData)
        })
    },[]);

    return impactors;
}


export function useGetImpactorsWithDonations(filter: ImpactorTypeFilter | {}){

    const [impactors, setImpactors] = useState<ImpactorsWithDonations[]>([]);

    useEffect( () => {
        axios.post(url+"Donation/ImpactorsWithDonations", filter)
        .then(response => {
            const impactorData = response.data as ImpactorsWithDonations[];
            setImpactors(impactorData)
        })
    },[]);

    return impactors.slice(0, 5);

    //return ImpactorData.slice(0, 5) as Impactor[];
}