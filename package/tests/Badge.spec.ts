import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from '@/components/atoms/Badge.vue'

describe('SuBadge — pastille de statut', () => {
  it('dot : pastille décorative avant le libellé', () => {
    const wrapper = mount(Badge, { props: { variant: 'success', dot: true }, slots: { default: 'En cours' } })
    const dot = wrapper.find('.su-badge__dot')
    expect(dot.exists()).toBe(true)
    expect(dot.attributes('aria-hidden')).toBe('true')
    expect(wrapper.text()).toBe('En cours')
    expect(wrapper.classes()).not.toContain('su-badge--dot-only')
  })

  it('pulse implique la pastille et anime son halo', () => {
    const wrapper = mount(Badge, { props: { pulse: true }, slots: { default: 'En direct' } })
    expect(wrapper.find('.su-badge__dot').exists()).toBe(true)
    expect(wrapper.classes()).toContain('su-badge--pulse')
  })

  it('pastille seule : image nommée par ariaLabel', () => {
    const wrapper = mount(Badge, { props: { variant: 'success', dot: true, ariaLabel: 'En ligne' } })
    expect(wrapper.classes()).toContain('su-badge--dot-only')
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('En ligne')
  })

  it('pastille seule sans ariaLabel : avertissement', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mount(Badge, { props: { dot: true } })
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('[SuBadge]'))
    warn.mockRestore()
  })
})
