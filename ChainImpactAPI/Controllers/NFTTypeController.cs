﻿using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChainImpactAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NFTTypeController : ControllerBase
    {

        private readonly INFTTypeService NFTTypeService;

        public NFTTypeController(INFTTypeService NFTTypeService)
        {
            this.NFTTypeService = NFTTypeService;
        }

        [HttpGet()]
        public IActionResult Get()
        {

            var nftDtolist = NFTTypeService.GetNFTList();

            return Ok(nftDtolist);
        }


        [HttpPost("NFTsData")]
        public IActionResult SearchNFTTypes(GenericDto<NFTRequestDto>? nftDto)
        {

            var projectDtoList = NFTTypeService.GetNFTsData(nftDto);

            return Ok(projectDtoList);
        }

    }
}
