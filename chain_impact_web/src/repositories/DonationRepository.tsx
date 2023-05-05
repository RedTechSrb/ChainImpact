import axios from "axios";
import { useEffect, useState } from "react";
import { Donation } from "../models/Donation";
import { DonationSearch } from "../models/dto/request/DonationSearch";
import { DonationSaveRequest } from "../models/dto/request/DonationSaveRequest";
const url = "https://www.chain-impact.com/"

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

export function saveDonation(donation: DonationSaveRequest) {
  axios.post(url + "Donation/SaveDonation", donation).then((response) => {
    const donationData = response.data as Donation;
    return donationData;
  });
}