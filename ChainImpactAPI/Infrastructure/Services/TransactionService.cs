using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;

namespace ChainImpactAPI.Infrastructure.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly IConfiguration configuration;
        private readonly ITransactionRepository transactionRepository;

        public TransactionService(
            IConfiguration configuration,
            ITransactionRepository transactionRepository)
        {
            this.configuration = configuration;
            this.transactionRepository = transactionRepository;
        }

    }
}
