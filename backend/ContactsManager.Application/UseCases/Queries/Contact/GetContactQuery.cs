using ContactsManager.Application.Common.Results;
using ContactsManager.Domain.Entities;
using MediatR;

namespace ContactsManager.Application.UseCases.Queries.Contact;

public sealed record GetContactQuery(Guid Id) : IRequest<Result<ContactEntity>>;
