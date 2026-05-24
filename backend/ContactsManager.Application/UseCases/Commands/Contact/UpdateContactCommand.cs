using ContactsManager.Application.Common.Results;
using ContactsManager.Application.Dto.Contact.Requests;
using ContactsManager.Domain.Entities;
using MediatR;

namespace ContactsManager.Application.UseCases.Commands.Contact;

public sealed record UpdateContactCommand(Guid Id, UpdateContactRequestDto Contact) : IRequest<Result<ContactEntity>>;
