using ContactsManager.Domain.Entities;
using FluentValidation;

namespace ContactsManager.Application.Validators.Contact;

public sealed class ContactEntityValidator : AbstractValidator<ContactEntity>
{
    public ContactEntityValidator()
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
