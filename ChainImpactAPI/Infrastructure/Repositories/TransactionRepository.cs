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
            var transactions = await base.ListAllAsync(t => t.donation, 
                                                       t => t.donation.project, t => t.donation.project.primarycausetype, t => t.donation.project.secondarycausetype, t => t.donation.project.charity,
                                                       t => t.donation.donator, 
                                                       t => t.milestone, t => t.milestone.project, t => t.milestone.project.primarycausetype, t => t.milestone.project.secondarycausetype, t => t.milestone.project.charity);

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
            if (transactionSearch.sender != null)
            {
                transactions = transactions.Where(t => t.sender == transactionSearch.sender).ToList();
            }
            if (transactionSearch.receiver != null)
            {
                transactions = transactions.Where(t => t.receiver == transactionSearch.receiver).ToList();
            }
            if (transactionSearch.type != null)
            {
                transactions = transactions.Where(t => t.type == transactionSearch.type).ToList();
            }
            if (transactionSearch.creationdate != null)
            {
                transactions = transactions.Where(t => t.creationdate == transactionSearch.creationdate).ToList();
            }

            // search by objects
            if (transactionSearch.donation != null)
            {
                transactions = transactions.Where(t => (t.donation != null && t.donation.id == transactionSearch.donation.id)).ToList();
            }
            if (transactionSearch.milestone != null)
            {
                transactions = transactions.Where(t => (t.milestone != null && t.milestone.id == transactionSearch.milestone.id)).ToList();
            }

            if (skip != null && take != null)
            {
                transactions = transactions.Skip(skip.Value).Take(take.Value).ToList();
            }


            return transactions;

        }
    }
}
