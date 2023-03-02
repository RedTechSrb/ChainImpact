namespace ChainImpactAPI.Dtos
{
    public class GenericDto<T> where T : class
    {
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public T? Dto { get; set; }
    }
}


