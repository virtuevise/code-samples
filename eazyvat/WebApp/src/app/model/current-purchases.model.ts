import { PurchaseSummary } from 'src/app/model/purchase-summary.model';
import { CurrentPurchase } from './current-purchase.model';

export interface ICurrentPurchase {
  Purchases?: CurrentPurchase[];
  Summary?: PurchaseSummary;
}
