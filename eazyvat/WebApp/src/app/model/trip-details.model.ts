export class Visit {
    constructor( /* public StartDate?: Date, */
                 public EndDate?: Date,
                 public AreaId?: number[],
                 public CityId?: number[],
                 public InterestId?: number[],
                 public PurposeId?: number,
                 public MemberId?: string,
                 public SpecialOffers?:boolean  ) {}
  }