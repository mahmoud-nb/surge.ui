# Changelog

All notable changes to this project will be documented in this file.

## [2.2.0](https://mahmoud-nb.github.io/surge.ui/compare/v2.1.0...v2.2.0) (2026-05-20)


### 🐛 Bug Fixes

* fix mcp windows settings ([0f5b4a2](https://mahmoud-nb.github.io/surge.ui/commit/0f5b4a2f17af3181dded6e193a687a7554923686))
* mcp settings ([c2667fc](https://mahmoud-nb.github.io/surge.ui/commit/c2667fc1fe1ec80b81f75df505680cf37d911fd3))
* reset deprecated themes ([9359cb1](https://mahmoud-nb.github.io/surge.ui/commit/9359cb1795fb4012bf25a8de24e09e40765ffa08))
* standardize default values in documentation across components ([c866271](https://mahmoud-nb.github.io/surge.ui/commit/c866271128ff16a32aedb972baedcfa2c7e06d22))


### ✨ Features

* add 'Getting Started' and 'Démarrage rapide' guides with navigation updates ([321129c](https://mahmoud-nb.github.io/surge.ui/commit/321129c4d090f94c84a37f120fd5c4dc2296abee))
* add commands for generating component stories and synchronizing documentation ([f878fa3](https://mahmoud-nb.github.io/surge.ui/commit/f878fa36fc067e13bf71c0286ecf9bccd1b942f1))
* add component thrad ([844f695](https://mahmoud-nb.github.io/surge.ui/commit/844f6959463bed3a28bffd4e5a905876fecca261))
* add metadata for new themes (default, forest, ocean, sunset) and update theme system documentation ([2c22ef5](https://mahmoud-nb.github.io/surge.ui/commit/2c22ef52f1d8f55076ac84f6aa9c907d01afeacf))
* add new AI agents and skills ([0b9f4c9](https://mahmoud-nb.github.io/surge.ui/commit/0b9f4c911a57d33f66e6af9328c8b2cf9bcd439a))
* add publish script to package.json for public access ([5459311](https://mahmoud-nb.github.io/surge.ui/commit/54593111f9bda794631b0bca284d007555d337dc))
* add Toggle and ToggleGroup components with documentation and stories ([337e143](https://mahmoud-nb.github.io/surge.ui/commit/337e143c76a6fbc1d4e90691f746abdb4ae98410))
* add useBreakpoint composable for responsive design and update project structure ([b0142a7](https://mahmoud-nb.github.io/surge.ui/commit/b0142a776168c0c32105217de13d96601a8c0969))
* enhance documentation with new components and structure updates ([b3c9d93](https://mahmoud-nb.github.io/surge.ui/commit/b3c9d932be18dce8865d9dd8d12ea2ba9a35b271))
* update theme statistics and documentation; increment update counts and adjust content lengths ([4f3e097](https://mahmoud-nb.github.io/surge.ui/commit/4f3e097c3fbde5343cd700b3898f21a1f61da1a3))
* update theme styles and tokens for forest, ocean, and sunset themes; remove dark and light theme files ([648d191](https://mahmoud-nb.github.io/surge.ui/commit/648d191abcc5354e8ed91b61459721ce222e22ec))

## [2.1.0](https://mahmoud-nb.github.io/surge.ui/compare/v2.0.0...v2.1.0) (2026-05-09)


### 📚 Documentation

* add CLAUDE.md for Claude Code onboarding ([30c6da9](https://mahmoud-nb.github.io/surge.ui/commit/30c6da93e0f011e052559ae1794b1b0cb08ba582))


### 🐛 Bug Fixes

* **a11y:** implement WCAG contrast ratio, i18n required label, fix dialog aria conflict ([43130ef](https://mahmoud-nb.github.io/surge.ui/commit/43130ef322c608f3a3532c67bd2b0e33899a3659))
* add formulaires metadata and update SliderField styles for improved UI consistency ([1f64dba](https://mahmoud-nb.github.io/surge.ui/commit/1f64dbae201d71c062d72c95e39c8a04ad18b6f7))
* use import.meta.env for Vite compat, kebab-case slot props, formatting ([095b989](https://mahmoud-nb.github.io/surge.ui/commit/095b9898a4d50961321cf448e46f06d95b4d2618))


### ✨ Features

* add default, forest, ocean, and sunset themes with light and dark modes ([1087498](https://mahmoud-nb.github.io/surge.ui/commit/10874984156eaf7dc0d7ad0b0a6c800f5bece4c7))
* add formulaires sub thread ([8c4c9c8](https://mahmoud-nb.github.io/surge.ui/commit/8c4c9c865b11479133b51f948bd5078c0036ac5c))
* add settings for thread-mind MCP, update package version to 2.0.0, and refactor environment variable loading in config files ([9812635](https://mahmoud-nb.github.io/surge.ui/commit/98126352062b3f63d9d9e422b9090ae14a25f6a8))
* add size prop to form fields and update inputRef accessors for better compatibility ([47c6e80](https://mahmoud-nb.github.io/surge.ui/commit/47c6e8003ba96d1af0dd9f330ac63bb87172e274))
* add themes section to the thread structure and create themes metadata file ([430fd12](https://mahmoud-nb.github.io/surge.ui/commit/430fd1277a4dd7321616269dc7a742a9d7230c70))
* enhance accessibility for input components by adding aria labels and roles for prefix/suffix elements ([d465483](https://mahmoud-nb.github.io/surge.ui/commit/d465483256f9e72344d70e95cb7ad23f8bf53def))
* quality improvements — i18n props, stable IDs, a11y fixes, stories & docs ([c902a01](https://mahmoud-nb.github.io/surge.ui/commit/c902a01becd1313c40b36d5a659e7dadd80a2159))
* update .gitignore, add Claude context management files, and refactor environment variable loading ([bd823df](https://mahmoud-nb.github.io/surge.ui/commit/bd823df2a47e05322fe712a777d663654da930d1))
* update readme file ([edcc1dd](https://mahmoud-nb.github.io/surge.ui/commit/edcc1dd3df632dabf32c38ad18c6e5bbdefd06c6))
* update theme mode options to include 'system' and remove 'auto' ([2545792](https://mahmoud-nb.github.io/surge.ui/commit/25457927130e94f239afc266f3151ed7610487e1))

## [2.0.0](https://mahmoud-nb.github.io/surge.ui/compare/v1.0.5...v2.0.0) (2026-03-07)


### ♻️ Code Refactoring

* **FormField:** update class naming convention and improve structure ([3b72762](https://mahmoud-nb.github.io/surge.ui/commit/3b72762087e28c8d805db6e0eb63858208bf0d17))
* **SelectBox:** update class naming convention and remove unused dir prop ([da2079a](https://mahmoud-nb.github.io/surge.ui/commit/da2079a0d207387123d5843047f7854911e22082))


### 🐛 Bug Fixes

* (theme) somes fixies ([7eba59d](https://mahmoud-nb.github.io/surge.ui/commit/7eba59d640e7fa11f52f87900192b79f8914ab1b))
* **docs:** fix use of slot props on vitepress pag ([e1d8b99](https://mahmoud-nb.github.io/surge.ui/commit/e1d8b9950c01e3c28e5bbf7bd354926ef3dafb53))
* **docs:** Update docs ([6d6fd00](https://mahmoud-nb.github.io/surge.ui/commit/6d6fd007afb224f9e8c5fa0188b8da2282067435))
* **docs:** Update docs ([6147408](https://mahmoud-nb.github.io/surge.ui/commit/614740863bec1cf2de9ce625da9c0e17a762eeba))


### ✨ Features

* (Accordion) migrate to new design systeme ([8306c0c](https://mahmoud-nb.github.io/surge.ui/commit/8306c0c065df57bc5535f0a75675a349fc80c759))
* (migrate) Avatar, accordion, AvatarGroup ([9ca3039](https://mahmoud-nb.github.io/surge.ui/commit/9ca3039e2b39b882fb86cc82ecb7a97a4fb35dc2))
* add and configure environment variables ([044df7d](https://mahmoud-nb.github.io/surge.ui/commit/044df7dbbd42a25ab4d0820dc03ab9a6b0061f16))
* add exemple + docs theme ([609c9ef](https://mahmoud-nb.github.io/surge.ui/commit/609c9efb2f656d78a96c6c04c9ee10517d5f9d98))
* add focus states for primary and secondary colors in dark, forest, ocean, sunset themes ([4e93ae3](https://mahmoud-nb.github.io/surge.ui/commit/4e93ae3b463ba200ce5e9f14aabc614d43fa8504))
* add Input component with full HTML type support, prefixes/suffixes, and accessibility features ([bceb065](https://mahmoud-nb.github.io/surge.ui/commit/bceb065d4d442845a8cf4211636075f7c8c053c6))
* add Slider component with dual-range support, tooltips, and accessibility features ([446c778](https://mahmoud-nb.github.io/surge.ui/commit/446c7780954219df8988dc08daeab21df4916d62))
* add SuTextarea component with advanced features and accessibility support ([93a404e](https://mahmoud-nb.github.io/surge.ui/commit/93a404e7b02a598f6e1cd8fd9bbd40d2b37fe327))
* **docs:** update component documentation with new SelectBox, RadioGroup, and CheckboxGroup components ([be55f91](https://mahmoud-nb.github.io/surge.ui/commit/be55f91ffebedcb7783557b04ccf5268332b60ed))
* enhance Icon component with dynamic loading and accessibility improvements ([40275be](https://mahmoud-nb.github.io/surge.ui/commit/40275bec7e0a6d41e5b4e297014cd2715e2123ca))
* **FormField:** add slot support for label and message rendering ([818f941](https://mahmoud-nb.github.io/surge.ui/commit/818f941039355bab747f9a26e0259437396d28d0))
* **formFieldGroup:** rename FormFields to FormFieldGroup and update documentation ([c169a50](https://mahmoud-nb.github.io/surge.ui/commit/c169a502b226cebb48a0c20a713a6877ff08ce10))
* **Icons:** bind args to Icon component in InButton story for improved flexibility ([bbace28](https://mahmoud-nb.github.io/surge.ui/commit/bbace2844229b0c173578a339744c6afbd8d1034))
* Implement comprehensive design system with themes and tokens ([032ac65](https://mahmoud-nb.github.io/surge.ui/commit/032ac65bc53a0f70b93265821f6395f5458d9c05))
* implement global theme management with dynamic preview and theme selector components ([87f96c8](https://mahmoud-nb.github.io/surge.ui/commit/87f96c80dce9d27685d94d71a9ff125815ab8119))
* **input:** add name attribute to Input component and update documentation examples ([cdb9282](https://mahmoud-nb.github.io/surge.ui/commit/cdb92828cdc67fd3c9c8a8582501258419aeca19))
* **Link:** add external link handling and improve story examples ([8556fbb](https://mahmoud-nb.github.io/surge.ui/commit/8556fbb9d353ca7c56535926b6eb2428170b9f06))
* **link:** update Link component to support 'top' icon display option and enhance documentation examples ([e5df58e](https://mahmoud-nb.github.io/surge.ui/commit/e5df58e67d443e80d185a675d66fbe568a91d975))
* Refactor Heading and Panel components for improved structure and add shadow variables ([15889c3](https://mahmoud-nb.github.io/surge.ui/commit/15889c3e3f71b9fb358aaaa819bfb7118ed0cd84))
* rename style folder ([3717ee5](https://mahmoud-nb.github.io/surge.ui/commit/3717ee5e32a9d3f38159534e188e4d53b8766559))
* update .gitignore ([affc039](https://mahmoud-nb.github.io/surge.ui/commit/affc0396e76d4ce55295b588ef4ae6094996c835))
* update components theme ([438069f](https://mahmoud-nb.github.io/surge.ui/commit/438069f2e6a90c92a60d71eae56fe29adba39c56))
* update components to use new design tokens and improve styling consistency across Button, SliderField, Alert, Dialog, Tabs, Grid, and GridCell ([2782517](https://mahmoud-nb.github.io/surge.ui/commit/2782517b770080e2d52daddc38d24dbf500eb700))
* update styles in ButtonGroup, Collapse, Dropdown, and FloatButton components to use new design tokens and improve responsiveness ([823ace4](https://mahmoud-nb.github.io/surge.ui/commit/823ace4bc2ad9f910219ca98e314df20ca88a4de))
* update styles in FileUploadField, FormFieldGroup, LinkGroup, Password, and Popover components to use new design tokens and improve responsiveness ([ce9b909](https://mahmoud-nb.github.io/surge.ui/commit/ce9b90956fd8bec9929d3c8fbdc0df80ef42650d))
* update styles to use new design tokens and improve responsiveness ([8d56de3](https://mahmoud-nb.github.io/surge.ui/commit/8d56de3ca7c0dac5d163a812e4dfb52f563b0ea7))

## [1.2.0](https://mahmoud-nb.github.io/surge.ui/compare/v1.0.5...v1.2.0) (2025-12-20)


### 🐛 Bug Fixes

* **docs:** Update docs ([6d6fd00](https://mahmoud-nb.github.io/surge.ui/commit/6d6fd007afb224f9e8c5fa0188b8da2282067435))
* **docs:** Update docs ([6147408](https://mahmoud-nb.github.io/surge.ui/commit/614740863bec1cf2de9ce625da9c0e17a762eeba))


### ♻️ Code Refactoring

* **FormField:** update class naming convention and improve structure ([3b72762](https://mahmoud-nb.github.io/surge.ui/commit/3b72762087e28c8d805db6e0eb63858208bf0d17))
* **SelectBox:** update class naming convention and remove unused dir prop ([da2079a](https://mahmoud-nb.github.io/surge.ui/commit/da2079a0d207387123d5843047f7854911e22082))


### ✨ Features

* add and configure environment variables ([044df7d](https://mahmoud-nb.github.io/surge.ui/commit/044df7dbbd42a25ab4d0820dc03ab9a6b0061f16))
* add Input component with full HTML type support, prefixes/suffixes, and accessibility features ([bceb065](https://mahmoud-nb.github.io/surge.ui/commit/bceb065d4d442845a8cf4211636075f7c8c053c6))
* add Slider component with dual-range support, tooltips, and accessibility features ([446c778](https://mahmoud-nb.github.io/surge.ui/commit/446c7780954219df8988dc08daeab21df4916d62))
* add SuTextarea component with advanced features and accessibility support ([93a404e](https://mahmoud-nb.github.io/surge.ui/commit/93a404e7b02a598f6e1cd8fd9bbd40d2b37fe327))
* enhance Icon component with dynamic loading and accessibility improvements ([40275be](https://mahmoud-nb.github.io/surge.ui/commit/40275bec7e0a6d41e5b4e297014cd2715e2123ca))
* **FormField:** add slot support for label and message rendering ([818f941](https://mahmoud-nb.github.io/surge.ui/commit/818f941039355bab747f9a26e0259437396d28d0))
* **formFieldGroup:** rename FormFields to FormFieldGroup and update documentation ([c169a50](https://mahmoud-nb.github.io/surge.ui/commit/c169a502b226cebb48a0c20a713a6877ff08ce10))
* **Icons:** bind args to Icon component in InButton story for improved flexibility ([bbace28](https://mahmoud-nb.github.io/surge.ui/commit/bbace2844229b0c173578a339744c6afbd8d1034))
* implement global theme management with dynamic preview and theme selector components ([87f96c8](https://mahmoud-nb.github.io/surge.ui/commit/87f96c80dce9d27685d94d71a9ff125815ab8119))
* **Link:** add external link handling and improve story examples ([8556fbb](https://mahmoud-nb.github.io/surge.ui/commit/8556fbb9d353ca7c56535926b6eb2428170b9f06))
* **link:** update Link component to support 'top' icon display option and enhance documentation examples ([e5df58e](https://mahmoud-nb.github.io/surge.ui/commit/e5df58e67d443e80d185a675d66fbe568a91d975))

## [1.1.0](https://mahmoud-nb.github.io/surge.ui/compare/v1.0.5...v1.1.0) (2025-12-01)


### 🐛 Bug Fixes

* **docs:** Update docs ([6d6fd00](https://mahmoud-nb.github.io/surge.ui/commit/6d6fd007afb224f9e8c5fa0188b8da2282067435))
* **docs:** Update docs ([6147408](https://mahmoud-nb.github.io/surge.ui/commit/614740863bec1cf2de9ce625da9c0e17a762eeba))


### ✨ Features

* add and configure environment variables ([044df7d](https://mahmoud-nb.github.io/surge.ui/commit/044df7dbbd42a25ab4d0820dc03ab9a6b0061f16))
* enhance Icon component with dynamic loading and accessibility improvements ([40275be](https://mahmoud-nb.github.io/surge.ui/commit/40275bec7e0a6d41e5b4e297014cd2715e2123ca))
* **Icons:** bind args to Icon component in InButton story for improved flexibility ([bbace28](https://mahmoud-nb.github.io/surge.ui/commit/bbace2844229b0c173578a339744c6afbd8d1034))
* implement global theme management with dynamic preview and theme selector components ([87f96c8](https://mahmoud-nb.github.io/surge.ui/commit/87f96c80dce9d27685d94d71a9ff125815ab8119))
* **Link:** add external link handling and improve story examples ([8556fbb](https://mahmoud-nb.github.io/surge.ui/commit/8556fbb9d353ca7c56535926b6eb2428170b9f06))
* **link:** update Link component to support 'top' icon display option and enhance documentation examples ([e5df58e](https://mahmoud-nb.github.io/surge.ui/commit/e5df58e67d443e80d185a675d66fbe568a91d975))

### [1.0.5](https://mahmoud-nb.github.io/surge.ui/compare/v0.0.1-beta.0...v1.0.5) (2025-11-22)


### 🐛 Bug Fixes

* lint fix ([85d5708](https://mahmoud-nb.github.io/surge.ui/commit/85d57088237face7818e5a6742ea3151443fdedb))
* **Panel:** Update Panel type ([5d22b58](https://mahmoud-nb.github.io/surge.ui/commit/5d22b58c9f38829552dd6e98fe3d4be1e26e79f0))
* **storybook:** fix storybook config ([687054f](https://mahmoud-nb.github.io/surge.ui/commit/687054fe8d54f34d0e852b06409445a7349c697d))
* unify projects versions ([aaa5243](https://mahmoud-nb.github.io/surge.ui/commit/aaa524380d005801bf5023ee79b32da8207f0b5d))
* update Heading component styles and correct mixin naming ([4c387c5](https://mahmoud-nb.github.io/surge.ui/commit/4c387c51b0431b697f61008564219524075cc148))

### [0.0.1](https://github.com/mahmoud-nb/surge.ui/compare/v0.0.1-beta.0...v0.0.1) (2025-11-21)


### Bug Fixes

* lint fix ([85d5708](https://github.com/mahmoud-nb/surge.ui/commit/85d57088237face7818e5a6742ea3151443fdedb))
* update Heading component styles and correct mixin naming ([4c387c5](https://github.com/mahmoud-nb/surge.ui/commit/4c387c51b0431b697f61008564219524075cc148))

## [1.0.0] - 2025-11-15
### Added
- Initial beta release of the SurgeUI Vue Design System.
- Core component architecture following Atomic Design (Atoms, Molecules, Organisms).
- Base SCSS structure with semantic tokens and theming support.
- Vue 3 + TypeScript composables and internal utilities.
- Accessibility-first implementation (WCAG AA).

### Notes
- This release is intended entirely for testing and solution optimization. The goal is to explore different technical approaches in order to identify the best way to build and structure the design system.

- Therefore, this is not a **stable** release. The first officially stable version will be **2.0.0**