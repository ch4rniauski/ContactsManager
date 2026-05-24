using ContactsManager.Application.Common.Errors;
using ContactsManager.Application.Common.Results;
using ContactsManager.Application.Contracts.Repositories;
using ContactsManager.Application.UseCases.Commands.Contact;
using MediatR;

namespace ContactsManager.Application.UseCases.CommandHandlers.Contact;

internal sealed class DeleteContactCommandHandler : IRequestHandler<DeleteContactCommand, Result<Guid>>
{
    private readonly IContactRepository _repository;

    public DeleteContactCommandHandler(IContactRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<Guid>> Handle(DeleteContactCommand request, CancellationToken cancellationToken)
    {
        var existingContact = await _repository.GetByIdAsync(request.Id, cancellationToken);

        if (existingContact is null)
        {
            return Result<Guid>.Failure(
                Error.NotFound($"Contact with id {request.Id} was not found")
                );
        }

        var isDeleted = await _repository.DeleteAsync(request.Id, cancellationToken);

        if (!isDeleted)
        {
            return Result<Guid>.Failure(
                Error.InternalError($"Contact with id {request.Id} was not deleted")
                );
        }

        return Result<Guid>.Success(request.Id);
    }
}
