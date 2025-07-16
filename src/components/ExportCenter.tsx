import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { FileText, Download, Mail, Calendar, Users } from 'lucide-react'
import { useToast } from '../hooks/use-toast'

interface ExportCenterProps {
  userId: string
}

export function ExportCenter({ userId }: ExportCenterProps) {
  const [selectedTeam, setSelectedTeam] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('')
  const [selectedFormat, setSelectedFormat] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const mockTeams = [
    { id: '1', name: 'Mighty Ducks', manager: 'Gordon Bombay', email: 'gordon@mightyducks.com' },
    { id: '2', name: 'Ice Hawks', manager: 'Sarah Johnson', email: 'sarah@icehawks.com' },
    { id: '3', name: 'Storm Riders', manager: 'Mike Wilson', email: 'mike@stormriders.com' }
  ]

  const mockScheduleData = [
    { date: '2024-01-15', time: '18:00-19:30', type: 'Practice', team: 'Mighty Ducks' },
    { date: '2024-01-17', time: '19:00-20:30', type: 'Practice', team: 'Ice Hawks' },
    { date: '2024-01-19', time: '20:00-21:30', type: 'Game', team: 'Storm Riders' },
    { date: '2024-01-22', time: '18:30-20:00', type: 'Game', team: 'Mighty Ducks' }
  ]

  const handleExport = async () => {
    if (!selectedTeam || !selectedPeriod || !selectedFormat) {
      toast({
        title: 'Missing Information',
        description: 'Please select team, period, and format.',
        variant: 'destructive'
      })
      return
    }

    setIsExporting(true)
    
    try {
      // Mock export process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const team = mockTeams.find(t => t.id === selectedTeam)
      
      toast({
        title: 'Export Successful',
        description: `${team?.name} schedule exported as ${selectedFormat.toUpperCase()}`
      })
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'There was an error exporting the schedule.',
        variant: 'destructive'
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleEmailExport = async () => {
    if (!selectedTeam || !selectedPeriod) {
      toast({
        title: 'Missing Information',
        description: 'Please select team and period.',
        variant: 'destructive'
      })
      return
    }

    setIsExporting(true)
    
    try {
      // Mock email process
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const team = mockTeams.find(t => t.id === selectedTeam)
      
      toast({
        title: 'Email Sent',
        description: `Schedule emailed to ${team?.manager} at ${team?.email}`
      })
    } catch (error) {
      toast({
        title: 'Email Failed',
        description: 'There was an error sending the email.',
        variant: 'destructive'
      })
    } finally {
      setIsExporting(false)
    }
  }

  const selectedTeamData = mockTeams.find(t => t.id === selectedTeam)
  const filteredSchedule = selectedTeam 
    ? mockScheduleData.filter(item => item.team === selectedTeamData?.name)
    : []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Export Center</h2>
        <p className="text-slate-600">Export and email team schedules</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Export Configuration
            </CardTitle>
            <CardDescription>
              Select team, time period, and export format
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Team</label>
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a team" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{team.name}</span>
                        <span className="text-xs text-slate-500 ml-2">{team.manager}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Time Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-week">Current Week</SelectItem>
                  <SelectItem value="next-week">Next Week</SelectItem>
                  <SelectItem value="current-month">Current Month</SelectItem>
                  <SelectItem value="next-month">Next Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Export Format</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex space-x-2">
              <Button 
                onClick={handleExport}
                disabled={isExporting || !selectedTeam || !selectedPeriod || !selectedFormat}
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export'}
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleEmailExport}
                disabled={isExporting || !selectedTeam || !selectedPeriod}
                className="flex-1"
              >
                <Mail className="w-4 h-4 mr-2" />
                {isExporting ? 'Sending...' : 'Email'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule Preview
            </CardTitle>
            <CardDescription>
              {selectedTeamData ? `${selectedTeamData.name} - ${selectedPeriod || 'Select period'}` : 'Select team to preview'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedTeamData ? (
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{selectedTeamData.name}</h4>
                    <Badge variant="secondary">
                      {filteredSchedule.length} slots
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">
                    Manager: {selectedTeamData.manager}
                  </p>
                  <p className="text-sm text-slate-600">
                    Email: {selectedTeamData.email}
                  </p>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Upcoming Schedule:</h5>
                  {filteredSchedule.length > 0 ? (
                    filteredSchedule.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white border rounded-md">
                        <div>
                          <p className="text-sm font-medium">{item.date}</p>
                          <p className="text-xs text-slate-600">{item.time}</p>
                        </div>
                        <Badge variant={item.type === 'Game' ? 'default' : 'secondary'}>
                          {item.type}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500 text-center py-4">
                      No scheduled ice time
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Select a team to preview their schedule</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Exports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Exports</CardTitle>
          <CardDescription>Your recent export activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-sm font-medium">Mighty Ducks - January Schedule</p>
                  <p className="text-xs text-slate-600">Exported as PDF • 2 hours ago</p>
                </div>
              </div>
              <Badge variant="outline">PDF</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-sm font-medium">Ice Hawks - Weekly Schedule</p>
                  <p className="text-xs text-slate-600">Emailed to sarah@icehawks.com • 1 day ago</p>
                </div>
              </div>
              <Badge variant="outline">Email</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
              <div className="flex items-center space-x-3">
                <Download className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-sm font-medium">Storm Riders - Monthly Report</p>
                  <p className="text-xs text-slate-600">Exported as Excel • 3 days ago</p>
                </div>
              </div>
              <Badge variant="outline">Excel</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}