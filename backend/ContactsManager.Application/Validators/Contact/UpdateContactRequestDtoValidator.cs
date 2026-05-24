using ContactsManager.Application.Dto.Contact.Requests;
using FluentValidation;

namespace ContactsManager.Application.Validators.Contact;

public sealed class UpdateContactRequestDtoValidator : AbstractValidator<UpdateContactRequestDto>
{
    public UpdateContactRequestDtoValidator()
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
