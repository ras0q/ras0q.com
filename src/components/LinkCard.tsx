import type { RefObject } from 'react'
import styled from 'styled-components'

type Props = {
  divRef: RefObject<HTMLDivElement>
  title: string
  body?: string
  href: string
}

const Container = styled.div`
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

  a {
    color: var(--ctp-macchiato-text);
  }
`

export const LinkCard = ({ divRef: divRef, title, body, href }: Props) => {
  return (
    <Container ref={divRef} draggable="false">
      <h2>
        <a href={href}>{title} →</a>
      </h2>
      <p>{body}</p>
    </Container>
  )
}
