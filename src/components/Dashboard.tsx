import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Calendar, Users, Clock, FileText, Plus, Settings, TrendingUp, Activity } from 'lucide-react'
import { blink } from '../blink/client'
import { TeamsManager } from './TeamsManager'
import { IceTimeCalendar } from './IceTimeCalendar'
import { ExportCenter } from './ExportCenter'

interface User {
  id: string
  name: string
  email: string
  associationName: string
}

interface DashboardProps {
  user: User
}

export function Dashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const handleSignOut = () => {
    blink.auth.logout()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl mr-4 shadow-lg">
                <Clock className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Hockey Ice Time Manager</h1>
                <p className="text-sm text-muted-foreground font-medium">{user.associationName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">Welcome back!</p>
                <p className="text-xs text-muted-foreground">{user.name}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="font-medium">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 h-12 bg-muted/50">
            <TabsTrigger value="overview" className="flex items-center gap-2 font-medium">
              <Activity className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-2 font-medium">
              <Users className="w-4 h-4" />
              Teams
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2 font-medium">
              <Calendar className="w-4 h-4" />
              Ice Time
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2 font-medium">
              <FileText className="w-4 h-4" />
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-blue-900">Total Teams</CardTitle>
                  <Users className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-900">8</div>
                  <p className="text-xs text-blue-700 font-medium">Active teams registered</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-green-900">This Week</CardTitle>
                  <Clock className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-900">24</div>
                  <p className="text-xs text-green-700 font-medium">Ice slots assigned</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md bg-gradient-to-br from-slate-50 to-slate-100/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-900">Available</CardTitle>
                  <Calendar className="h-5 w-5 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">6</div>
                  <p className="text-xs text-slate-700 font-medium">Open slots remaining</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-purple-900">Utilization</CardTitle>
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-900">80%</div>
                  <p className="text-xs text-purple-700 font-medium">Ice time efficiency</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card className="shadow-md border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-foreground">Recent Activity</CardTitle>
                  <CardDescription>Latest ice time assignments and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-semibold text-blue-900">Mighty Ducks</p>
                      <p className="text-sm text-blue-700">Practice - Today 7:00 PM</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-300">Practice</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="font-semibold text-green-900">Ice Hawks</p>
                      <p className="text-sm text-green-700">Game - Tomorrow 8:00 PM</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-300">Game</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div>
                      <p className="font-semibold text-slate-900">Storm Riders</p>
                      <p className="text-sm text-slate-700">Practice - Wed 6:00 PM</p>
                    </div>
                    <Badge className="bg-slate-100 text-slate-800 border-slate-300">Practice</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-md border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-foreground">Quick Actions</CardTitle>
                  <CardDescription>Common tasks to get things done faster</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full justify-start h-12 bg-primary hover:bg-primary/90 shadow-md font-semibold" 
                    onClick={() => setActiveTab('teams')}
                  >
                    <Plus className="w-5 h-5 mr-3" />
                    Add New Team
                  </Button>
                  <Button 
                    className="w-full justify-start h-12 bg-accent hover:bg-accent/90 shadow-md font-semibold" 
                    onClick={() => setActiveTab('schedule')}
                  >
                    <Calendar className="w-5 h-5 mr-3" />
                    Assign Ice Time
                  </Button>
                  <Button 
                    className="w-full justify-start h-12 bg-green-600 hover:bg-green-700 text-white shadow-md font-semibold" 
                    onClick={() => setActiveTab('export')}
                  >
                    <FileText className="w-5 h-5 mr-3" />
                    Export Schedules
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teams">
            <TeamsManager userId={user.id} />
          </TabsContent>

          <TabsContent value="schedule">
            <IceTimeCalendar userId={user.id} />
          </TabsContent>

          <TabsContent value="export">
            <ExportCenter userId={user.id} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}