import { IconButton as Button } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { FC, MouseEvent } from 'react'

type Props = {
  icon: JSX.Element
  count?: number
  isCount?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const IconButton: FC<Props> = (props) => {
  const isCount = props.isCount ?? true

  return (
    <Wrap>
      <Icon
        aria-label="icon button"
        icon={props.icon}
        onClick={props.onClick}
      />
      {isCount ? props.count : null}
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`

const Icon = styled(Button)`
  border-radius: 9999px;
  background-color: #ffffff00;
  &:hover {
    background-color: #56adff3b;
  }
`
