using ContactsManager.Application.Common.Errors;
using ContactsManager.Application.Common.Results;
using ContactsManager.Application.Contracts.Repositories;
using ContactsManager.Application.UseCases.Queries.Contact;
using ContactsManager.Domain.Entities;
using MediatR;

namespace ContactsManager.Application.UseCases.QueriyHandlers.Contact;

internal sealed class GetContactQueryHandler : IRequestHandler<GetContactQuery, Result<ContactEntity>>
{
    private readonly IContactRepository _repository;

    public GetContactQueryHandler(IContactRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<ContactEntity>> Handle(GetContactQuery request, CancellationToken cancellationToken)
    {
        var contact = await _repository.GetByIdAsync(request.Id, cancellationToken);

        if (contact is null)
        {
            return Result<ContactEntity>.Failure(
                Error.NotFound($"Contact with id {request.Id} was not found")
                );
        }

        return Result<ContactEntity>.Success(contact);
    }
}
