export class Invoice {
  public InvoiceNumber: number;
  public Items: InvoiceItem[] = [];
}

export class InvoiceItem {
  public purchaseId:string
  public serialNumber: string;
  public description: string;
  public price: number;
  public quantity: number;
  public total: number;
  public purchase:boolean;
  
}
