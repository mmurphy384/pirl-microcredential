using System.Web.Http;
using System.Web.Mvc;
using CommonServiceLocator;
using Pirl.MicroCredentials.Interactor.Mappings;
using Pirl.MicroCredentials.Interactor.Mappings.Interfaces;
using Pirl.MicroCredentials.Interactor.Queries;
using Pirl.MicroCredentials.Interactor.Queries.Interfaces;
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

            //Repositories
            //container.RegisterType<IAgencyRepository, AgencyRepository>();

            //Processors
            container.RegisterType<IQueryProcessor, QueryProcessor>();
            container.RegisterType<IMappingProcessor, MappingProcessor>();

            //Queries
            //container.RegisterType<IQueryHandler<GetAgencyQuery, AgencyDto>, GetAgencyQueryHandler>();

            //Mappings
            //container.RegisterInstance<IMappingHandler<AgencyViewModel, AgencyDto>>(new GenericMapping<AgencyViewModel, AgencyDto>());

            return container;
        }
    }
}