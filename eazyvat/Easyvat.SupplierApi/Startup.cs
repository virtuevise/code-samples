using AutoMapper;
using Easyvat.Common.Config;
using Easyvat.Model.Models;
using Easyvat.Services.DataServices;
using Easyvat.SupplierApi.RealTime;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Swagger;

namespace Easyvat.SupplierApi
{
    public class Startup
    {
        public bool IsDevelopment { get; set; }
        public bool Environment { get; set; }
        string con;
        public Startup(IConfiguration configuration, IHostingEnvironment env, ILogger<Startup> logger)
        {

            if (env.IsProduction())
            {
                con = configuration.GetConnectionString("EasyvatDbConfigprod");
            }
            else if (env.IsStaging())
            {
                con = configuration.GetConnectionString("EasyvatDbConfigDev");
            }
            else if (env.IsDevelopment())
            {
                con = configuration.GetConnectionString("EasyvatDbConfigDev");
            }

            //IsDevelopment = env.IsDevelopment();
            Environment = env.IsStaging();
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var taxConfig = new TaxConfiguration();

            Configuration.Bind("Tax", taxConfig);

            services.AddSingleton(taxConfig);

            services.AddCors();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2); services.AddCors();

            services.AddOptions();

            services.AddSignalR();

            //var connectionString = Environment ? Configuration.GetConnectionString("EasyvatDbConfigDev") : Configuration.GetConnectionString("EasyvatDbConfigprod");
            string connectionString = con;
            services.AddDbContext<EasyvatContext>(options => options.UseSqlServer(connectionString));

            services.AddAutoMapper(typeof(Startup));

            //inject services
            services.AddScoped<PurchaseService>();
            services.AddScoped<PassportService>();
            services.AddScoped<ShopService>();
            services.AddScoped<ItemService>();
            services.AddScoped<TaxesService>();
            services.AddScoped<AccountService>();
            services.AddScoped<ListService>();
            services.AddScoped<PaymentServices>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Easyvat API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.Use(async (httpContext, next) =>
            {
                await next();
                if (httpContext.Response.StatusCode == 204)
                {
                    httpContext.Response.ContentLength = 0;
                }
            });

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

            app.UseHttpsRedirection();

            app.UseSignalR(routes =>
            {
                routes.MapHub<NotificationHub>("/notificationhub");
            });

            app.UseMvc();
        }
    }
}
