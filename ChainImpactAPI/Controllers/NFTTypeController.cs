using ChainImpactAPI.Application.ServiceInterfaces;
using ChainImpactAPI.Dtos;
using ChainImpactAPI.Dtos.NFT;
using ChainImpactAPI.Dtos.SearchDtos;
using ChainImpactAPI.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.IO.Compression;
using System.Security.Cryptography;
using System.Text;

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

        private byte[] Compress(byte[] bytes)
        {
            using var ms = new MemoryStream();
            using var gzip = new GZipStream(ms, CompressionMode.Compress, true);
            gzip.Write(bytes, 0, bytes.Length);
            gzip.Close();
            return ms.ToArray();
        }
        private string GenerateETag(byte[] bytes)
        {
            using var sha1 = SHA1.Create();
            var hash = sha1.ComputeHash(bytes);
            var eTag = new StringBuilder();
            eTag.Append("W/\"");
            foreach (var b in hash)
            {
                eTag.Append(b.ToString("x2"));
            }
            eTag.Append("\"");
            return eTag.ToString();
        }


        [HttpGet("getNFTsData")]
        public IActionResult Get([FromQuery] int tier, [FromQuery] int userType, [FromQuery] string causeType)
        {

            var data = NFTTypeService.GetNFTsData(new GenericDto<NFTRequestDto>(null, null, new NFTRequestDto { tier = tier, usertype = userType, causetype = causeType })).FirstOrDefault();
            var jsonData = JsonConvert.SerializeObject(data);

            var responseBytes = Encoding.UTF8.GetBytes(jsonData);

            // Compress the response using GZipStream
            var compressedBytes = Compress(responseBytes);

            // Calculate ETag based on the compressed response
            var eTag = GenerateETag(compressedBytes);

            // If the request has a matching ETag, return a 304 Not Modified response
            if (Request.Headers.ContainsKey("If-None-Match") && Request.Headers["If-None-Match"] == eTag)
            {
                return new StatusCodeResult(304);
            }


            Response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
            Response.Headers.Add("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox");

            // Set the Content-Encoding header to gzip
            Response.Headers.Add("Content-Encoding", "gzip");

            // Set the ETag header
            Response.Headers.Add("ETag", eTag);

            return new FileContentResult(compressedBytes, "text/plain; charset=utf-8");

        }


        [HttpPost("NFTsData")]
        public IActionResult SearchNFTTypes(GenericDto<NFTRequestDto>? nftDto)
        {

            var nftDtolist = NFTTypeService.GetNFTsData(nftDto);

            return Ok(nftDtolist);
        }

    }
}
