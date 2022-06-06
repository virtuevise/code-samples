import { CurrentPurchase } from './current-purchase.model';

export interface IPurchasePreview {
  Purchases?: CurrentPurchase[];
  Date?: Date;
}
