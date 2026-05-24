using AutoMapper;
using ContactsManager.Application.Common.Errors;
using ContactsManager.Application.Common.Results;
using ContactsManager.Application.Contracts.Repositories;
using ContactsManager.Application.Dto.Contact.Requests;
using ContactsManager.Application.UseCases.Commands.Contact;
using ContactsManager.Domain.Entities;
using FluentValidation;
using MediatR;

namespace ContactsManager.Application.UseCases.CommandHandlers.Contact;

internal sealed class CreateContactCommandHandler : IRequestHandler<CreateContactCommand, Result<ContactEntity>>
{
    private readonly IContactRepository _repository;
    private readonly IValidator<CreateContactRequestDto> _validator;
    private readonly IMapper _mapper;

    public CreateContactCommandHandler(
        IContactRepository repository,
        IValidator<CreateContactRequestDto> validator,
        IMapper mapper)
    {
        _repository = repository;
        _validator = validator;
        _mapper = mapper;
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

        var contact = _mapper.Map<ContactEntity>(request.Contact);

        var isCreated = await _repository.AddAsync(contact, cancellationToken);

        if (!isCreated)
        {
            return Result<ContactEntity>.Failure(
                Error.InternalError($"Contact with id {contact.Id} was not created")
                );
        }

        return Result<ContactEntity>.Success(contact);
    }
}
