import { Lottie } from '@crello/react-lottie'
import type { FC, MouseEvent } from 'react'
import animationData from './19898-star.json'
import {
  ChatBubbleIcon,
  LoopIcon,
  Share1Icon,
  StarIcon
} from '@radix-ui/react-icons'
import styled from '@emotion/styled'
import { IconButton } from './IconButton'

const animationConfig = {
  animationData: animationData,
  loop: false,
  autoplay: true
}

type Props = {
  isRetweet: boolean
  isLike: boolean
  retweetCount: number
  likeCount: number
  commentCount: number
  handleToggleLike: (event: MouseEvent<HTMLButtonElement>) => void
  handleToggleRetweet: (event: MouseEvent<HTMLButtonElement>) => void
}

export const TweetActionGroup: FC<Props> = (props) => {
  return (
    <IconGroupWrap>
      <IconButton icon={<ChatBubbleIcon />} count={props.commentCount} />

      <IconButton
        icon={<LoopIcon />}
        count={props.retweetCount}
        onClick={props.handleToggleRetweet}
      />

      <IconButton
        count={props.likeCount}
        icon={
          props.isLike ? (
            <Lottie
              config={animationConfig}
              speed={1}
              width="32px"
              height="32px"
            />
          ) : (
            <StarIcon />
          )
        }
        onClick={props.handleToggleLike}
      />

      <IconButton icon={<Share1Icon />} isCount={false} />
    </IconGroupWrap>
  )
}

const IconGroupWrap = styled.div`
  display: flex;
  justify-content: space-between;

  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-right: 2rem;
`
