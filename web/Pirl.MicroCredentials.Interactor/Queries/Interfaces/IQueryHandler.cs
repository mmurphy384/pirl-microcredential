using System.Threading.Tasks;

namespace Pirl.MicroCredentials.Interactor.Queries.Interfaces
{
    public interface IQueryHandler { }

    public interface IQueryHandler<in TQuery, out TResult> : IQueryHandler
        where TQuery : IQuery<TResult>
    {
        TResult Retrieve(TQuery query);
    }
}
