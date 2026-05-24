using ContactsManager.Application.Common.Errors;
using ContactsManager.Application.Common.Results;
using ContactsManager.Application.Contracts.Repositories;
using ContactsManager.Application.UseCases.Commands.Contact;
using ContactsManager.Domain.Entities;
using FluentValidation;
using MediatR;

namespace ContactsManager.Application.UseCases.CommandHandlers.Contact;

internal sealed class CreateContactCommandHandler : IRequestHandler<CreateContactCommand, Result<ContactEntity>>
{
    private readonly IContactRepository _repository;
    private readonly IValidator<ContactEntity> _validator;

    public CreateContactCommandHandler(
        IContactRepository repository,
        IValidator<ContactEntity> validator)
    {
        _repository = repository;
        _validator = validator;
    }

    public async Task<Result<ContactEntity>> Handle(CreateContactCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request.Contact, cancellationToken);

        if (!validationResult.IsValid)
        {
            var message = string.Join("; ", validationResult.Errors.Select(error => error.ErrorMessage));

            return Result<ContactEntity>.Failure(
                Error.FailedValidation(message)
                );
        }

        request.Contact.Id = Guid.NewGuid();

        var isCreated = await _repository.AddAsync(request.Contact, cancellationToken);

        if (!isCreated)
        {
            return Result<ContactEntity>.Failure(
                Error.InternalError($"Contact with id {request.Contact.Id} was not created")
                );
        }

        return Result<ContactEntity>.Success(request.Contact);
    }
}
