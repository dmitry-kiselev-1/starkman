using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Starkman.Backend.WebApi.Middleware
{
    public class TokenMiddleware
    {
        private readonly RequestDelegate _next;

        private static readonly string Token;
        private static readonly bool TokenIsOn;

        static TokenMiddleware()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            var configuration = builder.Build();

            TokenMiddleware.TokenIsOn = bool.Parse(configuration["X-XSRF-TOKEN-ON"]);
            TokenMiddleware.Token = configuration["X-XSRF-TOKEN"];
        }

        public TokenMiddleware(RequestDelegate next)
        {
            this._next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var requestToken = context.Request.Headers["X-XSRF-TOKEN"];

            if (TokenMiddleware.TokenIsOn && !requestToken.Any())
            {
                //ToDo: 
                //context.Response.Redirect("authorization page", false);

                context.Response.StatusCode = (int) HttpStatusCode.Forbidden;
                await context.Response.WriteAsync("Token is missing");
            }
            if (TokenMiddleware.TokenIsOn && requestToken != TokenMiddleware.Token)
            {
                context.Response.StatusCode = (int) HttpStatusCode.Forbidden;
                await context.Response.WriteAsync("Token is invalid");
            }
            else
            {
                await _next.Invoke(context);
            }
        }
    }
}
