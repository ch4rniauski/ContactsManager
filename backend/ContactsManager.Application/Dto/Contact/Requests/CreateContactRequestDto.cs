namespace ContactsManager.Application.Dto.Contact.Requests;

public sealed record CreateContactRequestDto(
    string Name,
    string MobilePhone,
    string JobTitle,
    DateOnly? BirthDate);
