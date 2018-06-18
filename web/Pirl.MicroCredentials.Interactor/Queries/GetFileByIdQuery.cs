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
    public class GetFileByIdQuery : IQuery<File>
    {
        public int Id { get; set; }
    }

    public class GetFileByIdQueryHandler : IQueryHandler<GetFileByIdQuery, File>
    {
        private readonly IFileRepository _fileRepository;

        public GetFileByIdQueryHandler(IFileRepository fileRepository)
        {
            _fileRepository = fileRepository;
        }

        public File Retrieve(GetFileByIdQuery query)
        {
            return _fileRepository.GetById(query.Id);
        }
    }
}
