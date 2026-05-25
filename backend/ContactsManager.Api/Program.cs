using ContactsManager.Api.Extensions;
using ContactsManager.Application.Extensions;
using ContactsManager.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services
    .AddContactsContextConfiguration(builder.Configuration)
    .AddMediatrConfiguration()
    .AddValidationConfiguration()
    .AddAutoMapperConfiguration();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
}

app.UseCors();

app.MapControllers();

await app.ApplyMigrationsAsync();

await app.RunAsync();
