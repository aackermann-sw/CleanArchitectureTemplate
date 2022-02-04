using Tsp.CustomerService.Application.DTOs.User;
using Tsp.CustomerService.Application.Wrappers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Tsp.CustomerService.Application.Interfaces.Shared
{
    public interface IUserService
    {
        string CurrentUserId { get; }
        string CurrentUsername { get; }

        Task<Response<UserDetailsResponse>> GetUserDetails(string userId);

    }
}
