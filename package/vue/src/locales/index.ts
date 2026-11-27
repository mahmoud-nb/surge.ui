import { fr } from './fr'
import { en } from './en'
import { ar } from './ar'

export { fr, en, ar }
export type {
  SurgeLocale,
  SurgeLocaleInput,
  SurgeMessages,
  LocaleMessage,
  PluralMessage,
  MessageKey,
  MessageParams
} from './types'

/** Locales fournies : `app.use(SurgeUI, { locale: locales.en })` */
export const locales = { fr, en, ar }
