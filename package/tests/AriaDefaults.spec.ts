import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import Badge from '@/components/atoms/Badge.vue'
import Button from '@/components/atoms/Button.vue'
import FileUpload from '@/components/atoms/FileUpload.vue'
import Image from '@/components/atoms/Image.vue'
import Input from '@/components/atoms/Input.vue'
import Slider from '@/components/atoms/Slider.vue'
import Switch from '@/components/atoms/Switch.vue'
import Textarea from '@/components/atoms/Textarea.vue'
import FileUploadField from '@/components/molecules/FileUploadField.vue'
import InputField from '@/components/molecules/InputField.vue'
import Password from '@/components/molecules/Password.vue'
import PasswordField from '@/components/molecules/PasswordField.vue'
import SliderField from '@/components/molecules/SliderField.vue'
import SwitchField from '@/components/molecules/SwitchField.vue'
import TextareaField from '@/components/molecules/TextareaField.vue'

// Vue change une prop booléenne absente en false : sans défaut undefined,
// chaque composant posait aria-invalid="false", aria-hidden="false"… et
// SuButton aria-expanded / aria-pressed (lu « bouton bascule » partout).

const cases: [string, Component, Record<string, unknown>][] = [
  ['Badge', Badge, {}],
  ['Button', Button, {}],
  ['FileUpload', FileUpload, {}],
  ['Image', Image, { src: 'photo.jpg', alt: 'Photo' }],
  ['Input', Input, {}],
  ['Slider', Slider, { modelValue: 10 }],
  ['Switch', Switch, {}],
  ['Textarea', Textarea, {}],
  ['FileUploadField', FileUploadField, { label: 'Fichiers' }],
  ['Password', Password, {}],
  ['PasswordField', PasswordField, { label: 'Mot de passe' }],
  ['SliderField', SliderField, { label: 'Volume', modelValue: 10 }],
  // Les champs transmettent leurs props à l'atome : un false transmis serait rendu
  ['InputField', InputField, { label: 'Nom' }],
  ['SwitchField', SwitchField, { label: 'Notifications' }],
  ['TextareaField', TextareaField, { label: 'Message' }]
]

describe('Props ARIA booléennes', () => {
  it.each(cases)("%s ne pose aucun attribut ARIA booléen qu'on ne lui a pas donné", (_name, component, props) => {
    const html = mount(component, { props }).html()
    expect(html).not.toMatch(/aria-(invalid|required|hidden|expanded|pressed)="false"/)
  })

  it("SuButton n'est pas une bascule par défaut", () => {
    const wrapper = mount(Button, { slots: { default: 'Enregistrer' } })
    expect(wrapper.attributes('aria-expanded')).toBeUndefined()
    expect(wrapper.attributes('aria-pressed')).toBeUndefined()
  })

  it('SuButton garde une valeur false fournie explicitement', () => {
    const wrapper = mount(Button, { props: { ariaExpanded: false, ariaPressed: false } })
    expect(wrapper.attributes('aria-expanded')).toBe('false')
    expect(wrapper.attributes('aria-pressed')).toBe('false')
  })
})
