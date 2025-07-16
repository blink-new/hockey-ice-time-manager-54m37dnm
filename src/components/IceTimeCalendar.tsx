import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addDays, startOfWeek, isSameDay } from 'date-fns'

interface IceSlot {
  id: string
  date: string
  startTime: string
  endTime: string
  type: 'practice' | 'game'
  isAssigned: boolean
  teamName?: string
  teamId?: string
}

interface IceTimeCalendarProps {
  userId: string
}

export function IceTimeCalendar({ userId }: IceTimeCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [iceSlots, setIceSlots] = useState<IceSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<IceSlot | null>(null)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState('')

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }) // Monday start
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  // Mock data for ice slots
  useEffect(() => {
    const mockSlots: IceSlot[] = [
      {
        id: '1',
        date: format(weekDays[0], 'yyyy-MM-dd'),
        startTime: '18:00',
        endTime: '19:30',
        type: 'practice',
        isAssigned: true,
        teamName: 'Mighty Ducks',
        teamId: '1'
      },
      {
        id: '2',
        date: format(weekDays[0], 'yyyy-MM-dd'),
        startTime: '20:00',
        endTime: '21:30',
        type: 'game',
        isAssigned: false
      },
      {
        id: '3',
        date: format(weekDays[1], 'yyyy-MM-dd'),
        startTime: '19:00',
        endTime: '20:30',
        type: 'practice',
        isAssigned: true,
        teamName: 'Ice Hawks',
        teamId: '2'
      },
      {
        id: '4',
        date: format(weekDays[2], 'yyyy-MM-dd'),
        startTime: '18:30',
        endTime: '20:00',
        type: 'game',
        isAssigned: false
      },
      {
        id: '5',
        date: format(weekDays[3], 'yyyy-MM-dd'),
        startTime: '17:00',
        endTime: '18:30',
        type: 'practice',
        isAssigned: false
      },
      {
        id: '6',
        date: format(weekDays[4], 'yyyy-MM-dd'),
        startTime: '19:30',
        endTime: '21:00',
        type: 'game',
        isAssigned: true,
        teamName: 'Storm Riders',
        teamId: '3'
      }
    ]
    setIceSlots(mockSlots)
  }, [currentWeek, weekDays])

  const mockTeams = [
    { id: '1', name: 'Mighty Ducks' },
    { id: '2', name: 'Ice Hawks' },
    { id: '3', name: 'Storm Riders' }
  ]

  const handleSlotClick = (slot: IceSlot) => {
    if (!slot.isAssigned) {
      setSelectedSlot(slot)
      setIsAssignDialogOpen(true)
    }
  }

  const handleAssignSlot = () => {
    if (selectedSlot && selectedTeam) {
      const team = mockTeams.find(t => t.id === selectedTeam)
      setIceSlots(prev => prev.map(slot => 
        slot.id === selectedSlot.id 
          ? { ...slot, isAssigned: true, teamName: team?.name, teamId: selectedTeam }
          : slot
      ))
      setIsAssignDialogOpen(false)
      setSelectedSlot(null)
      setSelectedTeam('')
    }
  }

  const getSlotsForDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return iceSlots.filter(slot => slot.date === dateStr)
  }

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prev => addDays(prev, direction === 'next' ? 7 : -7))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Ice Time Calendar</h2>
          <p className="text-slate-600">View and assign available ice time slots</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium px-4">
            Week of {format(weekStart, 'MMM d, yyyy')}
          </span>
          <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const daySlots = getSlotsForDay(day)
          const isToday = isSameDay(day, new Date())
          
          return (
            <Card key={index} className={`${isToday ? 'ring-2 ring-blue-500' : ''}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  {format(day, 'EEE')}
                </CardTitle>
                <CardDescription className="text-xs">
                  {format(day, 'MMM d')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {daySlots.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">
                    No ice time
                  </p>
                ) : (
                  daySlots.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => handleSlotClick(slot)}
                      className={`p-2 rounded-md border text-xs cursor-pointer transition-colors ${
                        slot.isAssigned
                          ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">
                          {slot.startTime} - {slot.endTime}
                        </span>
                        <Badge 
                          variant={slot.type === 'game' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {slot.type}
                        </Badge>
                      </div>
                      {slot.isAssigned ? (
                        <p className="text-slate-600 truncate">{slot.teamName}</p>
                      ) : (
                        <p className="text-slate-600 font-medium">Available</p>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">This Week Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Slots:</span>
                <span className="font-medium">{iceSlots.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Assigned:</span>
                <span className="font-medium text-blue-600">
                  {iceSlots.filter(s => s.isAssigned).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Available:</span>
                <span className="font-medium text-slate-600">
                  {iceSlots.filter(s => !s.isAssigned).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Legend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
              <span className="text-sm">Assigned</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-100 border border-slate-200 rounded"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="default" className="text-xs">Game</Badge>
              <Badge variant="secondary" className="text-xs">Practice</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Ice Slot
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Ice Time</DialogTitle>
            <DialogDescription>
              Assign this ice slot to a team
            </DialogDescription>
          </DialogHeader>
          {selectedSlot && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-md">
                <p className="font-medium">
                  {format(new Date(selectedSlot.date), 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="text-sm text-slate-600">
                  {selectedSlot.startTime} - {selectedSlot.endTime}
                </p>
                <Badge variant={selectedSlot.type === 'game' ? 'default' : 'secondary'}>
                  {selectedSlot.type}
                </Badge>
              </div>
              
              <div>
                <label className="text-sm font-medium">Select Team</label>
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a team" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTeams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAssignSlot} disabled={!selectedTeam}>
                  Assign Slot
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}