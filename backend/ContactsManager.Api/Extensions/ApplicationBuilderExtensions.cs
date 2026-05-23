using ContactsManager.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace ContactsManager.Api.Extensions;

public static class ApplicationBuilderExtensions
{
    public static async Task ApplyMigrationsAsync(this IApplicationBuilder app)
    {
        await using var scope = app.ApplicationServices.CreateAsyncScope();

        await using var db = scope.ServiceProvider.GetRequiredService<ContactsContext>();

        await db.Database.MigrateAsync();
    }
}
