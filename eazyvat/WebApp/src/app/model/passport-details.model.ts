export class PassportDetails {
    constructor(
    public FirstName: string,
    public LastName: string,
    public Nationality: string,
    public PassportNumber: string,
    public ExpiredOn: Date,
    public BirthDate: Date,
    public ImagePassport?: string) {}
  }
  