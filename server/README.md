dotnet ef --startup-project Clean.Architecture.PublicApi/ migrations add Initial -p Clean.Architecture.Infrastructure.Persistence  --context ApplicationContext
dotnet ef --startup-project Clean.Architecture.PublicApi/ migrations add Initial -p Clean.Architecture.Infrastructure.Persistence  --context IdentityContext
