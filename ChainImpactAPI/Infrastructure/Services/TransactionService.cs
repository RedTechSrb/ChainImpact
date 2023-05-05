using ChainImpactAPI.Application.RepositoryInterfaces;
using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Infrastructure.Repositories;
using ChainImpactAPI.Models;

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

        public List<TransactionDto> SearchTransactions(GenericDto<TransactionDto>? transactionDto)
        {
            var transactions = transactionRepository.SearchAsync(transactionDto).Result;

            List<TransactionDto> transactionsDtoList = new List<TransactionDto>();
            foreach (var tranaction in transactions)
            {
                transactionsDtoList.Add(new TransactionDto(
                                        tranaction.id,
                                        tranaction.blockchainaddress,
                                        tranaction.sender,
                                        tranaction.receiver,
                                        tranaction.amount,
                                        new ProjectDto(
                                            tranaction.project.id,
                                            new CharityDto(
                                                tranaction.project.charity.id,
                                                tranaction.project.charity.name,
                                                tranaction.project.charity.wallet,
                                                tranaction.project.charity.website,
                                                tranaction.project.charity.facebook,
                                                tranaction.project.charity.discord,
                                                tranaction.project.charity.twitter,
                                                tranaction.project.charity.imageurl,
                                                tranaction.project.charity.description
                                            ),
                                            tranaction.project.wallet,
                                            tranaction.project.name,
                                            tranaction.project.description,
                                            tranaction.project.milestones,
                                            tranaction.project.financialgoal,
                                            tranaction.project.totaldonated,
                                            tranaction.project.totalbackers,
                                            tranaction.project.website,
                                            tranaction.project.facebook,
                                            tranaction.project.discord,
                                            tranaction.project.twitter,
                                            tranaction.project.instagram,
                                            tranaction.project.imageurl,
                                            tranaction.project.impactor == null ? null : new ImpactorDto(
                                                tranaction.project.impactor.id,
                                                tranaction.project.impactor.wallet,
                                                tranaction.project.impactor.name,
                                                tranaction.project.impactor.description,
                                                tranaction.project.impactor.website,
                                                tranaction.project.impactor.facebook,
                                                tranaction.project.impactor.discord,
                                                tranaction.project.impactor.twitter,
                                                tranaction.project.impactor.instagram,
                                                tranaction.project.impactor.imageurl,
                                                tranaction.project.impactor.role,
                                                tranaction.project.impactor.type
                                            ),
                                            new CauseTypeDto(
                                                tranaction.project.primarycausetype.id,
                                                tranaction.project.primarycausetype.name
                                            ),
                                            new CauseTypeDto(
                                                tranaction.project.secondarycausetype.id,
                                                tranaction.project.secondarycausetype.name
                                            )
                                        ),
                                        new ImpactorDto(
                                            tranaction.donator.id,
                                            tranaction.donator.wallet,
                                            tranaction.donator.name,
                                            tranaction.donator.description,
                                            tranaction.donator.website,
                                            tranaction.donator.facebook,
                                            tranaction.donator.discord,
                                            tranaction.donator.twitter,
                                            tranaction.donator.instagram,
                                            tranaction.donator.imageurl,
                                            tranaction.donator.role,
                                            tranaction.donator.type
                                        ),
                                        tranaction.milestone == null ? null : new MilestoneDto(
                                            tranaction.milestone.id,
                                            tranaction.milestone.name,
                                            tranaction.milestone.description,
                                            tranaction.milestone.complete,
                                            new ProjectDto(
                                                tranaction.milestone.project.id,
                                                new CharityDto(
                                                    tranaction.milestone.project.charity.id,
                                                    tranaction.milestone.project.charity.name,
                                                    tranaction.milestone.project.charity.wallet,
                                                    tranaction.milestone.project.charity.website,
                                                    tranaction.milestone.project.charity.facebook,
                                                    tranaction.milestone.project.charity.discord,
                                                    tranaction.milestone.project.charity.twitter,
                                                    tranaction.milestone.project.charity.imageurl,
                                                    tranaction.milestone.project.charity.description
                                                ),
                                                tranaction.milestone.project.wallet,
                                                tranaction.milestone.project.name,
                                                tranaction.milestone.project.description,
                                                tranaction.milestone.project.milestones,
                                                tranaction.milestone.project.financialgoal,
                                                tranaction.milestone.project.totaldonated,
                                                tranaction.milestone.project.totalbackers,
                                                tranaction.milestone.project.website,
                                                tranaction.milestone.project.facebook,
                                                tranaction.milestone.project.discord,
                                                tranaction.milestone.project.twitter,
                                                tranaction.milestone.project.instagram,
                                                tranaction.milestone.project.imageurl,
                                                tranaction.milestone.project.impactor == null ? null : new ImpactorDto(
                                                    tranaction.milestone.project.impactor.id,
                                                    tranaction.milestone.project.impactor.wallet,
                                                    tranaction.milestone.project.impactor.name,
                                                    tranaction.milestone.project.impactor.description,
                                                    tranaction.milestone.project.impactor.website,
                                                    tranaction.milestone.project.impactor.facebook,
                                                    tranaction.milestone.project.impactor.discord,
                                                    tranaction.milestone.project.impactor.twitter,
                                                    tranaction.milestone.project.impactor.instagram,
                                                    tranaction.milestone.project.impactor.imageurl,
                                                    tranaction.milestone.project.impactor.role,
                                                    tranaction.milestone.project.impactor.type
                                                ),
                                                new CauseTypeDto(
                                                    tranaction.milestone.project.primarycausetype.id,
                                                    tranaction.milestone.project.primarycausetype.name
                                                ),
                                                new CauseTypeDto(
                                                    tranaction.milestone.project.secondarycausetype.id,
                                                    tranaction.milestone.project.secondarycausetype.name
                                                )
                                            )
                                        )
                                ));
            }




            return transactionsDtoList;
        }


    }
}
