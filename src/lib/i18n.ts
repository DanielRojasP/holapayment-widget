import es from '../app/public/locales/es.json';
import en from '../app/public/locales/en.json';

export type Language = string;

class TranslationManager {
  // Las traducciones quedan cargadas en memoria inmediatamente
  private dictionaries: Record<string, Record<string, any>> = {
    es,
    en,
  };

  private currentLang: string = 'es';

  /**
   * Cambia el idioma activo o hace fallback a 'es' si no existe
   */
  public setLanguage(lang: string): void {
    if (this.dictionaries[lang]) {
      this.currentLang = lang;
    } else {
      console.warn(`[i18n] Idioma '${lang}' no soportado. Usando 'es' por defecto.`);
      this.currentLang = 'es';
    }
  }

  /**
   * Registra dinámicamente un nuevo diccionario en tiempo de ejecución si fuera necesario
   */
  public addLanguage(lang: string, dictionary: Record<string, any>): void {
    this.dictionaries[lang] = dictionary;
  }

  /**
   * Obtiene la traducción utilizando una clave como "paypal.title"
   */
  public t(key: string, targetLang?: string): string {
    const lang = targetLang || this.currentLang;
    const dictionary = this.dictionaries[lang] || this.dictionaries['es'] || {};

    const keys = key.split('.');
    let value: any = dictionary;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Devuelve la clave si no la encuentra
      }
    }

    return typeof value === 'string' ? value : key;
  }
}

export const i18n = new TranslationManager();