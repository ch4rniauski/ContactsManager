using ContactsManager.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
}

app.MapControllers();

await app.ApplyMigrationsAsync();

await app.RunAsync();
