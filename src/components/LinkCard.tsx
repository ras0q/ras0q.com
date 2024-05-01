import type { RefObject } from 'react'
import styled from 'styled-components'

type Props = {
  aRef: RefObject<HTMLAnchorElement>
  title: string
  body?: string
  href: string
}

const Container = styled.a`
  width: fit-content;
  display: inline-block;
  padding: 1.5rem;
  background-color: var(--ctp-macchiato-base);
  color: var(--ctp-macchiato-text);
  border-radius: 10px;
  user-select: none;
  white-space: nowrap;
  cursor: inherit;

  > * {
    margin: 0;
  }
`

export const LinkCard = ({ aRef, title, body, href }: Props) => {
  return (
    <Container ref={aRef} href={href} draggable="false">
      <h2>{title} →</h2>
      <p>{body}</p>
    </Container>
  )
}
