using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FilesManager.Core.Models;
using FilesManager.Core.Requets;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace FilesManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuentasController : ControllerBase
    {
        private readonly UserManager<AppUser> _manager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IConfiguration _configuration;

        public CuentasController( 
                                  UserManager<AppUser> manager,
                                  SignInManager<AppUser> signInManager,
                                  IConfiguration configuration)
        {
            this._manager = manager;
            this._signInManager = signInManager;
            this._configuration = configuration;
        }

        [HttpPost("registro")]
        public async Task<ActionResult<UserToken>> RegisterUser([FromBody] UserRequest request)
        {
            var user = new AppUser
            {
                UserName = request.Email,
                Email = request.Email
            };

            try
            {
                var result = await _manager.CreateAsync(user, request.Password);
                if (result.Succeeded)
                {
                    return BuildToken(request);
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            } catch(Exception ex)
            {
                return BadRequest(ex);
            }


        }

        [HttpPost("login")]
        public async Task<ActionResult<UserToken>> LogIn([FromBody] UserRequest request)
        {
            try
            {
                var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, isPersistent: false, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    return BuildToken(request);
                }
                else
                {
                    return BadRequest("Invalid login attempt.");
                }

            }catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        private UserToken BuildToken(UserRequest request)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, request.Email),
                new Claim("FileManger", "Gestor de archivos"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:KEY"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddHours(1);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: expiration,
                signingCredentials: creds
            );

            return new UserToken()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            }; 
        }

    }
}