import axios from "axios";
import { useEffect, useState } from "react";
import { Charity } from "../models/Charity";

const url = "https://192.168.1.211/"

export function useGetAllCharities(){

    const [charities, setCharities] = useState<Charity[]>([]);

    useEffect( () => {
        axios.post(url+"Charity/Search", {})
        .then(response => {
            const charitiesData = response.data as Charity[];
            setCharities(charitiesData)
        })
    },[]);

    return charities;
}