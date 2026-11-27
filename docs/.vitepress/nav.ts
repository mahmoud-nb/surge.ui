// ============================================================
// Entrées de la sidebar par section (composants, layouts, composables).
// Partagées entre la configuration et le thème (compteurs de l'accueil).
// ============================================================

/** Badge « New » des entrées récentes (navigation et sidebar) */
export const NEW_BADGE = { text: 'New', type: 'tip' as const }

export const getNavItems = (section: string = 'display', lang: string = 'fr') => {

  const langPrefix = lang === 'fr' ? '' : '/en'


  const componentsItems = {
    display:[
      { text: 'Heading', link: `${langPrefix}/components/heading` },
      { text: 'Panel', link: `${langPrefix}/components/panel` },
      { text: 'Divider', link: `${langPrefix}/components/divider`, badge: NEW_BADGE },
      { text: 'Kbd', link: `${langPrefix}/components/kbd`, badge: NEW_BADGE },
      { text: 'VisuallyHidden', link: `${langPrefix}/components/visuallyhidden`, badge: NEW_BADGE },
      { text: 'Icon', link: `${langPrefix}/components/icon` },
      { text: 'Image', link: `${langPrefix}/components/image` },
      { text: 'Avatar', link: `${langPrefix}/components/avatar` },
      { text: 'AvatarGroup', link: `${langPrefix}/components/avatargroup` },
      { text: 'Badge', link: `${langPrefix}/components/badge` },
      { text: 'Tag', link: `${langPrefix}/components/tag`, badge: NEW_BADGE },
      { text: 'Dialog', link: `${langPrefix}/components/dialog` },
      { text: 'ConfirmDialog', link: `${langPrefix}/components/confirmdialog`, badge: NEW_BADGE },
      { text: 'Popover', link: `${langPrefix}/components/popover` },
      { text: 'Alert', link: `${langPrefix}/components/alert`},
      { text: 'Toast', link: `${langPrefix}/components/toast`, badge: NEW_BADGE },
      { text: 'PageHeader', link: `${langPrefix}/components/pageheader`, badge: NEW_BADGE },
      { text: 'Tooltip', link: `${langPrefix}/components/tooltip`, badge: NEW_BADGE },
      { text: 'DataTable', link: `${langPrefix}/components/datatable`, badge: NEW_BADGE },
      { text: 'TreeView', link: `${langPrefix}/components/treeview`, badge: NEW_BADGE },
      { text: 'Tabs', link: `${langPrefix}/components/tabs` },
      { text: 'Accordion', link: `${langPrefix}/components/accordion` },
      { text: 'Collapse', link: `${langPrefix}/components/collapse` },
      { text: 'Progress', link: `${langPrefix}/components/progress` },
      { text: 'Spinner', link: `${langPrefix}/components/spinner`},
      { text: 'Skeleton', link: `${langPrefix}/components/skeleton`, badge: NEW_BADGE },
      { text: 'EmptyState', link: `${langPrefix}/components/emptystate`, badge: NEW_BADGE },
      { text: 'Price', link: `${langPrefix}/components/price`, badge: NEW_BADGE },
      { text: 'Card', link: `${langPrefix}/components/card`, badge: NEW_BADGE }
    ],
    actions:[
      { text: 'Button', link: `${langPrefix}/components/button` },
      { text: 'ButtonGroup', link: `${langPrefix}/components/buttongroup` },
      { text: 'Link', link: `${langPrefix}/components/link` },
      { text: 'LinkGroup', link: `${langPrefix}/components/linkgroup` },
      { text: 'Toggle', link: `${langPrefix}/components/toggle`, badge: NEW_BADGE },
      { text: 'ToggleGroup', link: `${langPrefix}/components/togglegroup`, badge: NEW_BADGE },
      { text: 'FloatButton', link: `${langPrefix}/components/floatbutton` },
      { text: 'Dropdown', link: `${langPrefix}/components/dropdown` },
      { text: 'Breadcrumb', link: `${langPrefix}/components/breadcrumb`, badge: NEW_BADGE },
      { text: 'Pagination', link: `${langPrefix}/components/pagination`, badge: NEW_BADGE },
      { text: 'Stepper', link: `${langPrefix}/components/stepper`, badge: NEW_BADGE },
      { text: 'CommandPalette', link: `${langPrefix}/components/commandpalette`, badge: NEW_BADGE },
      { text: 'NavMenu', link: `${langPrefix}/components/navmenu`, badge: NEW_BADGE },
      { text: 'ThemeToggle', link: `${langPrefix}/components/themetoggle`, badge: NEW_BADGE },
      { text: 'SkipLink', link: `${langPrefix}/components/skiplink`, badge: NEW_BADGE }
    ],
    forms:[
      { text: 'Input', link: `${langPrefix}/components/input` },
      { text: 'Textarea', link: `${langPrefix}/components/textarea` },
      { text: 'NumberInput', link: `${langPrefix}/components/numberinput`, badge: NEW_BADGE },
      { text: 'Autocomplete', link: `${langPrefix}/components/autocomplete`, badge: NEW_BADGE },
      { text: 'DatePicker', link: `${langPrefix}/components/datepicker`, badge: NEW_BADGE },
      { text: 'Calendar', link: `${langPrefix}/components/calendar`, badge: NEW_BADGE },
      { text: 'FileUpload', link: `${langPrefix}/components/fileupload` },
      { text: 'SelectBox', link: `${langPrefix}/components/selectbox` },
      { text: 'RadioGroup', link: `${langPrefix}/components/radio-group` },
      { text: 'Checkbox', link: `${langPrefix}/components/checkbox`, badge: NEW_BADGE },
      { text: 'CheckboxGroup', link: `${langPrefix}/components/checkbox-group` },
      { text: 'Switch', link: `${langPrefix}/components/switch` },
      { text: 'Slider', link: `${langPrefix}/components/slider` },
      //{ text: 'InputField', link: `${langPrefix}/components/inputfield` },
      //{ text: 'TextareaField', link: `${langPrefix}/components/textareafield` },
      //{ text: 'SelectBoxField', link: `${langPrefix}/components/selectboxfield` },
      //{ text: 'RadioGroupField', link: `${langPrefix}/components/radiogroupfield` },
      //{ text: 'CheckboxGroupField', link: `${langPrefix}/components/checkboxgroupfield` },
      //{ text: 'FileUploadField', link: `${langPrefix}/components/fileuploadfield` },
      //{ text: 'SliderField', link: `${langPrefix}/components/sliderfield` },
      //{ text: 'SwitchField', link: `${langPrefix}/components/switchfield` },
      { text: 'Password', link: `${langPrefix}/components/password` },
      { text: 'OtpInput', link: `${langPrefix}/components/otpinput`, badge: NEW_BADGE },
      { text: 'FormField', link: `${langPrefix}/components/formfield` },
      { text: 'FormFieldGroup', link: `${langPrefix}/components/formfieldgroup` },
    ],
    layouts:[
      { text: lang === 'fr' ? "Vue d'ensemble" : 'Overview', link: `${langPrefix}/components/layouts` },
      { text: 'SingleColumnLayout', link: `${langPrefix}/components/singlecolumnlayout`, badge: NEW_BADGE },
      { text: 'SidebarLayout', link: `${langPrefix}/components/sidebarlayout`, badge: NEW_BADGE },
      { text: 'SplitLayout', link: `${langPrefix}/components/splitlayout`, badge: NEW_BADGE },
      { text: 'HolyGrailLayout', link: `${langPrefix}/components/holygraillayout`, badge: NEW_BADGE },
      { text: 'MagazineLayout', link: `${langPrefix}/components/magazinelayout`, badge: NEW_BADGE },
      { text: 'GridLayout', link: `${langPrefix}/components/gridlayout`, badge: NEW_BADGE },
      { text: 'MasonryLayout', link: `${langPrefix}/components/masonrylayout`, badge: NEW_BADGE },
      { text: 'HeroLayout', link: `${langPrefix}/components/herolayout`, badge: NEW_BADGE },
      { text: 'FullScreenLayout', link: `${langPrefix}/components/fullscreenlayout`, badge: NEW_BADGE },
      { text: 'AppShell', link: `${langPrefix}/components/appshell`, badge: NEW_BADGE },
    ],
    composables:[
      { text: 'useTheme', link: `${langPrefix}/composables/usetheme` },
      { text: 'useCustomTheme', link: `${langPrefix}/composables/usecustomtheme` },
      { text: 'useBreakpoint', link: `${langPrefix}/composables/usebreakpoint`, badge: NEW_BADGE },
      { text: 'usePrice', link: `${langPrefix}/composables/useprice`, badge: NEW_BADGE },
      { text: 'useFloatingPosition', link: `${langPrefix}/composables/usefloatingposition`, badge: NEW_BADGE },
      { text: 'useLocale', link: `${langPrefix}/composables/uselocale`, badge: NEW_BADGE },
      { text: 'useFormField', link: `${langPrefix}/composables/useformfield`, badge: NEW_BADGE },
      { text: 'useAnnouncer', link: `${langPrefix}/composables/useannouncer`, badge: NEW_BADGE },
      { text: 'useFocusTrap', link: `${langPrefix}/composables/usefocustrap`, badge: NEW_BADGE },
      { text: 'useDismiss', link: `${langPrefix}/composables/usedismiss`, badge: NEW_BADGE },
      { text: 'useListNavigation', link: `${langPrefix}/composables/uselistnavigation`, badge: NEW_BADGE },
    ]
  }

  return section ? (componentsItems?.[section as keyof typeof componentsItems] || []) : []
}
