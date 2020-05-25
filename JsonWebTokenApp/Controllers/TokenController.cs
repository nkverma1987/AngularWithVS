using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JsonWebTokenApp.Controllers
{
    public class TokenController : ControllerBase
    {
        private const string SECRET_KEY = "abcde";
        public static readonly SymmetricSecurityKey SIGNING_KEY = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenController.SECRET_KEY));

        [HttpGet("api/Token/{username}/{password}")]
        public IActionResult Get(string username, string password)
        {
            if (username == password)
                return new ObjectResult(GenerateTone(username));
            else
                return BadRequest();
        }

        private object GenerateTone(string username)
        {
            var token = new JwtSecurityToken(
                claims: new Claim[]
                    {
                        new Claim(ClaimTypes.Name,username)
                    },
                notBefore: new DateTimeOffset(DateTime.Now).DateTime,
                expires: new DateTimeOffset(DateTime.Now.AddMinutes(60)).DateTime,
                signingCredentials:new SigningCredentials(SIGNING_KEY,SecurityAlgorithms.HmacSha256)
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
