import { Gender, UserStatus } from '@prisma/client'
import { enumToOptions } from '../helper'

export const genders = enumToOptions(Gender)

export const userStatus = enumToOptions(UserStatus)
