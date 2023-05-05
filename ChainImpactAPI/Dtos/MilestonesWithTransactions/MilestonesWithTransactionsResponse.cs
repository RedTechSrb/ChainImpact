namespace ChainImpactAPI.Dtos.MilestonesWithTransactions
{
    public class MilestonesWithTransactionsResponse
    {
        public MilestoneDto? milestone { get; set; }
        public List<TransactionDto> transactions { get; set; }
    }
}
