import { Component, Input } from '@angular/core';
import { Language } from '../../classes/language';

import { AppModule } from '../../app.module';

@Component({
  selector: 'languagechooser',
  templateUrl: './templates/languagechooser.component.html'
})


export class LanguageChooser {
  language: Language = new Language();
  languages: string[] = this.language.getLanguages();
  currentLanguage: string = this.language.toName(Language.language);

  onSelect() {
    const selected: string = (event.target as Element).id;
    this.language.setLanguage(selected);
    AppModule.options.language = this.language.setLanguage(selected);
    AppModule.options.save();
    location.reload();
  }
}
