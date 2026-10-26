# Changelog

All notable changes to this project will be documented in this file.

### [3.0.1](https://mahmoud-nb.github.io/surge.ui/compare/v3.0.0...v3.0.1) (2026-10-26)


### 📚 Documentation

* **CLAUDE:** procédure de release et publication automatique ([5ec1684](https://mahmoud-nb.github.io/surge.ui/commit/5ec1684781d70fb8d100de41c742d2ca004760f6))
* **Dialog:** déclare l'état des démos pour qu'elles s'ouvrent ([df91fb8](https://mahmoud-nb.github.io/surge.ui/commit/df91fb826e653d16d95f2708018167368a021cdd))
* imports et prérequis corrigés dans les guides et exemples ([d0eb010](https://mahmoud-nb.github.io/surge.ui/commit/d0eb010f4c1cadc90230da578553b41a757ede57))
* **readme:** README de la librairie et du dépôt à jour pour la 3.0 ([2f43c66](https://mahmoud-nb.github.io/surge.ui/commit/2f43c66c6cceb870826f62839de695aac15007c4))


### 🐛 Bug Fixes

* **Dialog:** titre et description protégés des styles de la page hôte ([ce50d98](https://mahmoud-nb.github.io/surge.ui/commit/ce50d9853d2b7452c900ebe449adbeba3d802bb9))
* **package:** types TypeScript résolus via le champ exports ([0b9606f](https://mahmoud-nb.github.io/surge.ui/commit/0b9606f618a2a636c1841cc2bd4d6baf8bc03d01))
* **Price:** décimales en exposant réduites et alignées en haut ([b9cc9c6](https://mahmoud-nb.github.io/surge.ui/commit/b9cc9c6dbc3b9979b6008642e5647c5f3a4c167a))
* **Slider:** pas de halo au survol d'une poignée désactivée ou en lecture seule ([d9cd09a](https://mahmoud-nb.github.io/surge.ui/commit/d9cd09a1e74cb2ecd6cc1be76a41db884334bd73))

## [3.0.0](https://mahmoud-nb.github.io/surge.ui/compare/v2.3.0...v3.0.0) (2026-10-25)


### ⚠ BREAKING CHANGES

* **Dialog:** la prop `zIndex` est sans effet (le dialog s'ouvre dans la couche supérieure du navigateur) et l'overlay en `div` est remplacé par `::backdrop`.
* **ui:** SuButton a désormais `type="button"` par défaut : passer `type="submit"` pour soumettre un formulaire.
* **ui:** SuSwitch est rendu dans un `<button>` au lieu d'un `<div>`.
* **ui:** peer dependency `vue ^3.5.0` (utilisation de `useId`).
* **ui:** `styles/_main.scss` n'existe plus : importer `styles/abstracts`.


### 🗑️ Deprecations

* `accessibility.announceToScreenReader()` : utiliser `announce()` ou `useAnnouncer()` (l'ancienne fonction délègue au nouveau mécanisme).
* `accessibility.trapFocus()` : utiliser `useFocusTrap()` ou `createFocusTrap()` (l'ancienne fonction délègue au nouveau piège).

### ♻️ Code Refactoring

* **Slider,FileUpload:** nouveau style et suppression des styles dupliqués ([ff2ad4b](https://mahmoud-nb.github.io/surge.ui/commit/ff2ad4ba7ad770dc95eade5dd63fed4a24a22b10))
* **styles:** ajoute des motifs SCSS partagés pour boutons, popovers et menus ([949a159](https://mahmoud-nb.github.io/surge.ui/commit/949a159a87c39e462258864b0c2d2fcdf6afaabf))
* **ui:** centralise le SCSS, ajoute des tokens de surface et corrige les formulaires ([8237d89](https://mahmoud-nb.github.io/surge.ui/commit/8237d89b79d878b991e19789d3f18432bd06af5e))


### 🐛 Bug Fixes

* **FloatButton:** la prop offset s'applique à toutes les largeurs ([811748a](https://mahmoud-nb.github.io/surge.ui/commit/811748a13602bae32e98ea5e01cdf5b4890fffaf))
* **Popover:** déclenchement au focus, mode contrôlé et superposition modale ([23cf483](https://mahmoud-nb.github.io/surge.ui/commit/23cf4835e19cc48f69e7bb656c01328aa8423ee4))


### 📚 Documentation

* **CLAUDE:** tests, addon a11y et useFloatingPosition ([9fb434d](https://mahmoud-nb.github.io/surge.ui/commit/9fb434d3b2e4e58eca1dbce222a750b617749c1d))
* **composables:** useFocusTrap, useDismiss et useListNavigation ([46c874e](https://mahmoud-nb.github.io/surge.ui/commit/46c874e47955a237ff6bca30340baa6e171399a0))
* **composables:** useLocale, useFormField et useAnnouncer ([b5d966f](https://mahmoud-nb.github.io/surge.ui/commit/b5d966f6aafa46916f3d8dee73acdafd215c6b21))
* **layouts:** page GridLayout ([ebe072c](https://mahmoud-nb.github.io/surge.ui/commit/ebe072c15842c8f89cf83d178c0d107327d185d8))
* **layouts:** pages des layouts et cadre de démonstration ([6d1d90e](https://mahmoud-nb.github.io/surge.ui/commit/6d1d90eb00de989513b1c2dc890795002b05fe6c))
* **storybook:** stories des layouts ([a963c47](https://mahmoud-nb.github.io/surge.ui/commit/a963c47371c6dd5c5ded6ea980a8716ae656090a))
* **storybook:** story du GridLayout ([b0b3cd1](https://mahmoud-nb.github.io/surge.ui/commit/b0b3cd1b39b9edc257ad7e8eef8246a03114bd5c))


### ✨ Features

* **Accordion:** ajoute le mode attaché et revoit le style ([27453e7](https://mahmoud-nb.github.io/surge.ui/commit/27453e77d06fe3fed228a833c55c893e8c7dfa1f))
* **actions:** nouveau style de Dropdown, FloatButton et OtpInput ([b792264](https://mahmoud-nb.github.io/surge.ui/commit/b7922647508058e122790f347c0b4d1cdb462767))
* **Avatar,Progress:** nouveau style des avatars et barres de progression ([b1e6a4c](https://mahmoud-nb.github.io/surge.ui/commit/b1e6a4cd642d38dc7f2909fdbcd7a23d58d4a636))
* **Badge,Alert:** nouveau style des étiquettes et des alertes ([cf86a33](https://mahmoud-nb.github.io/surge.ui/commit/cf86a33c8d03f4631e6a9bbfd3bcc3019faad502))
* **Card,Dialog:** nouveau style des conteneurs ([328b61f](https://mahmoud-nb.github.io/surge.ui/commit/328b61f80af5192de5c8d031b35891923ad82aad))
* **components:** libellés traduisibles et liaison automatique aux champs ([a740099](https://mahmoud-nb.github.io/surge.ui/commit/a7400992c8aeae3c9c319d7517f98c98d3d85ea2))
* **components:** navigation clavier et fermeture unifiées ([5452894](https://mahmoud-nb.github.io/surge.ui/commit/545289416d2a4fb5f04137e28041f7232659b2fc))
* **composables:** ajout de useFloatingPosition ([f3c2c79](https://mahmoud-nb.github.io/surge.ui/commit/f3c2c79f5fd53a2dd76466b8d7d312b51b2c676a))
* **composables:** annonces, locale et contexte de champ ([84d22b6](https://mahmoud-nb.github.io/surge.ui/commit/84d22b610f075966c61c8cd55911e30c541097de))
* **composables:** piège à focus, fermeture par couches et navigation clavier ([9eb5163](https://mahmoud-nb.github.io/surge.ui/commit/9eb5163d8c0a137d92c38fbb3ed2fe9c0bc5a4ca))
* **Dialog:** passage à l'élément natif <dialog> ([81fd4c8](https://mahmoud-nb.github.io/surge.ui/commit/81fd4c81ce5656dce24e55ae6315631e2cf8d2e2))
* **display:** alignement de Image, Heading, Panel, Price et Spinner sur les tokens ([57386c8](https://mahmoud-nb.github.io/surge.ui/commit/57386c8a6150da479d381d399242055b67f02ee7))
* **forms:** nouveau style des boutons, champs et listes de sélection ([83ee376](https://mahmoud-nb.github.io/surge.ui/commit/83ee376f1c6cf96e8ef26115cc56e390df8f967e))
* **forms:** nouveau style des cases à cocher et boutons radio ([30ef1a9](https://mahmoud-nb.github.io/surge.ui/commit/30ef1a93b0be1c02ca5d4a6ee339d8d2345b7d23))
* **Link,LinkGroup:** nouveau style et annonce des liens externes ([0d85699](https://mahmoud-nb.github.io/surge.ui/commit/0d85699b24e3b76333588369ec62180d7dd80c7c))
* **Popover,Dropdown:** positionnement flottant avec retournement automatique ([63c546f](https://mahmoud-nb.github.io/surge.ui/commit/63c546f7d829f1acd5539f9a2bb7828d06d26e0c))
* **SelectBox:** motif combobox accessible, saisie rapide et liste flottante ([0324d19](https://mahmoud-nb.github.io/surge.ui/commit/0324d19ecef87b49aab7570bb7a7ae9eea58a30c))
* **styles:** requêtes de conteneur et motifs communs des layouts ([55fdafe](https://mahmoud-nb.github.io/surge.ui/commit/55fdafe224c96c29f3dc75d34aada91eddec42a9))
* **Switch,Toggle:** nouveau style et option de marge du Switch ([f714489](https://mahmoud-nb.github.io/surge.ui/commit/f7144895022728774af1f5b3f0cd306bb153ffeb))
* **Tabs:** indicateur animé et variantes revues ([17ea0ce](https://mahmoud-nb.github.io/surge.ui/commit/17ea0ce89c9cd2e216a2f38edabd3ff28af36a89))
* **templates:** ajout de huit layouts mobile first ([b19d3e3](https://mahmoud-nb.github.io/surge.ui/commit/b19d3e39a2c709ddd68f515a0bb210ec44f614f9))
* **templates:** GridLayout remplace l'ancien Grid ([45b1a7c](https://mahmoud-nb.github.io/surge.ui/commit/45b1a7c0b0be0554f565db93d1427cbd23e5d447))

## [2.3.0](https://mahmoud-nb.github.io/surge.ui/compare/v2.2.0...v2.3.0) (2026-06-09)


### ✨ Features

* add Card component with various features and documentation ([d9bd6c6](https://mahmoud-nb.github.io/surge.ui/commit/d9bd6c6741d50c12ae42c4395cb7812e5fc28b7e))
* add documentation for useBreakpoint, useCustomTheme, and useTheme composables in both French and English ([f110915](https://mahmoud-nb.github.io/surge.ui/commit/f110915b9475f0061629d9ef5a5eabf31ff48af7))
* add launch configuration for Storybook and update parentId for formulaires ([2f02b9c](https://mahmoud-nb.github.io/surge.ui/commit/2f02b9c0bcc0e643a0353474905d73c974a56ac7))
* add OtpInput and OtpInputField components with customizable features ([59104e8](https://mahmoud-nb.github.io/surge.ui/commit/59104e81991355aa734cfdb7b81be3103c7f2c71))
* add usePrice composable and Price component for reactive price formatting ([4d93bed](https://mahmoud-nb.github.io/surge.ui/commit/4d93bed5c82d9517db8135ec4de913b4314b596b))
* update components documentation for Card component with detailed architecture, props, and accessibility features ([d841cc5](https://mahmoud-nb.github.io/surge.ui/commit/d841cc54d3809851933b4128d1004d0f959306f1))
* update composables documentation and add Price component details ([8ad4d5a](https://mahmoud-nb.github.io/surge.ui/commit/8ad4d5ac774c681eedff9cbcdffaae072e9b1afe))

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