using ContactsManager.Application.Common.Errors;
using ContactsManager.Application.Common.Results;
using ContactsManager.Application.Contracts.Repositories;
using ContactsManager.Application.UseCases.Commands.Contact;
using ContactsManager.Domain.Entities;
using FluentValidation;
using MediatR;

namespace ContactsManager.Application.UseCases.CommandHandlers.Contact;

internal sealed class UpdateContactCommandHandler : IRequestHandler<UpdateContactCommand, Result<ContactEntity>>
{
    private readonly IContactRepository _repository;
    private readonly IValidator<ContactEntity> _validator;

    public UpdateContactCommandHandler(
        IContactRepository repository,
        IValidator<ContactEntity> validator)
    {
        _repository = repository;
        _validator = validator;
    }

    public async Task<Result<ContactEntity>> Handle(UpdateContactCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request.Contact, cancellationToken);

        if (!validationResult.IsValid)
        {
            var message = string.Join("; ", validationResult.Errors.Select(error => error.ErrorMessage));

            return Result<ContactEntity>.Failure(
                Error.FailedValidation(message)
                );
        }

        var existingContact = await _repository.GetByIdAsync(request.Contact.Id, cancellationToken);

        if (existingContact is null)
        {
            return Result<ContactEntity>.Failure(
                Error.NotFound($"Contact with id {request.Contact.Id} was not found")
                );
        }

        existingContact.Name = request.Contact.Name;
        existingContact.MobilePhone = request.Contact.MobilePhone;
        existingContact.JobTitle = request.Contact.JobTitle;
        existingContact.BirthDate = request.Contact.BirthDate;

        var isUpdated = await _repository.UpdateAsync(existingContact, cancellationToken);

        if (!isUpdated)
        {
            return Result<ContactEntity>.Failure(
                Error.InternalError($"Contact with id {request.Contact.Id} was not updated")
                );
        }

        return Result<ContactEntity>.Success(existingContact);
    }
}
