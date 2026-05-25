using ContactsManager.Application.Common.Results;
using ContactsManager.Domain.Entities;
using MediatR;

namespace ContactsManager.Application.UseCases.Queries.Contact;

public sealed record SearchContactsQuery(string SearchText) : IRequest<Result<IList<ContactEntity>>>;
