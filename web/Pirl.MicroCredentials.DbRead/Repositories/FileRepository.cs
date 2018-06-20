using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nethereum.Contracts;
using Nethereum.Web3;
using Pirl.MicroCredentials.Core.Contracts.Interfaces;
using Pirl.MicroCredentials.Core.Models;
using Pirl.MicroCredentials.Core.Repositories.Interfaces;
using Pirl.MicroCredentials.DbRead.DataModels;
using Pirl.MicroCredentials.Interactor.Mappings.Interfaces;

namespace Pirl.MicroCredentials.DbRead.Repositories
{
    public class FileRepository : IFileRepository
    {
        private readonly Web3 _web3;
        private readonly IMappingProcessor _mappingProcessor;
        private readonly Contract _contract;

        public FileRepository(IMappingProcessor mappingProcessor, IFilesContract filesContract, Web3 web3)
        {
            _web3 = web3;
            _mappingProcessor = mappingProcessor;
            _contract = web3.Eth.GetContract(filesContract.GetContractAbi(), filesContract.GetContractAddress());
        }

        public File GetById(int id)
        {
            var fileDataModel = _contract.GetFunction("getFileById").CallDeserializingToObjectAsync<FileDataModel>(id).Result;

            return _mappingProcessor.Map<FileDataModel, File>(fileDataModel);
        }

        public IEnumerable<File> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
