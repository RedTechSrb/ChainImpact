import axios from "axios";
import { useEffect, useState } from "react";
import { NFTNextTierRequest } from "../models/dto/request/NFTNextTierRequest";
import { NFTNextTierResponse } from "../models/dto/response/NFTNextTierResponse";

const url = process.env.REACT_APP_BASE_URL;

export function useGetNextTierNFTs(filter: NFTNextTierRequest) {
  
  const [NFTs, setNFTs] = useState<NFTNextTierResponse[]>([]);
  useEffect(() => {
    axios.post(url + "NFTOwner/NFTLeft", filter).then((response) => {
      const donationData = response.data as NFTNextTierResponse[];
      console.log(donationData)
      setNFTs(donationData);
    });
  }, []);

  return NFTs;
}