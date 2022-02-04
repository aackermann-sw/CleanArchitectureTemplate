using Clean.Architecture.Application.DTOs.User;
using Clean.Architecture.Application.Exceptions;
using Clean.Architecture.Application.Interfaces.Shared;
using Clean.Architecture.Application.Wrappers;
using Clean.Architecture.Infrastructure.Persistence.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Clean.Architecture.PublicAPI.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public UserService(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            CurrentUserId = httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");
            CurrentUsername = "";
        }

        public string CurrentUserId { get; }

        public string CurrentUsername { get; }

        public async Task<Response<UserDetailsResponse>> GetUserDetails(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if(user==null) throw new NotFoundException($"{nameof(ApplicationUser)} - {userId}");
            var response =  new UserDetailsResponse
            {
                FirstName = user.FirstName,
                LastName = user.LastName
            };
            return new Response<UserDetailsResponse> { Data = response };

        }
    }
}
