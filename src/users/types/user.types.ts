export type UserDetails = {
  fullName: string,
  email: string,
  password: string
}

export type PartialUserDetails = Omit<UserDetails, 'password'>