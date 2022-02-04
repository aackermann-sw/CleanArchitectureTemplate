#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS dev
WORKDIR /src
COPY ["Clean.Architecture.PublicAPI/Clean.Architecture.PublicAPI.csproj", "Clean.Architecture.PublicAPI/"]
COPY ["Clean.Architecture.Infrastructure.Persistence/Clean.Architecture.Infrastructure.Persistence.csproj", "Clean.Architecture.Infrastructure.Persistence/"]
COPY ["Clean.Architecture.Domain/Clean.Architecture.Domain.csproj", "Clean.Architecture.Domain/"]
COPY ["Clean.Architecture.Application/Clean.Architecture.Application.csproj", "Clean.Architecture.Application/"]
COPY ["Clean.Architecture.Infrastructure.Shared/Clean.Architecture.Infrastructure.Shared.csproj", "Clean.Architecture.Infrastructure.Shared/"]
RUN dotnet restore "Clean.Architecture.PublicAPI/Clean.Architecture.PublicAPI.csproj"
COPY . .
WORKDIR "/src/Clean.Architecture.PublicAPI"

ENTRYPOINT [ "dotnet", "watch", "run", "--no-launch-profile" ]



FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Clean.Architecture.PublicAPI/Clean.Architecture.PublicAPI.csproj", "Clean.Architecture.PublicAPI/"]
COPY ["Clean.Architecture.Infrastructure.Persistence/Clean.Architecture.Infrastructure.Persistence.csproj", "Clean.Architecture.Infrastructure.Persistence/"]
COPY ["Clean.Architecture.Domain/Clean.Architecture.Domain.csproj", "Clean.Architecture.Domain/"]
COPY ["Clean.Architecture.Application/Clean.Architecture.Application.csproj", "Clean.Architecture.Application/"]
COPY ["Clean.Architecture.Infrastructure.Shared/Clean.Architecture.Infrastructure.Shared.csproj", "Clean.Architecture.Infrastructure.Shared/"]
RUN dotnet restore "Clean.Architecture.PublicAPI/Clean.Architecture.PublicAPI.csproj"
COPY . .
WORKDIR "/src/Clean.Architecture.PublicAPI"
RUN dotnet build "Clean.Architecture.PublicAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Clean.Architecture.PublicAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Clean.Architecture.PublicAPI.dll"]