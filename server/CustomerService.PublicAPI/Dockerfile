#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS dev
WORKDIR /src
COPY ["CustomerService.PublicAPI/Tsp.CustomerService.PublicAPI.csproj", "CustomerService.PublicAPI/"]
COPY ["CustomerService.Infrastructure.Persistence/Tsp.CustomerService.Infrastructure.Persistence.csproj", "CustomerService.Infrastructure.Persistence/"]
COPY ["CustomerService.Domain/Tsp.CustomerService.Domain.csproj", "CustomerService.Domain/"]
COPY ["CustomerService.Application/Tsp.CustomerService.Application.csproj", "CustomerService.Application/"]
COPY ["CustomerService.Infrastructure.Shared/Tsp.CustomerService.Infrastructure.Shared.csproj", "CustomerService.Infrastructure.Shared/"]
RUN dotnet restore "CustomerService.PublicAPI/Tsp.CustomerService.PublicAPI.csproj"
COPY . .
WORKDIR "/src/CustomerService.PublicAPI"

ENTRYPOINT [ "dotnet", "watch", "run", "--no-launch-profile" ]



FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["CustomerService.PublicAPI/Tsp.CustomerService.PublicAPI.csproj", "CustomerService.PublicAPI/"]
COPY ["CustomerService.Infrastructure.Persistence/Tsp.CustomerService.Infrastructure.Persistence.csproj", "CustomerService.Infrastructure.Persistence/"]
COPY ["CustomerService.Domain/Tsp.CustomerService.Domain.csproj", "CustomerService.Domain/"]
COPY ["CustomerService.Application/Tsp.CustomerService.Application.csproj", "CustomerService.Application/"]
COPY ["CustomerService.Infrastructure.Shared/Tsp.CustomerService.Infrastructure.Shared.csproj", "CustomerService.Infrastructure.Shared/"]
RUN dotnet restore "CustomerService.PublicAPI/Tsp.CustomerService.PublicAPI.csproj"
COPY . .
WORKDIR "/src/CustomerService.PublicAPI"
RUN dotnet build "Tsp.CustomerService.PublicAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Tsp.CustomerService.PublicAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Tsp.CustomerService.PublicAPI.dll"]