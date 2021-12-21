import useAspidaSWR from '@aspida/swr'
import { Button } from '@chakra-ui/react'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { user } from '~/atoms'
import { Progress } from '~/components'
import { useGetAccessToken } from '~/hooks'
import { useTweetAction } from '~/hooks'
import { apiClient } from '~/utils'

const FollowPage: NextPage = () => {
  const { handlePostFollow } = useTweetAction()

  const userInfo = useRecoilValue(user)
  const { token } = useGetAccessToken()

  const { data: userList, error } = useAspidaSWR(apiClient.user, {
    headers: { authorization: `Bearer ${token}` },
    enabled: !!token && !!userInfo.id
  })

  if (error) return <div>error</div>
  if (!userList) return <Progress h="100px" />

  return (
    <div>
      <h1>Follow</h1>
      <p>気になるユーザーをフォローしてください</p>

      {userList.map((t) => {
        if (t.id === userInfo.id) return null
        return (
          <div key={t.id}>
            <p>{t.name}</p>
            <Button onClick={(e) => handlePostFollow(e, t.id)}>
              フォローする
            </Button>
          </div>
        )
      })}

      <Link href="/">
        <a>ホーム画面へ</a>
      </Link>
    </div>
  )
}

export default FollowPage
