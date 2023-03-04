using ChainImpactAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChainImpactAPI.Dtos.SearchDtos
{
    public class NFTTypeSearchDto
    {
        public NFTTypeSearchDto()
        {
            this.tier = null;
            this.usertype = null;
            this.causetype = null;
        }

        public NFTTypeSearchDto(int? tier, int? usertype, CauseTypeDto? causetype)
        {
            this.tier = null;
            this.usertype = null;
            this.causetype = null;
        }

        public int? tier { get; set; }
        public int? usertype { get; set; }
        public CauseTypeDto? causetype { get; set; }
    }
}