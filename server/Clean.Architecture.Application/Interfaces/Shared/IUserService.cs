using Clean.Architecture.Application.DTOs.User;
using Clean.Architecture.Application.Wrappers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Clean.Architecture.Application.Interfaces.Shared
{
    public interface IUserService
    {
        string CurrentUserId { get; }
        string CurrentUsername { get; }

        Task<Response<UserDetailsResponse>> GetUserDetails(string userId);

    }
}
