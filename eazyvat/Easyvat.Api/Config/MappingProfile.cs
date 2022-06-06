using AutoMapper;
using Easyvat.Api.ViewModel;
using Easyvat.Common.Helper;
using Easyvat.Model.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Easyvat.Api.Config
{

    public class MappingProfile : Profile
    {

        public MappingProfile()
        {
            CreateMap<PassportDetailsDto, Passport>().ReverseMap();

            CreateMap<PersonalDetailsDto, Member>().ReverseMap();

            CreateMap<VisitDto, Visit>().ReverseMap();

            CreateMap<InvoiceItemDto, Item>().ReverseMap();

            CreateMap<InvoiceDto, Purchase>().ReverseMap();

            CreateMap<Passport, AccountDetailsDto>()
                .ForMember(d => d.MobileNumber, opt => opt.MapFrom(s => s.Member.MobileNumber))
                .ForMember(d => d.Email, opt => opt.MapFrom(s => s.Member.Email))
                .ReverseMap();

            CreateMap<Purchase, PurchaseDetailsDto>()
                .ForMember(d => d.ShopName, opt => opt.MapFrom(s => s.Shop.Name))
                .ForMember(d => d.FullShopAddress, opt => opt.MapFrom(s => $"{s.Shop.City} {s.Shop.Address}"))
                .ForMember(d => d.Sum, opt => opt.MapFrom(s => s.Items.Sum(x => x.Total).Value.ToString("#.00")))
                .ForMember(d => d.VatReclaim, opt => opt.MapFrom(s => s.IsValid ? (s.Items.Sum(x => x.Total) * Constants.VatPercentage).Value.ToString("#.00") : string.Empty));

            CreateMap<Purchase, CurrentPurchaseDto>()
                    .ForMember(d => d.ShopName, opt => opt.MapFrom(s => s.Shop.Name))
                    .ForMember(d => d.Total, opt => opt.MapFrom(s => s.Items.Sum(x => x.Total).Value.ToString("#.00")))
                    .ForMember(d => d.Refund, opt => opt.MapFrom(s => s.IsValid ? (s.Items.Sum(x => x.Total) * Constants.VatPercentage).Value.ToString("#.00") : string.Empty));

        }
    }
}
