import { createFileRoute } from '@tanstack/react-router'
import PlayerControls from '../components/functional/PlayerControls/PlayerControls'

export const Route = createFileRoute('/player-controls')({
  component: PlayerControls,
})
