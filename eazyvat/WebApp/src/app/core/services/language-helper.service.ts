import { Injectable } from "@angular/core";
import { ILanguageItem } from "../model/language.model";
import { TranslateService } from "@ngx-translate/core";
import { AppContextService } from "src/app/services/app-context.service";

@Injectable({
  providedIn: "root",
})
export class LanguageHelperService {
  public availableLangs: Array<ILanguageItem> = [
    {
      name: "EN",
      code: "en",
      nationCode: "USA",
      flag: "flag-icon-us",
    },
    {
      name: "FR",
      code: "fr",
      nationCode: "FRA",
      flag: "flag-icon-fr",
    },
    // {
    //   name: "CN",
    //   code: "cn",
    //   nationCode: "CHN",
    //   flag: "flag-icon-cn",
    // },
    // {
    //   name: "DE",
    //   code: "de",
    //   nationCode: "DEU",
    //   flag: "flag-icon-de",
    // },
    // {
    //   name: "RU",
    //   code: "ru",
    //   nationCode: "RUS",
    //   flag: "flag-icon-ru",
    // },
  ];

  public currentLang = this.availableLangs[0];

  constructor(
    public translate: TranslateService,
    public appCtx: AppContextService
  ) {}

  public initUserLanguage() {
    if (this.appCtx.lang == undefined) {
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(
        this.availableLangs.some((x) => x.name.toLowerCase() === browserLang)
          ? browserLang
          : "en"
      );
    } else {
      this.setLanguageByNationCode(this.appCtx.lang);
    }
  }

  public setLanguage(lang: ILanguageItem) {
    this.translate.use(lang.code);
    this.currentLang = this.availableLangs.find(
      (x) => x.name.toLowerCase() === lang.code
    );
    this.appCtx.lang = lang.nationCode;
  }

  public setLanguageByNationCode(code: string) {
    const lang = this.availableLangs.find(
      (x) => x.nationCode.toLowerCase() === code.toLowerCase()
    );

    if (lang != undefined) {
      this.currentLang = this.availableLangs.find(
        (x) => x.name.toLowerCase() === lang.code
      );
      this.translate.use(lang.code);
      this.appCtx.lang = lang.nationCode;
    }
  }
}
