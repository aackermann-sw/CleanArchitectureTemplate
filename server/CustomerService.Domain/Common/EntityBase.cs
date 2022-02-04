using System;
using System.Collections.Generic;
using System.Text;

namespace Tsp.CustomerService.Domain.Common
{
    public abstract class EntityBase
    {
        public virtual int Id { get; set; }
        public bool IsDeleted { get; set; }
    }
}
