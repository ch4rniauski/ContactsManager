FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY *.sln .
COPY ContactsManager.Api/*.csproj ContactsManager.Api/
COPY ContactsManager.Application/*.csproj ContactsManager.Application/
COPY ContactsManager.Domain/*.csproj ContactsManager.Domain/
COPY ContactsManager.Infrastructure/*.csproj ContactsManager.Infrastructure/
RUN dotnet restore

COPY . .
WORKDIR /app/ContactsManager.Api
RUN dotnet publish -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS run
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ContactsManager.Api.dll"]
