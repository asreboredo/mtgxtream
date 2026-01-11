import { createFileRoute } from '@tanstack/react-router'
import RoundControls from '../components/functional/RoundControls/RoundControls'

export const Route = createFileRoute('/round-controls')({
  component: RoundControls,
})
