namespace sk_travel.Model
{
    public class FlightDetailsModel
    {
        public Guid FlightNameId { get; set; }
        public string Flight_Name { get; set; }
        public List<flightCodeList> Flight_Code { get; set; }
        public string Flight_Type { get; set; }
    }

    public  class flightCodeList
    {
        public string Id { get; set; }
        public string Value { get; set; }

    }
}
