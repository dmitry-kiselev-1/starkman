FROM microsoft/dotnet:2.0.5-runtime-jessie

# set up network
ENV ASPNETCORE_URLS http://+:80
ENV ASPNETCORE_PKG_VERSION 2.0.5

# set up the runtime store
RUN for version in '2.0.0' '2.0.3' '2.0.5'; do \
        curl -o /tmp/runtimestore.tar.gz https://dist.asp.net/runtimestore/$version/linux-x64/aspnetcore.runtimestore.tar.gz \
        && export DOTNET_HOME=$(dirname $(readlink $(which dotnet))) \
        && tar -x -C $DOTNET_HOME -f /tmp/runtimestore.tar.gz \
        && rm /tmp/runtimestore.tar.gz; \
    done

FROM microsoft/aspnetcore
WORKDIR /app
COPY ./bin/Release/PublishOutput/*.* ./

RUN mkdir -p /app/assets

EXPOSE 80
ENTRYPOINT ["dotnet", "Starkman.Backend.WebApi.dll"]

#old build commands:
#FROM microsoft/aspnetcore:2.0 AS base
#WORKDIR /app
#EXPOSE 80
#
#FROM microsoft/aspnetcore-build:2.0 AS build
#WORKDIR /src
#COPY *.sln ./
#COPY Starkman.Backend.WebApi/Starkman.Backend.WebApi.csproj Starkman.Backend.WebApi/
#RUN dotnet restore
#COPY . .
#WORKDIR /src/Starkman.Backend.WebApi
#RUN dotnet build -c Release -o /app
#
#FROM build AS publish
#RUN dotnet publish -c Release -o /app
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app .
#ENTRYPOINT ["dotnet", "Starkman.Backend.WebApi.dll"]