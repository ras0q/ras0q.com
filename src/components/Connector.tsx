import type { RefObject } from 'react'
import { useRef, useEffect } from 'react'
import styled from 'styled-components'

type Props = {
  fromRef: RefObject<HTMLElement>
  toRef: RefObject<HTMLElement>
  direction?: 'leftToRight' | 'rightToLeft'
  curve?: number
}

export default ({ fromRef, toRef, direction = 'leftToRight', curve = 50 }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  const fit = (left: HTMLElement, right: HTMLElement) => {
    if (!svgRef.current || !pathRef.current) return

    const { scrollX, scrollY } = window
    const leftRect = left.getBoundingClientRect()
    const rightRect = right.getBoundingClientRect()
    const lx = scrollX + leftRect.right
    const ly = scrollY + leftRect.top + leftRect.height / 2
    const rx = scrollX + rightRect.left
    const ry = scrollY + rightRect.top + rightRect.height / 2
    const viewLeft = Math.min(lx, rx)
    const viewTop = Math.min(ly, ry)
    const w = Math.max(Math.abs(rx - lx), 1)
    const h = Math.max(Math.abs(ry - ly), 1)
    svgRef.current.setAttribute('viewBox', `${viewLeft}, ${viewTop}, ${w}, ${h}`)
    svgRef.current.style.left = `${viewLeft}px`
    svgRef.current.style.top = `${viewTop}px`
    svgRef.current.style.width = `${w}px`
    svgRef.current.style.height = `${h}px`

    pathRef.current.setAttribute(
      'd',
      `M ${lx}, ${ly} C ${lx + curve}, ${ly}, ${rx - curve}, ${ry}, ${rx}, ${ry}`,
    )
  }

  useEffect(() => {
    if (!fromRef.current || !toRef.current) return

    const [left, right] =
      direction === 'leftToRight'
        ? [fromRef.current, toRef.current]
        : [toRef.current, fromRef.current]

    const observer = new MutationObserver(() => fit(left, right))
    observer.observe(left, { attributes: true, characterData: true })
    observer.observe(right, { attributes: true, characterData: true })

    const resizeObserver = new ResizeObserver(() => fit(left, right))
    resizeObserver.observe(document.body)
    resizeObserver.observe(left)
    resizeObserver.observe(right)

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
    }
  }, [fromRef, toRef, direction, curve])

  const SVG = styled.svg`
    position: absolute;
    overflow: visible;
    z-index: -1;
  `

  const Path = styled.path`
    fill: none;
    stroke: var(--ctp-latte-text);
    stroke-width: 0.25rem;
  `

  return (
    <SVG ref={svgRef} version="1.1">
      <Path ref={pathRef} />
    </SVG>
  )
}
