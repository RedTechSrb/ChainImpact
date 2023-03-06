﻿using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.ImpactorWithWallet;
using ChainImpactAPI.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChainImpactAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImpactorController : ControllerBase
    {
        private readonly IImpactorService impactorService;

        public ImpactorController(IImpactorService impactorService)
        {
            this.impactorService = impactorService;
        }

        [HttpGet(Name = "impactor/getall")]
        public IActionResult Get()
        {

            var impactorDtoList = impactorService.GetImpactors();

            return Ok(impactorDtoList);
        }

        [HttpPost("ImpactorWithWallet")]
        public IActionResult GetImpactorWithWallet(ImpactorWithWalletRequestDto impactorWithWalletRequestDto)
        {

            var impactorSavedImpactor = impactorService.GetImpactorWithWallet(impactorWithWalletRequestDto);

            return Ok(impactorSavedImpactor);
        }

        [HttpPost("save")]
        public IActionResult SaveImpactor(ImpactorDto impactorDto)
        {

            var impactorSavedImpactor = impactorService.SaveImpactor(impactorDto);

            return Ok(impactorSavedImpactor);
        }

    }
}
