import axios from "axios";
import { useEffect, useState } from "react";
import { NFTNextTierRequest } from "../models/dto/request/NFTNextTierRequest";
import { NFTNextTierResponse } from "../models/dto/response/NFTNextTierResponse";

const url = "https://192.168.1.63:443/"

export function useGetNextTierNFTs(filter: NFTNextTierRequest) {
  const [NFTs, setNFTs] = useState<NFTNextTierResponse[]>([]);
  useEffect(() => {
    axios.post(url + "NFTOwner/NFTLeft", filter).then((response) => {
      const donationData = response.data as NFTNextTierResponse[];
      console.log(donationData);

      // if there is only 1 result, that one cannot be "general"
      // but one of the primary cause types
      if (donationData.length === 0) {
        donationData.push({ amountleft: 0, imageurl: "", tier: 4 });
        donationData.push({ amountleft: 0, imageurl: "", tier: 4 });
      } else if (donationData.length === 1) {
        donationData.push({ amountleft: 0, imageurl: "", tier: 4 });
      }
      setNFTs(donationData);
    });
  }, []);

  return NFTs;
}
