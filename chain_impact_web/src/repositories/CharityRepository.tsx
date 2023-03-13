import axios from "axios";
import { useEffect, useState } from "react";
import { Charity } from "../models/Charity";

const url = "http://167.99.246.54/";

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
