// ============================================================
// DATES — calculs sur des jours calendaires locaux (minuit), sans
// fuseau ni heure : ce qui compte est le jour affiché.
// ============================================================

/** Copie au début du jour (heure locale) */
export const startOfDay = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate())

export const addDays = (date: Date, days: number): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)

/** Ajoute des mois en gardant le jour, ramené au dernier jour du mois si besoin (31 janv. + 1 mois = 28/29 févr.) */
export const addMonths = (date: Date, months: number): Date => {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1)
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
  target.setDate(Math.min(date.getDate(), lastDay))
  return target
}

export const isSameDay = (a: Date | null | undefined, b: Date | null | undefined): boolean =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

export const isSameMonth = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()

/** Clé stable d'un jour : AAAA-MM-JJ */
export const toDateKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export const isValidDate = (date: unknown): date is Date => date instanceof Date && !Number.isNaN(date.getTime())

/** Jour hors bornes (bornes comprises) */
export const isOutOfRange = (date: Date, min?: Date | null, max?: Date | null): boolean =>
  (!!min && startOfDay(date) < startOfDay(min)) || (!!max && startOfDay(date) > startOfDay(max))

/** Ramène un jour dans les bornes */
export const clampDate = (date: Date, min?: Date | null, max?: Date | null): Date => {
  if (min && startOfDay(date) < startOfDay(min)) return startOfDay(min)
  if (max && startOfDay(date) > startOfDay(max)) return startOfDay(max)
  return date
}

/**
 * Premier jour de la semaine (0 = dimanche, 1 = lundi…) selon la langue :
 * Intl.Locale.getWeekInfo() quand il est disponible, sinon dimanche pour
 * les régions qui l'utilisent et lundi ailleurs.
 */
export const getFirstDayOfWeek = (code: string): number => {
  try {
    const locale = new Intl.Locale(code) as Intl.Locale & {
      getWeekInfo?: () => { firstDay: number }
      weekInfo?: { firstDay: number }
    }
    const info = locale.getWeekInfo?.() ?? locale.weekInfo
    if (info?.firstDay) return info.firstDay % 7
  } catch {
    // Langue invalide : repli ci-dessous
  }
  return /^(en(-US|-CA)?|ja|ko|zh|he|pt-BR|es-MX|ar)$/i.test(code) ? 0 : 1
}

/** Semaines (lignes de 7 cases, null hors du mois) d'un mois affiché */
export const getMonthGrid = (month: Date, firstDayOfWeek: number): (Date | null)[][] => {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const offset = (first.getDay() - firstDayOfWeek + 7) % 7
  const cells: (Date | null)[] = Array.from({ length: offset }, () => null)
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(month.getFullYear(), month.getMonth(), day))
  while (cells.length % 7) cells.push(null)
  const weeks: (Date | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

export type DatePart = 'day' | 'month' | 'year'

/** Ordre des parties et séparateur d'une date courte (« 05/11/2026 » en fr, « 11/5/2026 » en en-US) */
export const getDateFormatPattern = (code: string): { order: DatePart[]; separator: string } => {
  try {
    const parts = new Intl.DateTimeFormat(code, { day: '2-digit', month: '2-digit', year: 'numeric' }).formatToParts(new Date(2026, 10, 5))
    const order = parts.filter((part) => part.type === 'day' || part.type === 'month' || part.type === 'year').map((part) => part.type as DatePart)
    const separator = parts.find((part) => part.type === 'literal')?.value.trim() || '/'
    if (order.length === 3) return { order, separator }
  } catch {
    // Repli ci-dessous
  }
  return { order: ['day', 'month', 'year'], separator: '/' }
}

/** Date saisie → Date (null si vide, undefined si illisible ou inexistante) */
export const parseDateInput = (input: string, code: string): Date | null | undefined => {
  const text = input.trim()
  if (!text) return null
  const numbers = text.split(/[^\d]+/).filter(Boolean).map(Number)
  if (numbers.length !== 3) return undefined
  const { order } = getDateFormatPattern(code)
  const values: Record<DatePart, number> = { day: 0, month: 0, year: 0 }
  order.forEach((part, index) => (values[part] = numbers[index]))
  // Année sur deux chiffres : 20xx
  if (values.year < 100) values.year += 2000
  const date = new Date(values.year, values.month - 1, values.day)
  if (date.getFullYear() !== values.year || date.getMonth() !== values.month - 1 || date.getDate() !== values.day) return undefined
  return date
}
