using CommonServiceLocator;
using Pirl.MicroCredentials.Core.Models.Interfaces;
using Pirl.MicroCredentials.Interactor.Mappings.Interfaces;

namespace Pirl.MicroCredentials.Interactor.Mappings
{
    public class MappingProcessor : IMappingProcessor
    {
        private readonly IServiceLocator _serviceLocator;

        public MappingProcessor(IServiceLocator serviceLocator)
        {
            _serviceLocator = serviceLocator;
        }

        public TDestination Map<TSource, TDestination>(TSource source)
        {
            var handler = _serviceLocator.GetInstance<IMappingHandler<TSource, TDestination>>();

            return handler.Map(source);
        }
    }
}