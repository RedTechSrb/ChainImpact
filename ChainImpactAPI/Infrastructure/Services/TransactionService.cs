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
            foreach (var transaction in transactions)
            {
                transactionsDtoList.Add(new TransactionDto(
                                        transaction.id,
                                        transaction.blockchainaddress,
                                        transaction.sender,
                                        transaction.receiver,
                                        transaction.amount,
                                        transaction.type,
                                        transaction.creationdate,
                                        transaction.donation == null ? null : new DonationDto(
                                            transaction.donation.id,
                                            transaction.donation.amount,
                                            transaction.donation.creationdate,
                                            new ProjectDto(
                                                transaction.donation.project.id,
                                                new CharityDto(
                                                    transaction.donation.project.charity.id,
                                                    transaction.donation.project.charity.name,
                                                    transaction.donation.project.charity.wallet,
                                                    transaction.donation.project.charity.website,
                                                    transaction.donation.project.charity.facebook,
                                                    transaction.donation.project.charity.discord,
                                                    transaction.donation.project.charity.twitter,
                                                    transaction.donation.project.charity.imageurl,
                                                    transaction.donation.project.charity.description,
                                                    transaction.donation.project.charity.instagram,
                                                    transaction.donation.project.charity.confirmed,
                                                    transaction.donation.project.charity.email
                                                ),
                                                transaction.donation.project.wallet,
                                                transaction.donation.project.name,
                                                transaction.donation.project.description,
                                                transaction.donation.project.financialgoal,
                                                transaction.donation.project.totaldonated,
                                                transaction.donation.project.totalbackers,
                                                transaction.donation.project.website,
                                                transaction.donation.project.facebook,
                                                transaction.donation.project.discord,
                                                transaction.donation.project.twitter,
                                                transaction.donation.project.instagram,
                                                transaction.donation.project.imageurl,
                                                transaction.donation.project.impactor == null ? null : new ImpactorDto(
                                                    transaction.donation.project.impactor.id,
                                                    transaction.donation.project.impactor.wallet,
                                                    transaction.donation.project.impactor.name,
                                                    transaction.donation.project.impactor.description,
                                                    transaction.donation.project.impactor.website,
                                                    transaction.donation.project.impactor.facebook,
                                                    transaction.donation.project.impactor.discord,
                                                    transaction.donation.project.impactor.twitter,
                                                    transaction.donation.project.impactor.instagram,
                                                    transaction.donation.project.impactor.imageurl,
                                                    transaction.donation.project.impactor.role,
                                                    transaction.donation.project.impactor.type,
                                                    transaction.donation.project.impactor.confirmed,
                                                    transaction.donation.project.impactor.password,
                                                    transaction.donation.project.impactor.username,
                                                    transaction.donation.project.impactor.email
                                                ),
                                                new CauseTypeDto(
                                                    transaction.donation.project.primarycausetype.id,
                                                    transaction.donation.project.primarycausetype.name
                                                ),
                                                new CauseTypeDto(
                                                    transaction.donation.project.secondarycausetype.id,
                                                    transaction.donation.project.secondarycausetype.name
                                                ),
                                                transaction.donation.project.confirmed
                                            ),
                                            new ImpactorDto(
                                                transaction.donation.donator.id,
                                                transaction.donation.donator.wallet,
                                                transaction.donation.donator.name,
                                                transaction.donation.donator.description,
                                                transaction.donation.donator.website,
                                                transaction.donation.donator.facebook,
                                                transaction.donation.donator.discord,
                                                transaction.donation.donator.twitter,
                                                transaction.donation.donator.instagram,
                                                transaction.donation.donator.imageurl,
                                                transaction.donation.donator.role,
                                                transaction.donation.donator.type,
                                                transaction.donation.donator.confirmed,
                                                transaction.donation.donator.password,
                                                transaction.donation.donator.username,
                                                transaction.donation.donator.email
                                            )
                                        ),
                                        transaction.milestone == null ? null : new MilestoneDto(
                                            transaction.milestone.id,
                                            transaction.milestone.name,
                                            transaction.milestone.ordernumber,
                                            transaction.milestone.description,
                                            transaction.milestone.complete,
                                            new ProjectDto(
                                                transaction.milestone.project.id,
                                                new CharityDto(
                                                    transaction.milestone.project.charity.id,
                                                    transaction.milestone.project.charity.name,
                                                    transaction.milestone.project.charity.wallet,
                                                    transaction.milestone.project.charity.website,
                                                    transaction.milestone.project.charity.facebook,
                                                    transaction.milestone.project.charity.discord,
                                                    transaction.milestone.project.charity.twitter,
                                                    transaction.milestone.project.charity.imageurl,
                                                    transaction.milestone.project.charity.description,
                                                    transaction.milestone.project.charity.instagram,
                                                    transaction.milestone.project.charity.confirmed,
                                                    transaction.milestone.project.charity.email
                                                ),
                                                transaction.milestone.project.wallet,
                                                transaction.milestone.project.name,
                                                transaction.milestone.project.description,
                                                transaction.milestone.project.financialgoal,
                                                transaction.milestone.project.totaldonated,
                                                transaction.milestone.project.totalbackers,
                                                transaction.milestone.project.website,
                                                transaction.milestone.project.facebook,
                                                transaction.milestone.project.discord,
                                                transaction.milestone.project.twitter,
                                                transaction.milestone.project.instagram,
                                                transaction.milestone.project.imageurl,
                                                transaction.milestone.project.impactor == null ? null : new ImpactorDto(
                                                    transaction.milestone.project.impactor.id,
                                                    transaction.milestone.project.impactor.wallet,
                                                    transaction.milestone.project.impactor.name,
                                                    transaction.milestone.project.impactor.description,
                                                    transaction.milestone.project.impactor.website,
                                                    transaction.milestone.project.impactor.facebook,
                                                    transaction.milestone.project.impactor.discord,
                                                    transaction.milestone.project.impactor.twitter,
                                                    transaction.milestone.project.impactor.instagram,
                                                    transaction.milestone.project.impactor.imageurl,
                                                    transaction.milestone.project.impactor.role,
                                                    transaction.milestone.project.impactor.type,
                                                    transaction.milestone.project.impactor.confirmed,
                                                    transaction.milestone.project.impactor.password,
                                                    transaction.milestone.project.impactor.username,
                                                    transaction.milestone.project.impactor.email
                                                ),
                                                new CauseTypeDto(
                                                    transaction.milestone.project.primarycausetype.id,
                                                    transaction.milestone.project.primarycausetype.name
                                                ),
                                                new CauseTypeDto(
                                                    transaction.milestone.project.secondarycausetype.id,
                                                    transaction.milestone.project.secondarycausetype.name
                                                ),
                                                transaction.milestone.project.confirmed
                                            )
                                        )
                                ));
            }




            return transactionsDtoList;
        }


    }
}
