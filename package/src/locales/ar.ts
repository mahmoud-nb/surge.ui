import type { SurgeLocale } from './types'

/**
 * Textes arabes (arabe standard moderne). Pluriels selon Intl.PluralRules :
 * zero, one, two, few (3 à 10), many (11 à 99), other (100 et plus).
 * Chiffres : ceux du code Intl (`ar` : chiffres latins dans les moteurs
 * récents) ; `defineLocale(ar, { code: 'ar-EG' })` pour les chiffres indiens.
 */
export const ar: SurgeLocale = {
  code: 'ar',
  messages: {
    common: {
      loading: 'جارٍ التحميل…',
      close: 'إغلاق'
    },
    formField: {
      required: 'مطلوب'
    },
    alert: {
      dismiss: 'إغلاق التنبيه'
    },
    avatar: {
      alt: 'الصورة الرمزية لـ{name}',
      anonymous: 'مستخدم',
      initials: 'صورة رمزية بالأحرف الأولى من اسم {name}',
      placeholder: 'صورة رمزية افتراضية',
      status: 'الحالة: {status}',
      statusOnline: 'متصل',
      statusOffline: 'غير متصل',
      statusBusy: 'مشغول',
      statusAway: 'غائب',
      notifications: {
        zero: 'لا توجد إشعارات',
        one: 'إشعار واحد',
        two: 'إشعاران',
        few: '{count} إشعارات',
        many: '{count} إشعارًا',
        other: '{count} إشعار'
      }
    },
    image: {
      loading: '- جارٍ التحميل',
      error: '- تعذّر التحميل',
      errorText: 'تعذّر التحميل'
    },
    link: {
      external: '(يُفتح في علامة تبويب جديدة)'
    },
    progress: {
      indeterminate: 'قيد التنفيذ…'
    },
    spinner: {
      label: 'جارٍ التحميل…'
    },
    price: {
      unavailable: 'السعر غير متاح'
    },
    textarea: {
      remaining: 'الأحرف المتبقية',
      overLimit: 'تم تجاوز الحد الأقصى للأحرف'
    },
    selectBox: {
      placeholder: 'اختر خيارًا…',
      searchPlaceholder: 'بحث…',
      noOptions: 'لا توجد خيارات',
      noResults: 'لا توجد نتائج',
      clear: 'مسح الاختيار',
      removeTag: 'إزالة {label}',
      selectedCount: {
        zero: 'لم يُحدَّد أي عنصر',
        one: 'عنصر واحد محدد',
        two: 'عنصران محددان',
        few: '{count} عناصر محددة',
        many: '{count} عنصرًا محددًا',
        other: '{count} عنصر محدد'
      },
      selected: 'تم تحديد {label}',
      deselected: 'تم إلغاء تحديد {label}',
      removed: 'تمت إزالة {label} من الاختيار',
      cleared: 'تم مسح الاختيار',
      maxReached: {
        one: 'يمكنك تحديد عنصر واحد كحد أقصى',
        two: 'يمكنك تحديد عنصرين كحد أقصى',
        few: 'يمكنك تحديد {count} عناصر كحد أقصى',
        many: 'يمكنك تحديد {count} عنصرًا كحد أقصى',
        other: 'يمكنك تحديد {count} عنصر كحد أقصى'
      }
    },
    checkboxGroup: {
      maxReached: {
        one: 'يمكنك تحديد خيار واحد كحد أقصى',
        two: 'يمكنك تحديد خيارين كحد أقصى',
        few: 'يمكنك تحديد {count} خيارات كحد أقصى',
        many: 'يمكنك تحديد {count} خيارًا كحد أقصى',
        other: 'يمكنك تحديد {count} خيار كحد أقصى'
      }
    },
    slider: {
      min: 'الحد الأدنى',
      max: 'الحد الأقصى'
    },
    fileUpload: {
      placeholder: 'اختر ملفات أو اسحبها إلى هنا',
      drop: 'أفلت الملفات لرفعها',
      browse: 'استعراض',
      loading: 'جارٍ التحميل…',
      loadingHint: 'يُرجى الانتظار',
      tooLarge: 'الملف «{name}» كبير جدًا ({size}). الحجم الأقصى: {max}',
      invalidType: 'نوع الملف «{type}» غير مقبول للملف «{name}»',
      maxFiles: 'تم تجاوز الحد الأقصى لعدد الملفات ({max})',
      added: {
        one: 'تمت إضافة الملف «{name}»',
        two: 'تمت إضافة ملفين',
        few: 'تمت إضافة {count} ملفات',
        many: 'تمت إضافة {count} ملفًا',
        other: 'تمت إضافة {count} ملف'
      },
      removed: 'تمت إزالة الملف «{name}»',
      cleared: 'تمت إزالة كل الملفات',
      selectedCount: {
        zero: 'لم يُحدَّد أي ملف',
        one: 'ملف واحد محدد',
        two: 'ملفان محددان',
        few: '{count} ملفات محددة',
        many: '{count} ملفًا محددًا',
        other: '{count} ملف محدد'
      },
      preview: 'معاينة {name}',
      remove: 'إزالة {name}',
      progress: 'جارٍ رفع {name}: {progress}%',
      maxSize: 'الحد الأقصى {max}'
    },
    otpInput: {
      label: 'رمز تحقق من {length} خانات',
      progress: {
        zero: 'لم يُدخَل أي حرف من {length}',
        one: 'تم إدخال حرف واحد من {length}',
        two: 'تم إدخال حرفين من {length}',
        few: 'تم إدخال {count} أحرف من {length}',
        many: 'تم إدخال {count} حرفًا من {length}',
        other: 'تم إدخال {count} حرف من {length}'
      },
      character: 'الحرف {index} من {length}'
    },
    password: {
      strength: 'قوة كلمة المرور: {score}%'
    },
    toast: {
      region: 'الإشعارات',
      dismiss: 'إغلاق الإشعار'
    },
    breadcrumb: {
      label: 'مسار التنقل',
      expand: 'إظهار المسار الكامل'
    },
    pagination: {
      label: 'ترقيم الصفحات',
      page: 'الصفحة {page}',
      previous: 'الصفحة السابقة',
      next: 'الصفحة التالية',
      first: 'الصفحة الأولى',
      last: 'الصفحة الأخيرة'
    },
    tag: {
      remove: 'إزالة {label}'
    },
    numberInput: {
      increment: 'زيادة',
      decrement: 'إنقاص'
    },
    stepper: {
      label: 'الخطوات',
      complete: 'مكتملة',
      error: 'تحتاج إلى مراجعة'
    },
    confirm: {
      title: 'هل تريد تأكيد هذا الإجراء؟',
      confirm: 'تأكيد',
      cancel: 'إلغاء'
    },
    autocomplete: {
      noResults: 'لا توجد اقتراحات',
      loading: 'جارٍ البحث…',
      results: {
        zero: 'لا توجد اقتراحات',
        one: 'اقتراح واحد',
        two: 'اقتراحان',
        few: '{count} اقتراحات',
        many: '{count} اقتراحًا',
        other: '{count} اقتراح'
      },
      clear: 'مسح'
    },
    dataTable: {
      selectAll: 'تحديد الكل',
      selectRow: 'تحديد {label}',
      sortAscending: 'مرتّب حسب {column}، تصاعديًا',
      sortDescending: 'مرتّب حسب {column}، تنازليًا',
      sortCleared: 'تمت إزالة الترتيب',
      empty: 'لا توجد بيانات'
    },
    calendar: {
      previousMonth: 'الشهر السابق',
      nextMonth: 'الشهر التالي',
      previousYear: 'السنة السابقة',
      nextYear: 'السنة التالية',
      previousYears: 'السنوات السابقة',
      nextYears: 'السنوات التالية',
      chooseMonth: '{month}، اختر الشهر',
      chooseYear: '{year}، اختر السنة'
    },
    datePicker: {
      open: 'اختر تاريخًا',
      openSelected: 'تغيير التاريخ، {date}',
      dialog: 'التقويم',
      day: 'يوم',
      month: 'شهر',
      year: 'سنة'
    },
    commandPalette: {
      label: 'لوحة الأوامر',
      placeholder: 'ابحث عن أمر…',
      empty: 'لا توجد نتائج',
      results: {
        zero: 'لا توجد أوامر',
        one: 'أمر واحد',
        two: 'أمران',
        few: '{count} أوامر',
        many: '{count} أمرًا',
        other: '{count} أمر'
      }
    },
    gridLayout: {
      viewToggle: 'العرض',
      grid: 'شبكة',
      list: 'قائمة'
    },
    holyGrailLayout: {
      skipLink: 'الانتقال إلى المحتوى الرئيسي',
      nav: 'التنقل الرئيسي',
      aside: 'معلومات إضافية'
    }
  }
}
