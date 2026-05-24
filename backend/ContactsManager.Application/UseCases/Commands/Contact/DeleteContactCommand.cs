using ContactsManager.Application.Common.Results;
using MediatR;

namespace ContactsManager.Application.UseCases.Commands.Contact;

public sealed record DeleteContactCommand(Guid Id) : IRequest<Result<Guid>>;
