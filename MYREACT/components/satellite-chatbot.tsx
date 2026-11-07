"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ImageIcon, SendIcon, Satellite, Loader2, X } from "lucide-react"

export default function SatelliteChatbot() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() && !uploadedImage) return

    const messageContent: any = {
      text: inputValue,
    }

    if (uploadedImage && imageFile) {
      messageContent.image = uploadedImage
    }

    sendMessage(messageContent)
    setInputValue("")
    setUploadedImage(null)
    setImageFile(null)
  }

  const removeImage = () => {
    setUploadedImage(null)
    setImageFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Satellite className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Satellite Image Analyzer</h1>
            <p className="text-sm text-muted-foreground">Upload satellite imagery and ask questions</p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <ScrollArea className="flex-1 px-6 py-6" ref={scrollRef}>
        <div className="mx-auto max-w-4xl space-y-6">
          {messages.length === 0 && (
            <Card className="border-2 border-dashed border-border bg-muted/30 p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ImageIcon className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">Get Started</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Upload a satellite image and ask questions about terrain, features, land use, or any visible patterns
              </p>
            </Card>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <Card
                className={`max-w-[80%] p-4 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card"
                }`}
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <p key={index} className="whitespace-pre-wrap text-sm leading-relaxed">
                        {part.text}
                      </p>
                    )
                  }
                  if (part.type === "image") {
                    return (
                      <img
                        key={index}
                        src={part.image || "/placeholder.svg"}
                        alt="Uploaded satellite"
                        className="mb-2 max-h-64 rounded-md object-cover"
                      />
                    )
                  }
                  return null
                })}
              </Card>
            </div>
          ))}

          {status === "in_progress" && (
            <div className="flex justify-start">
              <Card className="bg-card p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing image...
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-card px-6 py-4">
        <div className="mx-auto max-w-4xl">
          {uploadedImage && (
            <div className="mb-3 flex items-start gap-3 rounded-lg border border-border bg-muted/50 p-3">
              <img
                src={uploadedImage || "/placeholder.svg"}
                alt="Preview"
                className="h-20 w-20 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{imageFile?.name}</p>
                <p className="text-xs text-muted-foreground">Ready to analyze</p>
              </div>
              <Button variant="ghost" size="icon" onClick={removeImage} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0"
            >
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about the satellite image..."
              className="flex-1"
              disabled={status === "in_progress"}
            />
            <Button
              type="submit"
              size="icon"
              disabled={status === "in_progress" || (!inputValue.trim() && !uploadedImage)}
              className="shrink-0"
            >
              {status === "in_progress" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <SendIcon className="h-5 w-5" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
