'use client'

import { Modal } from '@/components/ui/Modal'
import { AuthForm } from './AuthForm'
import { useAuthModal } from '@/store/authModalStore'

export const AuthModal = () => {
  const { isOpen, closeAuth } = useAuthModal()

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAuth}
      title="🗺️ Join the Adventure"
    >
      <AuthForm onSuccess={closeAuth} />
    </Modal>
  )
}