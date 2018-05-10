namespace Pirl.MicroCredentials.Core.Models.Interfaces
{
    public interface IMappingHandler<in TSource, TDestination>
    {
        TDestination Map(TSource source);
        TDestination Map(TSource source, TDestination destination);
    }
}