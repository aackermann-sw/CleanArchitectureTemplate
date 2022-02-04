﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Tsp.CustomerService.Application.Interfaces.Shared
{
    public interface IAuthenticatedUserService
    {
        string UserId { get; }
        public string Username { get; }
    }
}
