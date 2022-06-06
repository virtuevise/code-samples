#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM microsoft/dotnet:2.2-aspnetcore-runtime-nanoserver-1803 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk-nanoserver-1803 AS build
WORKDIR /src
COPY ["Easyvat.Api/Easyvat.Api.csproj", "Easyvat.Api/"]
RUN dotnet restore "Easyvat.Api/Easyvat.Api.csproj"
COPY . .
WORKDIR "/src/Easyvat.Api"
RUN dotnet build "Easyvat.Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Easyvat.Api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Easyvat.Api.dll"]