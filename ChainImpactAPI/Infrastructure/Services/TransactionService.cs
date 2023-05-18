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
                                        tranaction.type,
                                        tranaction.creationdate,
                                        tranaction.donation == null ? null : new DonationDto(
                                            tranaction.donation.id,
                                            tranaction.donation.amount,
                                            tranaction.donation.creationdate,
                                            new ProjectDto(
                                                tranaction.donation.project.id,
                                                new CharityDto(
                                                    tranaction.donation.project.charity.id,
                                                    tranaction.donation.project.charity.name,
                                                    tranaction.donation.project.charity.wallet,
                                                    tranaction.donation.project.charity.website,
                                                    tranaction.donation.project.charity.facebook,
                                                    tranaction.donation.project.charity.discord,
                                                    tranaction.donation.project.charity.twitter,
                                                    tranaction.donation.project.charity.imageurl,
                                                    tranaction.donation.project.charity.description
                                                ),
                                                tranaction.donation.project.wallet,
                                                tranaction.donation.project.name,
                                                tranaction.donation.project.description,
                                                tranaction.donation.project.financialgoal,
                                                tranaction.donation.project.totaldonated,
                                                tranaction.donation.project.totalbackers,
                                                tranaction.donation.project.website,
                                                tranaction.donation.project.facebook,
                                                tranaction.donation.project.discord,
                                                tranaction.donation.project.twitter,
                                                tranaction.donation.project.instagram,
                                                tranaction.donation.project.imageurl,
                                                tranaction.donation.project.impactor == null ? null : new ImpactorDto(
                                                    tranaction.donation.project.impactor.id,
                                                    tranaction.donation.project.impactor.wallet,
                                                    tranaction.donation.project.impactor.name,
                                                    tranaction.donation.project.impactor.description,
                                                    tranaction.donation.project.impactor.website,
                                                    tranaction.donation.project.impactor.facebook,
                                                    tranaction.donation.project.impactor.discord,
                                                    tranaction.donation.project.impactor.twitter,
                                                    tranaction.donation.project.impactor.instagram,
                                                    tranaction.donation.project.impactor.imageurl,
                                                    tranaction.donation.project.impactor.role,
                                                    tranaction.donation.project.impactor.type
                                                ),
                                                new CauseTypeDto(
                                                    tranaction.donation.project.primarycausetype.id,
                                                    tranaction.donation.project.primarycausetype.name
                                                ),
                                                new CauseTypeDto(
                                                    tranaction.donation.project.secondarycausetype.id,
                                                    tranaction.donation.project.secondarycausetype.name
                                                )
                                            ),
                                            new ImpactorDto(
                                                tranaction.donation.donator.id,
                                                tranaction.donation.donator.wallet,
                                                tranaction.donation.donator.name,
                                                tranaction.donation.donator.description,
                                                tranaction.donation.donator.website,
                                                tranaction.donation.donator.facebook,
                                                tranaction.donation.donator.discord,
                                                tranaction.donation.donator.twitter,
                                                tranaction.donation.donator.instagram,
                                                tranaction.donation.donator.imageurl,
                                                tranaction.donation.donator.role,
                                                tranaction.donation.donator.type
                                            )
                                        ),
                                        tranaction.milestone == null ? null : new MilestoneDto(
                                            tranaction.milestone.id,
                                            tranaction.milestone.name,
                                            tranaction.milestone.ordernumber,
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
