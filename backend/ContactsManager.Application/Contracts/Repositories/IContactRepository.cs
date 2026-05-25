using ContactsManager.Domain.Entities;

namespace ContactsManager.Application.Contracts.Repositories;

public interface IContactRepository
{
    Task<IList<ContactEntity>> GetAllAsync(CancellationToken cancellationToken = default);

    Task<IList<ContactEntity>> SearchAsync(string searchText, CancellationToken cancellationToken = default);

    Task<ContactEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<bool> AddAsync(ContactEntity contact, CancellationToken cancellationToken = default);

    Task<bool> UpdateAsync(ContactEntity contact, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
