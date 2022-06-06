import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export interface Locale
{
    lang: string;
    data: Object;
}

@Injectable({
  providedIn: 'root'
})

export class TranslationLoaderService {

  constructor( private _translateService: TranslateService
    ) { }
    loadTranslations(...args: Locale[]): void
    {
        const locales = [...args];

        locales.forEach((locale) => {
            this._translateService.setTranslation(locale.lang, locale.data, true);
        });
    }
}
