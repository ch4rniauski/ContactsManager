namespace ContactsManager.Application.Dto.Contact.Requests;

public sealed record UpdateContactRequestDto(
    string Name,
    string MobilePhone,
    string JobTitle,
    DateOnly? BirthDate);
    