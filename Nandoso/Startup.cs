using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Nandoso.Startup))]
namespace Nandoso
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
