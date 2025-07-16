import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Badge } from './ui/badge'
import { Plus, Edit, Mail, User } from 'lucide-react'
import { useToast } from '../hooks/use-toast'

interface Team {
  id: string
  name: string
  managerName: string
  managerEmail: string
  createdAt: string
}

interface TeamsManagerProps {
  userId: string
}

export function TeamsManager({ userId }: TeamsManagerProps) {
  const [teams, setTeams] = useState<Team[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    managerName: '',
    managerEmail: ''
  })
  const { toast } = useToast()

  // Mock data for now - will be replaced with actual database calls
  useEffect(() => {
    const mockTeams: Team[] = [
      {
        id: '1',
        name: 'Mighty Ducks',
        managerName: 'Gordon Bombay',
        managerEmail: 'gordon@mightyducks.com',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Ice Hawks',
        managerName: 'Sarah Johnson',
        managerEmail: 'sarah@icehawks.com',
        createdAt: '2024-01-20'
      },
      {
        id: '3',
        name: 'Storm Riders',
        managerName: 'Mike Wilson',
        managerEmail: 'mike@stormriders.com',
        createdAt: '2024-01-25'
      }
    ]
    setTeams(mockTeams)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock team creation - will be replaced with actual database call
      const newTeam: Team = {
        id: Date.now().toString(),
        name: formData.name,
        managerName: formData.managerName,
        managerEmail: formData.managerEmail,
        createdAt: new Date().toISOString().split('T')[0]
      }

      setTeams(prev => [...prev, newTeam])
      setFormData({ name: '', managerName: '', managerEmail: '' })
      setIsAddDialogOpen(false)
      
      toast({
        title: 'Team added successfully',
        description: `${formData.name} has been added to your association.`
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add team. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Team Management</h2>
          <p className="text-slate-600">Manage your hockey teams and their managers</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team</DialogTitle>
              <DialogDescription>
                Enter the team details and manager information.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Mighty Ducks"
                  required
                />
              </div>
              <div>
                <Label htmlFor="managerName">Manager Name</Label>
                <Input
                  id="managerName"
                  value={formData.managerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, managerName: e.target.value }))}
                  placeholder="e.g., Gordon Bombay"
                  required
                />
              </div>
              <div>
                <Label htmlFor="managerEmail">Manager Email</Label>
                <Input
                  id="managerEmail"
                  type="email"
                  value={formData.managerEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, managerEmail: e.target.value }))}
                  placeholder="e.g., gordon@example.com"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Adding...' : 'Add Team'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{team.name}</CardTitle>
                  <CardDescription>
                    Added {new Date(team.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium">{team.managerName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600">{team.managerEmail}</span>
              </div>
              <div className="pt-2">
                <Badge variant="secondary" className="text-xs">
                  Active Team
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {teams.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No teams yet</h3>
            <p className="text-slate-600 mb-4">
              Get started by adding your first hockey team.
            </p>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Team
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}