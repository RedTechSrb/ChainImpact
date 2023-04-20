using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Models;

namespace ChainImpactAPI.Infrastructure.Repositories
{
    public class TransactionRepository : GenericRepository<Transaction>, ITransactionRepository
    {
        public TransactionRepository(ApiDbContext context) : base(context)
        {
        }

        public async Task<List<Transaction>> SearchAsync(GenericDto<TransactionDto>? transactionSearchDto)
        {
            var transactions = await base.ListAllAsync(t => t.project, t => t.donator, t => t.project.primarycausetype, t => t.project.secondarycausetype, t => t.project.charity);

            int? skip = null;
            int? take = null;
            TransactionDto transactionSearch = new TransactionDto();

            if (transactionSearchDto != null)
            {
                if (transactionSearchDto.PageSize != null && transactionSearchDto.PageNumber != null)
                {
                    skip = transactionSearchDto.PageSize.Value * (transactionSearchDto.PageNumber.Value - 1);
                    take = transactionSearchDto.PageSize.Value;
                }
                if (transactionSearchDto.Dto != null)
                {
                    transactionSearch = transactionSearchDto.Dto;
                }
            }

            if (transactionSearch.id != null)
            {
                transactions = transactions.Where(t => t.id == transactionSearch.id).ToList();
            }
            if (transactionSearch.amount!= null)
            {
                transactions = transactions.Where(t => t.amount == transactionSearch.amount).ToList();
            }
            if (transactionSearch.donator != null)
            {
                transactions = transactions.Where(t => t.donator.id == transactionSearch.donator.id).ToList();
            }
            if (transactionSearch.project != null)
            {
                transactions = transactions.Where(t => t.project.id == transactionSearch.project.id).ToList();
            }

            // TODO more search requests...

            transactions = transactions.OrderBy(t => t.id).ToList();

            if (skip != null && take != null)
            {
                transactions = transactions.Skip(skip.Value).Take(take.Value).ToList();
            }


            return transactions;

        }
    }
}
