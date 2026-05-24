using ContactsManager.Application.Common.Results;
using ContactsManager.Domain.Entities;
using MediatR;

namespace ContactsManager.Application.UseCases.Commands.Contact;

public sealed record UpdateContactCommand(ContactEntity Contact) : IRequest<Result<ContactEntity>>;
