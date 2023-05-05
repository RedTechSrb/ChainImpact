using ChainImpactAPI.Dtos;

namespace ChainImpactAPI.Application.ServiceInterfaces
{
    public interface ITransactionService
    {
        List<TransactionDto> SearchTransactions(GenericDto<TransactionDto>? transactionDto)
    }
}
