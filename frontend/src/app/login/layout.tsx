import { ReactNode } from 'react'

import { Container } from '@/shared/ui/Container'

interface LoginLayoutProps {
	children: ReactNode
}

export default function LoginLayout({ children }: LoginLayoutProps) {
	return <Container maxWidth='xs'>{children}</Container>
}
