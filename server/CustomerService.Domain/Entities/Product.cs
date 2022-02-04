﻿using Tsp.CustomerService.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Tsp.CustomerService.Domain.Entities
{
    public class Product : AuditableEntityBase
    {
        public string Name { get; set; }
        public string Barcode { get; set; }
        public string Description { get; set; }
        public decimal Rate { get; set; }
    }
}
