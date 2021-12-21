import { atom } from 'recoil';

export const user = atom({
  key: 'user',
  default: {
    id: '',
    name: '',
    profile: '',
    icon: '',
    email: '',
    createdAt: new Date(),
    isSignin: false
  }
});
