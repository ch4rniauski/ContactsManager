using ContactsManager.Application.Common.Results;
using ContactsManager.Application.Contracts.Repositories;
using ContactsManager.Application.UseCases.Queries.Contact;
using ContactsManager.Domain.Entities;
using MediatR;

namespace ContactsManager.Application.UseCases.QueriyHandlers.Contact;

internal sealed class SearchContactsQueryHandler : IRequestHandler<SearchContactsQuery, Result<IList<ContactEntity>>>
{
    private readonly IContactRepository _repository;

    public SearchContactsQueryHandler(IContactRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<IList<ContactEntity>>> Handle(SearchContactsQuery request, CancellationToken cancellationToken)
    {
        var contacts = await _repository.SearchAsync(request.SearchText, cancellationToken);

        return Result<IList<ContactEntity>>.Success(contacts);
    }
}
