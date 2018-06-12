using System.Web.Http;
using System.Web.Mvc;
using CommonServiceLocator;
using Pirl.MicroCredentials.Core.Contracts;
using Pirl.MicroCredentials.Core.Contracts.Interfaces;
using Pirl.MicroCredentials.Core.Models;
using Pirl.MicroCredentials.Core.Models.Interfaces;
using Pirl.MicroCredentials.Core.Repositories.Interfaces;
using Pirl.MicroCredentials.DbRead.DataModels;
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
            var web3 = new Nethereum.Web3.Web3("http://localhost:8545");

            //Service Locator
            var serviceLocator = new UnityServiceLocator(container);
            container.RegisterInstance<IServiceLocator>(serviceLocator);

            //Web3 Object
            container.RegisterInstance(web3);

            //Contracts
            container.RegisterType<IMicroCredentialContract, MicroCredentialContract>();
            container.RegisterType<IUserContract, UserContract>();
            container.RegisterType<ICredentialsContract, CredentialsContract>();
            container.RegisterType<IFilesContract, FilesContract>();
            container.RegisterType<IUserSubmissionsContract, UserSubmissionsContract>();

            //Repositories
            container.RegisterType<IAgencyRepository, AgencyRepository>();
            container.RegisterType<IUserRepository, UserRepository>();
            container.RegisterType<ICredentialsRepository, CredentialsRepository>();
            container.RegisterType<IFileRepository, FileRepository>();
            container.RegisterType<IUserSubmissionRepository, UserSubmissionRepository>();

            //DataModels
            container.RegisterInstance<IMappingHandler<AgencyDataModel, Agency>>(new GenericMapping<AgencyDataModel, Agency>());
            container.RegisterInstance<IMappingHandler<UserDataModel, User>>(new GenericMapping<UserDataModel, User>());
            container.RegisterInstance<IMappingHandler<CredentialViewModel, Credential>>(new GenericMapping<CredentialViewModel, Credential>());
            container.RegisterInstance<IMappingHandler<FileDataModel, File>>(new GenericMapping<FileDataModel, File>());
            container.RegisterInstance<IMappingHandler<UserSubmissionDataModel, UserSubmission>>(new GenericMapping<UserSubmissionDataModel, UserSubmission>());

            //Processors
            container.RegisterType<IQueryProcessor, QueryProcessor>();
            container.RegisterType<IMappingProcessor, MappingProcessor>();

            //Queries
            container.RegisterType<IQueryHandler<GetAgencyByAddressQuery, Agency>, GetAgencyByAddressQueryHandler>();
            container.RegisterType<IQueryHandler<GetAgenciesQuery, Agency[]>, GetAgenciesQueryHandler>();
            container.RegisterType<IQueryHandler<GetUserByAddressQuery, User>, GetUserByAddressQueryHandler>();
            container.RegisterType<IQueryHandler<GetUsersQuery, User[]>, GetUsersQueryHandler>();
            container.RegisterType<IQueryHandler<GetCredentialsByAgencyQuery, Credential[]>, GetCredentialsByAgencyQueryHandler>();
            container.RegisterType<IQueryHandler<GetFileByIdQuery, File>, GetFileByIdQueryHandler>();
            container.RegisterType<IQueryHandler<GetSubmissionByIdQuery, UserSubmission>, GetSubmissionByIdQueryHandler>();

            //Mappings
            container.RegisterInstance<IMappingHandler<Agency, AgencyViewModel>>(new GenericMapping<Agency, AgencyViewModel>());
            container.RegisterInstance<IMappingHandler<User, UserViewModel>>(new GenericMapping<User, UserViewModel>());
            container.RegisterInstance<IMappingHandler<Credential, CredentialViewModel>>(new GenericMapping<Credential, CredentialViewModel>());
            container.RegisterInstance<IMappingHandler<File, FileViewModel>>(new GenericMapping<File, FileViewModel>());
            container.RegisterInstance<IMappingHandler<UserSubmission, UserSubmissionViewModel>>(new GenericMapping<UserSubmission, UserSubmissionViewModel>());

            return container;
        }
    }
}