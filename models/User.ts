import { Timestamp } from '@firebase/firestore-types';

export default class User {
  uid!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  createdAt!: Timestamp | Date;
  emailVerified!: boolean;
  profileViewPrivacy!: UserProfileViewPrivacyEnum;
  avatarURL!: string | null;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}

export enum UserProfileViewPrivacyEnum { PUBLIC, PRIVATE, CLOSED }