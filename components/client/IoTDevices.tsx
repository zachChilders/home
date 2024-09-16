'use client'

import { useState } from 'react'
import { Power, Lightbulb, Lock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

export default function IoTDevices() {
  const [lightOn, setLightOn] = useState(false)
  const [doorLocked, setDoorLocked] = useState(true)

  const handleLightToggle = async (checked: boolean) => {
    // In a real application, you would call an API to control the light
    setLightOn(checked)
    console.log(`Light turned ${checked ? 'on' : 'off'}`)
  }

  const handleDoorLock = async () => {
    // In a real application, you would call an API to control the door lock
    setDoorLocked(!doorLocked)
    console.log(`Door ${doorLocked ? 'unlocked' : 'locked'}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Power className="mr-2" />
          IoT Devices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Lightbulb className="mr-2" />
              <span>Living Room Light</span>
            </div>
            <Switch
              checked={lightOn}
              onCheckedChange={handleLightToggle}
              aria-label="Toggle living room light"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Lock className="mr-2" />
              <span>Front Door</span>
            </div>
            <Button
              variant={doorLocked ? "default" : "outline"}
              onClick={handleDoorLock}
            >
              {doorLocked ? "Locked" : "Unlocked"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}