using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pirl.MicroCredentials.Core.Models;
using Pirl.MicroCredentials.Core.Repositories.Interfaces;
using Pirl.MicroCredentials.Interactor.Mappings.Interfaces;
using Pirl.MicroCredentials.Interactor.Queries.Interfaces;

namespace Pirl.MicroCredentials.Interactor.Queries
{
    public class GetSubmissionByIdQuery : IQuery<UserSubmission>
    {
        public int Id { get; set; }
    }

    public class GetSubmissionByIdQueryHandler : IQueryHandler<GetSubmissionByIdQuery, UserSubmission>
    {
        private readonly IUserSubmissionRepository _submissionRepository;

        public GetSubmissionByIdQueryHandler(IUserSubmissionRepository submissionRepository)
        {
            _submissionRepository = submissionRepository;
        }

        public UserSubmission Retrieve(GetSubmissionByIdQuery query)
        {
            return _submissionRepository.GetById(query.Id);
        }
    }
}
