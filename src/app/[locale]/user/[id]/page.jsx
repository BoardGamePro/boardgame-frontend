'use client'

import { useParams } from 'next/navigation'
import { useAuth } from '../../AuthProvider'
import ProfileMy from '@/components/ui/ProfileMy'
import ProfileUser from '@/components/ui/ProfileUser'

export default function ProfilePage() {
  const { id } = useParams()
  const { user } = useAuth()

  const isMyProfile = user?.id === id

  return isMyProfile ? <ProfileMy /> : <ProfileUser id={id} />
}
