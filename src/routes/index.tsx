import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tv, Gamepad2, Timer, Settings, Trophy, Users } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900 dark:text-slate-100">
            MTG Stream Manager
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Tournament administration and broadcast tools
          </p>
        </div>

        <Separator className="my-6" />

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Stream Overlay */}
          <Card className="hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Tv className="h-6 w-6 text-blue-500" />
                Stream Overlay
              </CardTitle>
              <CardDescription>
                The visual feed for OBS/Streamlabs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Displays current match players, life totals, deck names, and round timer.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Link to="/overlay">Open Overlay</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Player Controls */}
          <Card className="hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Gamepad2 className="h-6 w-6 text-green-500" />
                Player Controls
              </CardTitle>
              <CardDescription>
                Mobile interface for players
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Allows players to update their own life totals, poison counters, and more.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Link to="/player-controls">Launch Controls</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Round Controls (Admin) */}
          <Card className="hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Timer className="h-6 w-6 text-purple-500" />
                Live Match Admin
              </CardTitle>
              <CardDescription>
                Manage the active feature match
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Control the timer, edit player info, and force life total corrections.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                <Link to="/round-controls">Manage Match</Link>
              </Button>
            </CardFooter>
          </Card>

        </div>

        {/* Future Admin Section */}
        <div className="pt-8">
           <h2 className="text-2xl font-semibold tracking-tight mb-4 text-slate-800 dark:text-slate-200">
            Tournament Administration
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50 pointer-events-none grayscale">
             
             {/* Tournament Setup */}
             <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Tournament Setup
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                   Create new events, configure rounds, and swiss settings.
                </CardContent>
             </Card>

             {/* Roster & Pairings */}
             <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Roster & Pairings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                   Add players, view standings, and generate swiss pairings.
                </CardContent>
             </Card>

             {/* Settings */}
             <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                   Configure overlays, APIs, and database connections.
                </CardContent>
             </Card>

           </div>
           <p className="text-center text-sm text-slate-400 mt-4 italic">
             (Coming soon)
           </p>
        </div>
      </div>
    </div>
  )
}