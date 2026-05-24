using ContactsManager.Application.Contracts.Repositories;
using ContactsManager.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ContactsManager.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    extension(IServiceCollection services)
    {
        public IServiceCollection AddContactsContextConfiguration(IConfiguration configuration)
        {
            services.AddDbContext<ContactsContext>(opt => 
                opt.UseNpgsql(configuration.GetConnectionString("ContactsDb"))
            );

            services.AddScoped<IContactRepository, ContactRepository>();
            
            return services;
        }
    }
}
