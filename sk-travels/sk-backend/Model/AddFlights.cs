using System.ComponentModel.DataAnnotations;

namespace sk_travel.Model
{
    public class AddFlights
    {
        public Guid? FlightMapId { get; set; }
        [Required(ErrorMessage = "flightid is required")]
        public Guid Flightid { get; set; }

        [Required(ErrorMessage = "LocationFromId is required")]
        public Guid LocationFromId { get; set; }

        [Required(ErrorMessage = "LocationFromCode is required")]
        public string LocationFromCode { get; set; }

        [Required(ErrorMessage = "LocationToId is required")]
        public Guid LocationToId { get; set; }

        [Required(ErrorMessage = "LocationToCodeId is required")]
        public string? LocationToCodeId { get; set; }


        [Required(ErrorMessage = "validTill_date is required")]
        public string ValidTillDate { get; set; }

        [Required(ErrorMessage = "validTill_time is required")]
        public string ValidTillTime { get; set; }

        public Guid? SupplierId { get; set; }

        [Required(ErrorMessage = "total_seat is required")]
        public int TotalSeat { get; set; }

        [Required(ErrorMessage = "available_seat is required")]
        public int AvailableSeat { get; set; }

        public bool RealTimeBooking { get; set; }

        public string? PnrNo { get; set; }

        [Required(ErrorMessage = "departure_time is required")]
        public string DepartureTime { get; set; }

        [Required(ErrorMessage = "arrival_time is required")]
        public string ArrivalTime { get; set; }

        [Required(ErrorMessage = "WeekDays is required")]
        public string WeekDays { get; set; }

        [Required(ErrorMessage = "Flight Code is required")]
        public string FlightCode { get; set; }

    }
}
