using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Easyvat.Api.RealTime;
using Easyvat.Common.Config;
using Easyvat.Model.Models;
using Easyvat.Services.DataServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.Swagger;

namespace Easyvat.Api
{
    public class Startup
    {
        private readonly ILogger logger;
        public IConfiguration Configuration { get; }
        //public bool IsDevelopment { get; set; }
        public bool Environment { get; set; }
        // string con;


        public Startup(IConfiguration configuration, IHostingEnvironment env, ILogger<Startup> logger)
        {
            //if (env.IsProduction())
            //{
            //    con = configuration.GetConnectionString("EasyvatDbConfigprod");
            //}
            //else if (env.IsStaging())
            //{
            //    con = configuration.GetConnectionString("EasyvatDbConfigstaging");
            //}
            //else if (env.IsDevelopment())
            //{
            //    con = configuration.GetConnectionString("EasyvatDbConfigstaging");
            //}
            Environment = env.IsStaging();
            Configuration = configuration;
            this.logger = logger;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            

            var authConfig = new AuthConfiguration();
            var storeConfig = new AzureStorageConfig();
            var localStorageConfig = new LocalStorageConfiguration();

            Configuration.Bind("Authorization", authConfig);
            Configuration.Bind("AzureStorage", storeConfig);
            Configuration.Bind("LocalStorage", localStorageConfig);

            services.AddSingleton(authConfig);
            services.AddSingleton(storeConfig);
            services.AddSingleton(localStorageConfig);

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddCors();

            services.AddOptions();

            services.AddSignalR();

            var connectionString = Environment ? Configuration.GetConnectionString("EasyvatDbConfigDev") : Configuration.GetConnectionString("EasyvatDbConfigprod");
            //var connectionString = con;
            services.AddDbContext<EasyvatContext>(options => options.UseSqlServer(connectionString));

            services.AddAutoMapper(typeof(Startup));

            //inject services
            services.AddScoped<MemberService>();
            services.AddScoped<PurchaseService>();
            services.AddScoped<PassportService>();
            services.AddScoped<ShopService>();
            services.AddScoped<ItemService>();
            services.AddScoped<TaxesService>();
            services.AddScoped<AccountService>();
            services.AddScoped<VisitService>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = authConfig.Issuer,
                    ValidAudience = authConfig.Audience,
                    ClockSkew = TimeSpan.Zero,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authConfig.SecurityKey))
                };
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Easyvat API", Version = "v1" });
            });

            services.AddMvc().AddJsonOptions(options =>
               options.SerializerSettings.ContractResolver = new DefaultContractResolver()
           );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.Use(async (ctx, next) =>
            {
                await next();
                if (ctx.Response.StatusCode == 204)
                {
                    ctx.Response.ContentLength = 0;
                }
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseMiddleware(typeof(ErrorHandlingMiddleware));

            app.UseAuthentication();

            app.UseHttpsRedirection();

            app.UseSignalR(routes =>
            {
                routes.MapHub<NotificationHub>("/notificationhub");
            });

            app.UseMvc();
        }
    }
}
