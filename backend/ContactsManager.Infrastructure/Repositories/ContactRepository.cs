using ContactsManager.Application.Contracts.Repositories;
using ContactsManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContactsManager.Infrastructure.Repositories;

internal sealed class ContactRepository : IContactRepository
{
    private readonly ContactsContext _context;

    public ContactRepository(ContactsContext context)
    {
        _context = context;
    }

    public async Task<IList<ContactEntity>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Contacts
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<ContactEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await _context.Contacts.FindAsync([id], cancellationToken);

    public async Task<bool> AddAsync(ContactEntity contact, CancellationToken cancellationToken = default)
    {
        await _context.Contacts.AddAsync(contact, cancellationToken);
        
        return await _context.SaveChangesAsync(cancellationToken) > 0;
    }

    public async Task<bool> UpdateAsync(ContactEntity contact, CancellationToken cancellationToken = default)
    {
        _context.Update(contact);
        
        return await _context.SaveChangesAsync(cancellationToken) > 0;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Contacts
            .Where(c => c.Id == id)
            .ExecuteDeleteAsync(cancellationToken) > 0;
    }
}
