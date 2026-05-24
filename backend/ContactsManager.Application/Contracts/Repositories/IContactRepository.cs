using ContactsManager.Domain.Entities;

namespace ContactsManager.Application.Contracts.Repositories;

public interface IContactRepository
{
    Task<IList<ContactEntity>> GetAllAsync(CancellationToken ct = default);

    Task<ContactEntity?> GetByIdAsync(Guid id, CancellationToken ct = default);

    Task<bool> AddAsync(ContactEntity contact, CancellationToken ct = default);

    Task<bool> UpdateAsync(ContactEntity contact, CancellationToken ct = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}
