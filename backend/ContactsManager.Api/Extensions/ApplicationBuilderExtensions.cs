using ContactsManager.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace ContactsManager.Api.Extensions;

public static class ApplicationBuilderExtensions
{
    extension(IApplicationBuilder app)
    {
        public async Task ApplyMigrationsAsync()
        {
            await using var scope = app.ApplicationServices.CreateAsyncScope();

            await using var db = scope.ServiceProvider.GetRequiredService<ContactsContext>();

            await db.Database.MigrateAsync();
        }
    }
}
