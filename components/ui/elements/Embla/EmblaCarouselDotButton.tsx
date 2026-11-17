import React, {
  ComponentPropsWithRef,
  useCallback,
  useRef,
  useSyncExternalStore
} from 'react'
import { EmblaCarouselType } from 'embla-carousel'

const EMPTY_SNAPS: number[] = []

type UseDotButtonType = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
  const snapsCache = useRef<number[]>(EMPTY_SNAPS)

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!emblaApi) return () => {}
      emblaApi.on('reInit', onStoreChange).on('select', onStoreChange)
      return () => {
        emblaApi.off('reInit', onStoreChange).off('select', onStoreChange)
      }
    },
    [emblaApi]
  )

  const selectedIndex = useSyncExternalStore(
    subscribe,
    () => (emblaApi ? emblaApi.selectedScrollSnap() : 0),
    () => 0
  )
  const scrollSnaps = useSyncExternalStore(
    subscribe,
    () => {
      const next = emblaApi ? emblaApi.scrollSnapList() : EMPTY_SNAPS
      const prev = snapsCache.current
      if (
        prev.length === next.length &&
        prev.every((snap, index) => snap === next[index])
      ) {
        return prev
      }
      snapsCache.current = next
      return next
    },
    () => EMPTY_SNAPS
  )

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  }
}

type PropType = ComponentPropsWithRef<'button'>

export const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  )
}
