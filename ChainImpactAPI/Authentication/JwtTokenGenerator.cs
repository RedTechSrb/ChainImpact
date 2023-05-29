using ChainImpactAPI.Dtos.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.IdentityModel.Tokens.Jwt;
using System.Management;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ChainImpactAPI.Authentication
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        private readonly JwtSettings jwtSettings;

        public JwtTokenGenerator(IOptions<JwtSettings> jwtSettings)
        {
            this.jwtSettings = jwtSettings.Value;
        }

        public string GenerateJwtToken(JwtDto jwtDto)
        {
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(GetSuperSecretKey(jwtSettings.Secret))
                ),
                SecurityAlgorithms.HmacSha256
            );

            var claims = new[]
            {
                //new Claim(JwtRegisteredClaimNames.Name, /*user.Username*/ "boki"),
                //new Claim(JwtRegisteredClaimNames.Nonce, /*user.Username*/ "boki"), // ovo je password
                new Claim(JwtRegisteredClaimNames.Name, jwtDto.wallet),
//                new Claim(JwtRegisteredClaimNames.GivenName, createJWTDto.AppAuthToken), // ovo je appAuth token
//                new Claim("username", createJWTDto.username),
//                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
//                new Claim(ClaimTypes.Role, userType)
            };

            var securityToken = new JwtSecurityToken(
                issuer: jwtSettings.Issuer,
                expires: DateTime.UtcNow.AddHours(jwtSettings.ExpiryHours),
                audience: jwtSettings.Audience,
                claims: claims,
                signingCredentials: signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(securityToken);

        }

        //takes the value either from hardware id or jwt settings
        public static string GetSuperSecretKey(string backupSuperSecretKey)
        {
            //returns a 32 char value for key. IT HAS TO BE 32 bcs of crpythography algorithm
            try
            {
                return GetHardwareId()[..32];
            }
            catch (Exception e)
            {
                Log.Information("No super secret key", e);
            }

            return backupSuperSecretKey;
        }

        private static string GetHardwareId()
        {
            //tries to return JWT
            //on windows it wont work, it will return exception

            foreach (
                var managementClassName in new[]
                {
                    "Win32_DiskDrive",
                    "Win32_Processor",
                    "Win32_BaseBoard"
                }
            )
            {
                var managementClass = new ManagementClass(managementClassName);
                var managementObject = managementClass
                    .GetInstances()
                    .Cast<ManagementBaseObject>()
                    .First();
            }

            // Hash the values

            var hash = new SHA256Managed().ComputeHash(
                Encoding.UTF8.GetBytes(string.Join("", GetHardwareProperties()))
            );
            var hardwareId = string.Join("", hash.Select(x => x.ToString("X2")));

            return hardwareId;
        }

        private static IEnumerable<string> GetHardwareProperties()
        {
            foreach (
                var properties in new Dictionary<string, string[]>
                {
                    {
                        "Win32_DiskDrive",
                        new[] { "Model", "Manufacturer", "Signature", "TotalHeads" }
                    },
                    {
                        "Win32_Processor",
                        new[] { "UniqueId", "ProcessorId", "Name", "Manufacturer" }
                    },
                    { "Win32_BaseBoard", new[] { "Model", "Manufacturer", "Name", "SerialNumber" } }
                }
            )
            {
                var managementClass = new ManagementClass(properties.Key);
                var managementObject = managementClass
                    .GetInstances()
                    .Cast<ManagementBaseObject>()
                    .First();

                foreach (var prop in properties.Value)
                {
                    if (null != managementObject[prop])
                        yield return managementObject[prop].ToString();
                }
            }
        }

    }
}
