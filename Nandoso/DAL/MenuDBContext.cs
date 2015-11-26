using Nandoso.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using MySql.Data.Entity;

namespace Nandoso.DAL
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class NandosoDBContext : DbContext
    {

        public NandosoDBContext() : base("NandosoDBContext")
        {
        }

        public DbSet<menu> Menus { get; set; }

        public DbSet<Feedback> messages { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}