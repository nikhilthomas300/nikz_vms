"use client"

import { useState } from "react"
import { Save, Settings, Bell, Shield, Building, Users, Mail, Globe } from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlobalLoader } from "@/components/ui/global-loader"
import { Badge } from "@/components/ui/badge"

interface SystemSettings {
  companyName: string
  companyAddress: string
  contactEmail: string
  phoneNumber: string
  timezone: string
  language: string
  maxVisitorDuration: number
  autoCheckoutEnabled: boolean
  requirePhotoId: boolean
  enableNotifications: boolean
  securityLevel: 'low' | 'medium' | 'high'
}

const mockSettings: SystemSettings = {
  companyName: "TechCorp Solutions",
  companyAddress: "123 Business Ave, Tech City, TC 12345",
  contactEmail: "admin@techcorp.com",
  phoneNumber: "(555) 123-4567",
  timezone: "UTC-8",
  language: "English",
  maxVisitorDuration: 8,
  autoCheckoutEnabled: true,
  requirePhotoId: true,
  enableNotifications: true,
  securityLevel: 'medium'
}

export default function AdminSettingsPage() {
  const [isLoading] = useState(false)
  const [settings, setSettings] = useState<SystemSettings>(mockSettings)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSaving(false)
  }

  const updateSetting = (key: keyof SystemSettings, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (isLoading) {
    return <GlobalLoader isLoading={true} text="Loading settings..." />
  }

  return (
    <MainLayout role="admin" title="System Settings" subtitle="Configure system-wide settings and preferences">
      <div className="p-6 space-y-6">
        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Company Information
                  </CardTitle>
                  <CardDescription>
                    Basic company details displayed throughout the system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e) => updateSetting('companyName', e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyAddress">Address</Label>
                    <Input
                      id="companyAddress"
                      value={settings.companyAddress}
                      onChange={(e) => updateSetting('companyAddress', e.target.value)}
                      placeholder="Enter company address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => updateSetting('contactEmail', e.target.value)}
                      placeholder="Enter contact email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={settings.phoneNumber}
                      onChange={(e) => updateSetting('phoneNumber', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Localization
                  </CardTitle>
                  <CardDescription>
                    Regional settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      value={settings.timezone}
                      onChange={(e) => updateSetting('timezone', e.target.value)}
                      placeholder="Enter timezone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Input
                      id="language"
                      value={settings.language}
                      onChange={(e) => updateSetting('language', e.target.value)}
                      placeholder="Enter language"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Access Control
                  </CardTitle>
                  <CardDescription>
                    Security and access control settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Photo ID</Label>
                      <p className="text-sm text-muted-foreground">
                        Visitors must provide photo identification
                      </p>
                    </div>
                    <Badge variant={settings.requirePhotoId ? "default" : "secondary"}>
                      {settings.requirePhotoId ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Security Level</Label>
                      <p className="text-sm text-muted-foreground">
                        Overall security enforcement level
                      </p>
                    </div>
                    <Badge variant="default">
                      {settings.securityLevel.charAt(0).toUpperCase() + settings.securityLevel.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <Label htmlFor="maxDuration">Max Visit Duration (hours)</Label>
                    <Input
                      id="maxDuration"
                      type="number"
                      value={settings.maxVisitorDuration}
                      onChange={(e) => updateSetting('maxVisitorDuration', parseInt(e.target.value))}
                      min="1"
                      max="24"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Automation
                  </CardTitle>
                  <CardDescription>
                    Automated system behaviors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Checkout</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically check out visitors after max duration
                      </p>
                    </div>
                    <Badge variant={settings.autoCheckoutEnabled ? "default" : "secondary"}>
                      {settings.autoCheckoutEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure system-wide notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Master switch for all system notifications
                    </p>
                  </div>
                  <Badge variant={settings.enableNotifications ? "default" : "secondary"}>
                    {settings.enableNotifications ? "Enabled" : "Disabled"}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Email Notifications</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Visitor arrivals</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Security alerts</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">System updates</span>
                        <Badge variant="secondary">Disabled</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">SMS Notifications</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Emergency alerts</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Host notifications</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Daily summaries</span>
                        <Badge variant="secondary">Disabled</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    System Limits
                  </CardTitle>
                  <CardDescription>
                    Configure system capacity and limits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label>Max Daily Visitors</Label>
                      <p className="font-medium">500</p>
                    </div>
                    <div>
                      <Label>Max Concurrent Visitors</Label>
                      <p className="font-medium">150</p>
                    </div>
                    <div>
                      <Label>Storage Used</Label>
                      <p className="font-medium">2.3 GB / 10 GB</p>
                    </div>
                    <div>
                      <Label>API Rate Limit</Label>
                      <p className="font-medium">1000/hour</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Integration Settings
                  </CardTitle>
                  <CardDescription>
                    Third-party integrations and API settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Calendar Integration</span>
                      <Badge variant="default">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Badge Printer</span>
                      <Badge variant="default">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Access Control System</span>
                      <Badge variant="secondary">Disconnected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SMS Gateway</span>
                      <Badge variant="default">Connected</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
