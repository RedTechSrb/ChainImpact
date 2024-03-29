import axios from "axios";
import { useEffect, useState } from "react";
import { Charity } from "../models/Charity";

const url = "https://www.chain-impact.com/"

export function useGetAllCharities() {
  const [charities, setCharities] = useState<Charity[]>([]);

  useEffect(() => {
    axios.post(url + "Charity/Search", {}).then((response) => {
      const charitiesData = response.data as Charity[];
      setCharities(charitiesData);
    });
  }, []);

  return charities;
}
