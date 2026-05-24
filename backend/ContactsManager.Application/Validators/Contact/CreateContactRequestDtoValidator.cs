using ContactsManager.Application.Dto.Contact.Requests;
using FluentValidation;

namespace ContactsManager.Application.Validators.Contact;

public sealed class CreateContactRequestDtoValidator : AbstractValidator<CreateContactRequestDto>
{
    public CreateContactRequestDtoValidator()
    {
        RuleFor(contact => contact.Name)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(contact => contact.MobilePhone)
            .NotEmpty()
            .MaximumLength(20);

        RuleFor(contact => contact.JobTitle)
            .MaximumLength(100);
    }
}
