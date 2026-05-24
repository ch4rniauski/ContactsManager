using AutoMapper;
using ContactsManager.Application.Dto.Contact.Requests;
using ContactsManager.Domain.Entities;

namespace ContactsManager.Application.MapperProfiles.Contact;

internal sealed class UpdateContactProfile : Profile
{
    public UpdateContactProfile()
    {
        CreateMap<UpdateContactRequestDto, ContactEntity>()
            .ForMember(
                dest => dest.Id,
                opt => opt.Ignore()
            )
            .ForMember(
                dest => dest.Name,
                opt => opt.MapFrom(src => src.Name)
            )
            .ForMember(
                dest => dest.JobTitle,
                opt => opt.MapFrom(src => src.JobTitle)
            )
            .ForMember(
                dest => dest.MobilePhone,
                opt => opt.MapFrom(src => src.MobilePhone)
            )
            .ForMember(
                dest => dest.BirthDate,
                opt => opt.MapFrom(src => src.BirthDate)
            );
    }
}
