using ContactsManager.Application.Common.Results;
using ContactsManager.Application.Contracts.Repositories;
using ContactsManager.Application.UseCases.Queries.Contact;
using ContactsManager.Domain.Entities;
using MediatR;

namespace ContactsManager.Application.UseCases.QueriyHandlers.Contact;

internal sealed class GetContactsQueryHandler : IRequestHandler<GetContactsQuery, Result<IList<ContactEntity>>>
{
    private readonly IContactRepository _repository;

    public GetContactsQueryHandler(IContactRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<IList<ContactEntity>>> Handle(GetContactsQuery request, CancellationToken cancellationToken)
    {
        var contacts = await _repository.GetAllAsync(cancellationToken);

        return Result<IList<ContactEntity>>.Success(contacts);
    }
}
