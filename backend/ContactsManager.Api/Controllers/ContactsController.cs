using ContactsManager.Application.Dto.Contact.Requests;
using ContactsManager.Application.Extensions;
using ContactsManager.Application.UseCases.Commands.Contact;
using ContactsManager.Application.UseCases.Queries.Contact;
using ContactsManager.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ContactsManager.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ContactsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ContactsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IList<ContactEntity>>> GetContacts(CancellationToken cancellationToken)
    {
        var query = new GetContactsQuery();

        var result = await _mediator.Send(query, cancellationToken);

        return result.Match(
            onSuccess: Ok,
            onFailure: err => Problem(
                detail: err.Description,
                statusCode: err.StatusCode));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ContactEntity>> GetContactById(Guid id, CancellationToken cancellationToken)
    {
        var query = new GetContactQuery(id);

        var result = await _mediator.Send(query, cancellationToken);

        return result.Match(
            onSuccess: Ok,
            onFailure: err => Problem(
                detail: err.Description,
                statusCode: err.StatusCode));
    }

    [HttpPost]
    public async Task<ActionResult<ContactEntity>> CreateContact(
        [FromBody] CreateContactRequestDto request,
        CancellationToken cancellationToken)
    {
        var command = new CreateContactCommand(request);

        var result = await _mediator.Send(command, cancellationToken);

        return result.Match(
            onSuccess: Ok,
            onFailure: err => Problem(
                detail: err.Description,
                statusCode: err.StatusCode));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ContactEntity>> UpdateContact(
        Guid id,
        [FromBody] UpdateContactRequestDto request,
        CancellationToken cancellationToken)
    {
        var command = new UpdateContactCommand(id, request);

        var result = await _mediator.Send(command, cancellationToken);

        return result.Match(
            onSuccess: Ok,
            onFailure: err => Problem(
                detail: err.Description,
                statusCode: err.StatusCode));
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<Guid>> DeleteContact(Guid id, CancellationToken cancellationToken)
    {
        var command = new DeleteContactCommand(id);

        var result = await _mediator.Send(command, cancellationToken);

        return result.Match(
            onSuccess: guid => Ok(guid),
            onFailure: err => Problem(
                detail: err.Description,
                statusCode: err.StatusCode));
    }
}
