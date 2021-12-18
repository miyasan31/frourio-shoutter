import { atom } from 'recoil'

export const user = atom({
  key: 'user',
  default: {
    id: '',
    name: '',
    profile: '',
    createdAt: new Date(),
    isSignin: false
  }
})
