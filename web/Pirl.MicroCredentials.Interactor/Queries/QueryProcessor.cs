using CommonServiceLocator;
using Pirl.MicroCredentials.Interactor.Queries.Interfaces;

namespace Pirl.MicroCredentials.Interactor.Queries
{
    public class QueryProcessor : IQueryProcessor
    {
        private readonly IServiceLocator _serviceLocator;

        public QueryProcessor(IServiceLocator serviceLocator)
        {
            _serviceLocator = serviceLocator;
        }

        public TResult Retrieve<TQuery, TResult>(TQuery query)
            where TQuery : IQuery<TResult>
        {
            var handler = _serviceLocator.GetInstance<IQueryHandler<TQuery, TResult>>();

            return handler.Retrieve(query);
        }
    }
}
