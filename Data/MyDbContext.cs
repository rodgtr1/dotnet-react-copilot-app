using Microsoft.EntityFrameworkCore;
using reactnet.Models;

namespace reactnet.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }
        public DbSet<Note> Notes { get; set; }
    }
}