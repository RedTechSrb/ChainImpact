using ChainImpactAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChainImpactAPI.Dtos
{
    public class NFTOwnerDto
    {
        public NFTOwnerDto(
            int? id = null, 
            NFTTypeDto? nfttype = null, 
            ImpactorDto? impactor = null)
        {
            this.id = id;
            this.nfttype = nfttype;
            this.impactor = impactor;
        }

        public int? id { get; set; }
        public NFTTypeDto? nfttype { get; set; }
        public ImpactorDto? impactor { get; set; }
    }
}
