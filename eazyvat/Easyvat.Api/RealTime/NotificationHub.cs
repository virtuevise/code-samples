using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Easyvat.Api.RealTime
{
    public class NotificationHub : Hub
    {
        //public async Task SendRefreshPurchaseView(string passportId)
        //{
        //    await Clients.Group(passportId).SendAsync("RefreshPurchaseView");
        //}

        public async Task AddToPassportGroup(string passportId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, passportId);
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}
