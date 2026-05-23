using ContactsManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ContactsManager.Infrastructure.Configurations;

internal sealed class ContactEntityConfiguration : IEntityTypeConfiguration<ContactEntity>
{
    public void Configure(EntityTypeBuilder<ContactEntity> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(contact => contact.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(contact => contact.MobilePhone)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(contact => contact.JobTitle)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(contact => contact.BirthDate)
            .IsRequired();
    }
}
