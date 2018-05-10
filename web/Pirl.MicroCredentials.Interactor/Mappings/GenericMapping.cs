using AutoMapper;
using Pirl.MicroCredentials.Core.Models.Interfaces;

namespace Pirl.MicroCredentials.Interactor.Mappings
{
    public class GenericMapping<TSource, TDestination> : IMappingHandler<TSource, TDestination>
    {
        public GenericMapping()
        {
            Mapper.CreateMap<TSource, TDestination>();
        }

        public TDestination Map(TSource source)
        {
            return Mapper.Map<TDestination>(source);
        }

        public TDestination Map(TSource source, TDestination destination)
        {
            Mapper.Map(source, destination);

            return destination;
        }
    }
}
