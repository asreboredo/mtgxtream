import { createFileRoute } from '@tanstack/react-router'
import Overlay from '../components/functional/Overlay/Overlay'

export const Route = createFileRoute('/overlay')({
  component: Overlay,
})
