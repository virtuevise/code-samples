namespace sk_travel.Model
{
    public class AllFlightReturnModel
    {
        public String FlightName { get; set; }
        public string FlightCode { get; set; }
        public string FlightType { get; set; }
        public Guid FlightMapId { get; set; }
        public string FlightFrom { get; set; }
        public string FlightTo { get; set; }
        public string FlightClass { get; set; }
        public string ValidTillDate { get; set; }

        public string ValidTillTime { get; set; }
        public int TotalSeat { get; set; }
        public int AvailableSeat { get; set; }
        public bool RealTimeBooking { get; set; }
        public string PnrNo { get; set; }
        public string DepartureTime { get; set; }
        public string ArrivalTime { get; set; }
        public string WeekDays { get; set; }
    }
}
