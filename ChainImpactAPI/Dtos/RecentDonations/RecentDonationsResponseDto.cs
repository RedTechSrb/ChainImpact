﻿namespace ChainImpactAPI.Dtos.RecentDonations
{
    public class RecentDonationsResponseDto
    {
        public ImpactorDto? impactor { get; set; }
        public double ? amount { get; set; }
        public List<TransactionDto> transactions { get; set; } 
    }
}
