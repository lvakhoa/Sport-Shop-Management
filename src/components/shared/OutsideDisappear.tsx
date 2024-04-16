'use client'
import React, { useRef, useEffect, useState } from 'react'
import { useBrowser } from '@/hooks'

interface IOutsideDisappear {
  isForceClose?: boolean
  setIsForceClose?: Function
  stateChanger: Function
  children: React.ReactNode
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideDisappear(
  ref: React.MutableRefObject<HTMLDivElement | null>,
  disappear: Function,
) {
  const { isBrowser } = useBrowser()
  const [includedNode, setIncludedNode] = useState<Element | null>()

  useEffect(() => {
    if (isBrowser) setIncludedNode(document.querySelector('.included-node'))
  }, [isBrowser])

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLElement) &&
        !includedNode?.contains(event.target as HTMLElement)
      ) {
        disappear()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, disappear, includedNode])
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideDisappear({
  isForceClose,
  setIsForceClose,
  stateChanger,
  children,
}: IOutsideDisappear) {
  const close = () => {
    stateChanger(false)
  }

  // use isForceClose in case need to close without clicking outside
  useEffect(() => {
    if (isForceClose && setIsForceClose) {
      stateChanger(false)
      setIsForceClose(false)
    }
  }, [isForceClose, setIsForceClose, stateChanger])

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  useOutsideDisappear(wrapperRef, close)

  return <div ref={wrapperRef}>{children}</div>
}
