namespace Pirl.MicroCredentials.Interactor.Queries.Interfaces
{
    public interface IQueryProcessor
    {
        TResult Retrieve<TQuery, TResult>(TQuery query)
            where TQuery : IQuery<TResult>;
    }
}
