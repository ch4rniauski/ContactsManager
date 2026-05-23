using ContactsManager.Api.Extensions;
using ContactsManager.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddContactsContextConfiguration(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
}

app.MapControllers();

await app.ApplyMigrationsAsync();

await app.RunAsync();
