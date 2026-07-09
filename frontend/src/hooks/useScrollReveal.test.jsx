import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import useScrollReveal from './useScrollReveal'

function RevealFixture({ selector }) {
  useScrollReveal(selector)
  return (
    <>
      <div className="reveal" data-testid="a" />
      <div className="reveal" data-testid="b" />
    </>
  )
}

describe('useScrollReveal', () => {
  let observeMock
  let unobserveMock
  let disconnectMock
  let capturedCallback

  beforeEach(() => {
    observeMock = vi.fn()
    unobserveMock = vi.fn()
    disconnectMock = vi.fn()
    capturedCallback = null

    globalThis.IntersectionObserver = vi.fn(function (callback) {
      capturedCallback = callback
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: disconnectMock,
      }
    })
  })

  afterEach(() => {
    cleanup()
  })

  it('observes every element matching the selector on mount', () => {
    render(<RevealFixture />)
    expect(observeMock).toHaveBeenCalledTimes(2)
  })

  it('adds the "visible" class to an element once it intersects', () => {
    const { getByTestId } = render(<RevealFixture />)
    const target = getByTestId('a')
    expect(target).not.toHaveClass('visible')

    capturedCallback([{ isIntersecting: true, target }])

    expect(target).toHaveClass('visible')
  })

  it('stops observing an element after it has been revealed', () => {
    const { getByTestId } = render(<RevealFixture />)
    const target = getByTestId('a')

    capturedCallback([{ isIntersecting: true, target }])

    expect(unobserveMock).toHaveBeenCalledWith(target)
  })

  it('leaves elements that have not intersected yet untouched', () => {
    const { getByTestId } = render(<RevealFixture />)
    const target = getByTestId('b')

    capturedCallback([{ isIntersecting: false, target }])

    expect(target).not.toHaveClass('visible')
    expect(unobserveMock).not.toHaveBeenCalledWith(target)
  })

  it('disconnects the observer on unmount', () => {
    const { unmount } = render(<RevealFixture />)
    unmount()
    expect(disconnectMock).toHaveBeenCalledTimes(1)
  })
})
