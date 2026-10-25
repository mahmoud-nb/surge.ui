import { fr } from './fr'
import { en } from './en'

export { fr, en }
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
export const locales = { fr, en }
