"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, Smile, Paperclip, Send } from "lucide-react"

export default function SupportChat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "support" }[]>([])

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "user" }])
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div  dir="rtl">
      <Card className="w-full max-w-3xl h-[600px] flex flex-col">
        <CardHeader className="border-b p-4">
          <div className="flex justify-center">
            <h2 className="text-xl font-bold text-purple-700">الدعم الفني</h2>
          </div>
        </CardHeader>

        <div className="flex items-center p-4 border-b">
          <div className="flex items-center gap-3 mr-auto">
            <span className="font-medium">nooduhk saf</span>
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>NS</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <CardContent className="flex-1 overflow-auto p-4">
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>لا يوجد محادثات</p>
            </div>
          )}
        </CardContent>

        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-blue-500">
              <Mic className="h-5 w-5" />
            </Button>

            <div className="relative flex-1">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="كتابة رسالة"
                className="pr-4 pl-20"
              />
              <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                  <Paperclip className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Button onClick={handleSendMessage} size="icon" className="bg-gray-200 hover:bg-gray-300 text-gray-600">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
