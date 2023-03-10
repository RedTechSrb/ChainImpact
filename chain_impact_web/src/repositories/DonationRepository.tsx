import axios from "axios";
import { useEffect, useState } from "react";
import { Donation } from "../models/Donation";
import { DonationSearch } from "../models/dto/request/DonationSearch";

const url = "https://192.168.1.63:443/"

export function useGetRecentDonations(filter: DonationSearch) {
  let donation: Donation[] | null = null;

  const [donations, setDonations] = useState<Donation[]>([]);
  useEffect(() => {
    axios.post(url + "Donation/RecentDonations", filter).then((response) => {
      const donationData = response.data as Donation[];
      setDonations(donationData);
    });
  }, []);

  return donations;
}