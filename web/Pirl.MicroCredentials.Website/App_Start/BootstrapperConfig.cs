using System.Web.Http;
using System.Web.Mvc;
using CommonServiceLocator;
using Pirl.MicroCredentials.Core.Contracts;
using Pirl.MicroCredentials.Core.Contracts.Interfaces;
using Pirl.MicroCredentials.Core.Models;
using Pirl.MicroCredentials.Core.Models.Interfaces;
using Pirl.MicroCredentials.Core.Repositories.Interfaces;
using Pirl.MicroCredentials.DbRead.Repositories;
using Pirl.MicroCredentials.Interactor.Mappings;
using Pirl.MicroCredentials.Interactor.Mappings.Interfaces;
using Pirl.MicroCredentials.Interactor.Queries;
using Pirl.MicroCredentials.Interactor.Queries.Interfaces;
using Pirl.MicroCredentials.Models;
using Unity;
using Unity.AspNet.Mvc;
using Unity.ServiceLocation;

namespace Pirl.MicroCredentials
{
    public class BootstrapperConfig
    {
        public static IUnityContainer Initialise()
        {
            var container = BuildUnityContainer();

            GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));

            return container;
        }

        private static IUnityContainer BuildUnityContainer()
        {
            var container = new UnityContainer();

            //Service Locator
            var serviceLocator = new UnityServiceLocator(container);
            container.RegisterInstance<IServiceLocator>(serviceLocator);

            //Contracts
            container.RegisterType<IMicroCredentialContract, MicroCredentialContract>();
            container.RegisterType<IUserContract, UserContract>();

            //Repositories
            container.RegisterType<IAgencyRepository, AgencyRepository>();
            container.RegisterType<IUserRepository, UserRepository>();

            //Processors
            container.RegisterType<IQueryProcessor, QueryProcessor>();
            container.RegisterType<IMappingProcessor, MappingProcessor>();

            //Queries
            container.RegisterType<IQueryHandler<GetAgencyQuery, Agency>, GetAgencyQueryHandler>();
            container.RegisterType<IQueryHandler<GetAgenciesQuery, Agency[]>, GetAgenciesQueryHandler>();
            container.RegisterType<IQueryHandler<GetUserQuery, User>, GetUserQueryHandler>();
            container.RegisterType<IQueryHandler<GetUsersQuery, User[]>, GetUsersQueryHandler>();

            //Mappings
            container.RegisterInstance<IMappingHandler<AgencyViewModel, Agency>>(new GenericMapping<AgencyViewModel, Agency>());
            container.RegisterInstance<IMappingHandler<UserViewModel, User>>(new GenericMapping<UserViewModel, User>());

            return container;
        }
    }
}