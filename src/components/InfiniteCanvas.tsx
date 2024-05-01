import { Connector } from './Connector.tsx'
import { LinkCard } from '../components/LinkCard.tsx'
import { domain, subDomains, subRoutes } from '../libs/consts'
import { useEffect, useRef, type RefObject } from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  height: 100vh;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6rem;
`

const CardsContainer = styled.div`
  max-width: 150px;
  display: flex;
  flex-direction: column;
  gap: 5rem;
`

const draggableStyle = css`
  position: relative;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`

const DraggableLinkCard = styled(LinkCard)`
  ${draggableStyle}
  pointer-events: none;
`

const Title = styled.h1`
  ${draggableStyle}
  font-size: 5rem;
  margin: 0;
  user-select: none;
  display: inline-block;
  background: linear-gradient(120deg, var(--ctp-latte-lavender), var(--ctp-latte-pink));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media screen and (max-width: 600px) {
    font-size: 4rem;
  }
`

export const InfiniteCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subDomainsRefs = subDomains.map(() => useRef<HTMLAnchorElement>(null))
  const subRoutesRefs = subRoutes.map(() => useRef<HTMLAnchorElement>(null))
  const draggableRefs: RefObject<HTMLElement>[] = [titleRef, ...subDomainsRefs, ...subRoutesRefs]

  const nowOffset = (el: HTMLElement) => {
    return {
      nowLeft: el.offsetLeft,
      nowTop: el.offsetTop,
    }
  }

  useEffect(() => {
    draggableRefs.forEach((ref) => {
      const el = ref.current
      if (!el) return

      // save original position for damping oscillation
      const { nowLeft: originalLeft, nowTop: originalTop } = nowOffset(el)

      el.addEventListener('pointermove', (e) => {
        if (e.buttons === 1) {
          const { nowLeft, nowTop } = nowOffset(el)
          const left = nowLeft + e.movementX
          const top = nowTop + e.movementY

          // document.body.style.touchAction = 'none'
          el.style.left = `${left - originalLeft}px`
          el.style.right = 'auto'
          el.style.top = `${top - originalTop}px`
          el.style.bottom = 'auto'
          el.style.position = 'relative'
          el.draggable = false
          el.setPointerCapture(e.pointerId)
        }
      })

      el.addEventListener('pointerup', (e) => {
        // document.body.style.touchAction = 'auto'
        el.releasePointerCapture(e.pointerId)

        // return to original position with damping oscillation
        const omega = 0.01
        const b = 0.001
        const f = 0.01
        const { nowLeft: left0, nowTop: top0 } = nowOffset(el)
        const ts0 = performance.now()
        const returnToOriginal = (ts: DOMHighResTimeStamp) => {
          const { nowLeft, nowTop } = nowOffset(el)
          if (Math.abs(nowLeft - originalLeft) < f && Math.abs(nowTop - originalTop) < f) return

          const t = ts - ts0
          const dx = (left0 - originalLeft) * Math.exp(-b * t) * Math.cos(omega * t)
          const dy = (top0 - originalTop) * Math.exp(-b * t) * Math.cos(omega * t)
          el.style.left = `${dx}px`
          el.style.top = `${dy}px`

          requestAnimationFrame(returnToOriginal)
        }
        requestAnimationFrame(returnToOriginal)
      })
    })
  }, [draggableRefs])

  return (
    <Container ref={containerRef}>
      <CardsContainer key="subDomains">
        {subDomains.map(({ name, description }, i) => (
          <>
            <Connector key={'connector_' + name} fromRef={subDomainsRefs[i]} toRef={titleRef} />
            <DraggableLinkCard
              key={name}
              aRef={subDomainsRefs[i]}
              title={name}
              body={description}
              href={`https://${name}.${domain}`}
            />
          </>
        ))}
      </CardsContainer>

      <Title ref={titleRef} key="title">
        ras0q.com
      </Title>

      <CardsContainer key="subRoutes">
        {subRoutes.map(({ path, description }, i) => (
          <>
            <Connector key={'connector_' + path} fromRef={subRoutesRefs[i]} toRef={titleRef} r2l />
            <DraggableLinkCard
              key={path}
              aRef={subRoutesRefs[i]}
              title={path}
              body={description}
              href={path}
            />
          </>
        ))}
      </CardsContainer>
    </Container>
  )
}
