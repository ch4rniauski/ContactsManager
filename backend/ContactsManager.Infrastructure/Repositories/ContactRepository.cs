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

    public async Task<IList<ContactEntity>> GetAllAsync(CancellationToken ct = default)
    {
        return await _context.Contacts
            .AsNoTracking()
            .ToListAsync(ct);
    }

    public async Task<ContactEntity?> GetByIdAsync(Guid id, CancellationToken ct = default)
        => await _context.Contacts.FindAsync([id], ct);

    public async Task<bool> AddAsync(ContactEntity contact, CancellationToken ct = default)
    {
        await _context.Contacts.AddAsync(contact, ct);
        
        return await _context.SaveChangesAsync(ct) > 0;
    }

    public async Task<bool> UpdateAsync(ContactEntity contact, CancellationToken ct = default)
    {
        _context.Update(contact);
        
        return await _context.SaveChangesAsync(ct) > 0;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        return await _context.Contacts
            .Where(c => c.Id == id)
            .ExecuteDeleteAsync(ct) > 0;
    }
}
