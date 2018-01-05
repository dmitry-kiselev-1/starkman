using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Starkman.Backend.WebApi.Middleware
{
    public class TokenMiddleware
    {
        private readonly RequestDelegate _next;

        private static readonly string Token;

        static TokenMiddleware()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            var configuration = builder.Build();

            TokenMiddleware.Token = configuration["X-XSRF-TOKEN"];
        }

        public TokenMiddleware(RequestDelegate next)
        {
            this._next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var token = context.Request.Headers["X-XSRF-TOKEN"];

            if (!token.Any())
            {
                //context.Response.Redirect("authorization page", false);
            }
            if (token != TokenMiddleware.Token)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync("Token is invalid");
            }
            else
            {
                await _next.Invoke(context);
            }
        }
    }
}
