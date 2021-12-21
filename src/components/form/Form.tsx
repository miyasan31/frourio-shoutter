import { Button } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import React, { FC, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import { user } from '~/atoms'
import { calcTextAreaHeight } from '~/functions'

const ICON_PHOTO_SIZE = 48

type Props = {
  type: 'tweet' | 'reply'
  children?: React.ReactNode
  handlePost: any
}

export const Form: FC<Props> = (props) => {
  const userInfo = useRecoilValue(user)

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm()

  const value = useWatch({
    control,
    name: props.type,
    defaultValue: ''
  })

  const label = useMemo(() => {
    return props.type === 'tweet'
      ? ['ツイートする', 'いまどうしてる？']
      : ['返信', '返信をツイート']
  }, [])

  return (
    <Wrap>
      {props.children}
      <TweetFromWrap>
        <IconPhotoWrap>
          <UserIcon
            src={userInfo.icon}
            alt="Picture of the author"
            width={ICON_PHOTO_SIZE}
            height={ICON_PHOTO_SIZE}
          />
        </IconPhotoWrap>

        <FromWrap>
          <form onSubmit={handleSubmit(props.handlePost)}>
            <TweetInput
              {...register(props.type)}
              placeholder={label[1]}
              rows={calcTextAreaHeight(value)}
            />
            <ButtonWrap>
              <Button
                type="submit"
                color="white"
                bgColor="blue.300"
                rounded="full"
                isLoading={isSubmitting}
              >
                {label[0]}
              </Button>
            </ButtonWrap>
          </form>
        </FromWrap>
      </TweetFromWrap>
    </Wrap>
  )
}

const Wrap = styled.div`
  padding-top: 0.75rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom: 1px solid #eeeeee;
`

const TweetFromWrap = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`

const IconPhotoWrap = styled.div`
  min-width: fit-content;
`

const FromWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.25rem;
  width: 100%;
`

const TweetInput = styled.textarea`
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  outline: none;
	resize: none;
  border-bottom: 1px solid #eeeeee;
  font-size: 1.25rem:
`

const ButtonWrap = styled.div`
  display: flex;
  justify-content: end;
  min-width: fit-content;
  padding-bottom: 0.5rem;
`

const UserIcon = styled(Image)`
  border-radius: 9999px;
`
