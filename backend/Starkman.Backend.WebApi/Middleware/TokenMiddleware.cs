using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Starkman.Backend.WebApi.Middleware
{
    public class TokenMiddleware
    {
        private readonly RequestDelegate _next;

        public TokenMiddleware(RequestDelegate next)
        {
            this._next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var token = context.Request.Headers["Token"];

            if (!token.Any())
            {
                context.Response.Redirect("authorization page", false);
            }
            if (token != "ApiToken1")
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync("ApiToken is invalid");
            }
            else
            {
                await _next.Invoke(context);
            }
        }
    }
}
