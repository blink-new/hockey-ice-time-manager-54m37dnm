import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { blink } from '../blink/client'
import { useToast } from '../hooks/use-toast'
import { Clock, Users, Calendar, Zap } from 'lucide-react'

export function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSignIn = () => {
    setIsLoading(true)
    blink.auth.login()
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Hero content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-lg">
                <Clock className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Hockey Ice Time</h1>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Manage Your Hockey Association's
              <span className="text-primary block">Ice Time</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-lg">
              Streamline ice time scheduling, team management, and communication for your hockey association with our easy-to-use platform.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Team Management</h3>
              <p className="text-sm text-muted-foreground text-center lg:text-left">
                Organize teams and manager contacts
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Smart Scheduling</h3>
              <p className="text-sm text-muted-foreground text-center lg:text-left">
                Visual calendar with drag-and-drop
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Quick Export</h3>
              <p className="text-sm text-muted-foreground text-center lg:text-left">
                Export schedules to PDF, Excel, CSV
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">Get Started</CardTitle>
              <CardDescription className="text-base">
                Sign in to manage your hockey association's ice time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">What you'll get:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Unlimited team management</li>
                    <li>• Visual ice time calendar</li>
                    <li>• Schedule exports & email</li>
                    <li>• Manager notifications</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={handleSignIn}
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In to Continue'
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Secure authentication powered by Blink
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}