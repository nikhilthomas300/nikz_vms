"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { MapPin, ChevronDown, Building2, Check } from "lucide-react"
import { Location } from "@/types"

interface LocationSelectorProps {
  locations: Location[]
  selectedLocation: Location
  onLocationChange: (location: Location) => void
  className?: string
}

export function LocationSelector({ 
  locations, 
  selectedLocation, 
  onLocationChange,
  className = "" 
}: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`flex items-center gap-2 min-w-[250px] justify-between hover:bg-gray-50 transition-colors border-gray-200 shadow-sm ${className}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-sm text-gray-900">{selectedLocation.name}</div>
              <div className="text-xs text-gray-500 truncate max-w-[140px]">
                {selectedLocation.address.split(',')[0]}
              </div>
            </div>
          </div>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80 p-2 shadow-lg border-gray-200" align="start">
        <DropdownMenuLabel className="flex items-center gap-2 text-xs text-gray-600 uppercase tracking-wide font-semibold px-3 py-2">
          <Building2 className="h-4 w-4" />
          Select Location
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        
        {locations.map((location) => (
          <DropdownMenuItem 
            key={location.id}
            onClick={() => {
              onLocationChange(location)
              setIsOpen(false)
            }}
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-100 mx-1"
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                selectedLocation.id === location.id 
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-700' 
                  : 'bg-gradient-to-br from-gray-100 to-gray-200'
              }`}>
                <Building2 className={`h-5 w-5 ${
                  selectedLocation.id === location.id ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900 flex items-center gap-2">
                  {location.name}
                  {selectedLocation.id === location.id && (
                    <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  )}
                </div>
                <div className="text-xs text-gray-500 line-clamp-1 mt-1">
                  {location.address}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {location.country}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    {location.towers.length} tower{location.towers.length !== 1 ? 's' : ''}
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 border-green-200">
                    {location.towers.reduce((acc, tower) => acc + tower.rooms.length, 0)} rooms
                  </Badge>
                </div>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem className="text-xs text-gray-500 justify-center py-2 cursor-default hover:bg-transparent">
          {locations.length} location{locations.length !== 1 ? 's' : ''} available
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}