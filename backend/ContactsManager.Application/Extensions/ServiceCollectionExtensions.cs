using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace ContactsManager.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddMediatrConfiguration(this IServiceCollection services)
    {
        services.AddMediatR(conf =>
        {
            conf.RegisterServicesFromAssembly(typeof(ServiceCollectionExtensions).Assembly);
        });
        
        return services;
    }

    public static IServiceCollection AddValidationConfiguration(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(typeof(ServiceCollectionExtensions).Assembly);
        
        return services;
    }
}
