using ContactsManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContactsManager.Infrastructure;

public class ContactsContext : DbContext
{
    public DbSet<ContactEntity> Contacts { get; set; }

    public ContactsContext(DbContextOptions<ContactsContext> options) : base(options)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
        => modelBuilder.ApplyConfigurationsFromAssembly(typeof(ContactsContext).Assembly);
}
