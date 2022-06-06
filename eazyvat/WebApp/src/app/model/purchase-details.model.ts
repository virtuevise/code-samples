export class PurchaseDetails {
    public Id: string;
    public DatePurchase: Date;
    public ShopName: string;
    public InvoiceNumber: number;
    public FullShopAddress: string;
    public Sum: number;
    public VatReclaim: number;
    public InvoiceImage: string;
    public CashierName: string;
    public IsValid: boolean;
    public PurchaseAmount: number;
    public VatAmount: number;
  }