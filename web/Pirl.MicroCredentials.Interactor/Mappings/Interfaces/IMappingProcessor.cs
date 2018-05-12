namespace Pirl.MicroCredentials.Interactor.Mappings.Interfaces
{
    public interface IMappingProcessor
    {
        TDestination Map<TSource, TDestination>(TSource source);
    }
}