"use client"

import { useState } from "react"
import { Settings, LogOut, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"

interface UserProfile {
  id: string
  name: string
  email: string
  role: 'host' | 'security' | 'admin' | 'visitor'
  department?: string
  title?: string
  avatarUrl?: string
  lastLogin: Date
  status: 'online' | 'away' | 'offline'
}

const mockUser: UserProfile = {
  id: "u1",
  name: "Alice Johnson",
  email: "alice@company.com", 
  role: "host",
  department: "Sales",
  title: "Sales Manager",
  avatarUrl: "/api/placeholder/40/40",
  lastLogin: new Date("2024-08-27T10:30:00"),
  status: "online"
}

const getRoleBadge = (role: UserProfile['role']) => {
  const roleConfig = {
    host: { label: "Host", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
    security: { label: "Security", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
    admin: { label: "Admin", className: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
    visitor: { label: "Visitor", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" }
  }
  
  const config = roleConfig[role]
  return <Badge className={config.className}>{config.label}</Badge>
}

const getStatusColor = (status: UserProfile['status']) => {
  switch (status) {
    case 'online':
      return 'bg-green-500'
    case 'away':
      return 'bg-yellow-500'
    case 'offline':
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
  }
}

export function UserProfileMenu() {
  const [user, setUser] = useState<UserProfile>(mockUser)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    // Simulate logout
    console.log("Logging out...")
    // In real app, clear auth tokens and redirect
    window.location.href = "/"
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <>
      {/* User Profile Trigger */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 px-2 py-1.5 h-auto rounded-full hover:bg-accent/60">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="text-xs font-medium">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(user.status)}`} />
            </div>
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>Your account information and preferences</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background ${getStatusColor(user.status)}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  {getRoleBadge(user.role)}
                  <span className="text-sm text-muted-foreground capitalize">{user.status}</span>
                </div>
              </div>
            </div>
            
            {/* Profile Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Department</Label>
                  <p className="text-sm font-medium">{user.department || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Last Login</Label>
                  <p className="text-sm font-medium">
                    {user.lastLogin.toLocaleDateString()} {user.lastLogin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => {
                  setIsProfileOpen(false)
                  setIsSettingsOpen(true)
                }}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings & Preferences
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setTheme(theme === 'light' ? 'dark' : 'light')
                }}
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
                    Switch to Dark Mode
                  </>
                ) : (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    Switch to Light Mode
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Settings & Preferences</DialogTitle>
            <DialogDescription>Update your profile and preferences</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="space-y-4">
              <h4 className="font-medium">Profile Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={user.name.split(' ')[0]} 
                    onChange={(e) => {
                      const lastName = user.name.split(' ').slice(1).join(' ')
                      setUser(prev => ({ ...prev, name: `${e.target.value} ${lastName}` }))
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={user.name.split(' ').slice(1).join(' ')} 
                    onChange={(e) => {
                      const firstName = user.name.split(' ')[0]
                      setUser(prev => ({ ...prev, name: `${firstName} ${e.target.value}` }))
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input 
                  id="title" 
                  value={user.title || ''} 
                  onChange={(e) => setUser(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
            </div>
            
            {/* Notification Settings */}
            <div className="space-y-4">
              <h4 className="font-medium">Notification Preferences</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive email alerts for important events</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">Real-time browser notifications</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">SMS Alerts</p>
                    <p className="text-xs text-muted-foreground">Critical alerts via text message</p>
                  </div>
                  <Badge variant="outline" className="text-gray-600 border-gray-200">Disabled</Badge>
                </div>
              </div>
            </div>
            
            {/* Privacy Settings */}
            <div className="space-y-4">
              <h4 className="font-medium">Privacy & Security</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Additional security for your account</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Session Timeout</p>
                    <p className="text-xs text-muted-foreground">Auto logout after inactivity</p>
                  </div>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">8 hours</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsSettingsOpen(false)}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
