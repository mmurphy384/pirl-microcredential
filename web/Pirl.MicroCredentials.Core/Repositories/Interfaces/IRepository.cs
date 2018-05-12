﻿using System.Collections.Generic;

namespace Pirl.MicroCredentials.Core.Repositories.Interfaces
{
    public interface IRepository<TEntity, TId> where TEntity : class
    {
        TEntity GetById(TId id);

        IEnumerable<TEntity> GetAll();
    }
}
