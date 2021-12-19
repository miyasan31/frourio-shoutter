import { atom } from 'recoil'

export const user = atom({
  key: 'user',
  default: {
    id: '',
    name: '',
    profile: '',
    icon: '',
    createdAt: new Date(),
    isSignin: false
  }
})
