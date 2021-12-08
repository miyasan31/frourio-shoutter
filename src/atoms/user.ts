import { atom } from 'recoil'

export const user = atom({
  key: 'user',
  default: {
    id: 'user1',
    name: 'テストユーザー2'
  }
})
