namespace ChainImpactAPI.Dtos
{
    public class GenericDto<T> where T : class
    {
        public GenericDto()
        {

        }

        public GenericDto(T dto)
        {
            this.Dto = dto;
        }

        public GenericDto(int? pageNumber, int? pageSize, T? dto)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            Dto = dto;
        }

        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public T? Dto { get; set; }
    }
}


