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

        private string ComputeETag(byte[] bytes)
        {
            using var sha1 = SHA1.Create();
            var hash = sha1.ComputeHash(bytes);
            var sb = new StringBuilder();
            foreach (var b in hash)
            {
                sb.Append(b.ToString("x2"));
            }
            return $"W/\"{sb.ToString()}\"";
        }


        [HttpGet("getNFTsData")]
        public IActionResult Get([FromQuery] int tier, [FromQuery] int userType, [FromQuery] string causeType)
        {

            var data = NFTTypeService.GetNFTsData(new GenericDto<NFTRequestDto>(null, null, new NFTRequestDto { tier = tier, usertype = userType, causetype = causeType })).FirstOrDefault();
            var jsonData = JsonConvert.SerializeObject(data);

            var responseBytes = Encoding.UTF8.GetBytes(jsonData);

            // Compress the response using GZipStream
            //            var compressedBytes = Compress(responseBytes);

            // Compute the ETag
            //            var eTag = ComputeETag(compressedBytes);

            Response.ContentType = "application/json";
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Headers.Add("Cache-Control", "max-age=3600");
            Response.Headers.Add("Expires", "Sat, 16 Mar 2023 23:59:59 GMT");
            Response.Headers.Add("Pragma", "no-cache");
            Response.Headers.Add("Server", "nginx/1.14.0 (Ubuntu)");
            Response.Headers.Add("X-Content-Type-Options", "nosniff");
            Response.Headers.Add("X-Frame-Options", "SAMEORIGIN");
            Response.Headers.Add("X-XSS-Protection", "1; mode=block");
            Response.Headers.Add("Referrer-Policy", "no-referrer-when-downgrade");
            Response.Headers.Add("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

            return new FileContentResult(responseBytes, "application/json");

        }


        [HttpPost("NFTsData")]
        public IActionResult SearchNFTTypes(GenericDto<NFTRequestDto>? nftDto)
        {

            var nftDtolist = NFTTypeService.GetNFTsData(nftDto);

            return Ok(nftDtolist);
        }

    }
}
