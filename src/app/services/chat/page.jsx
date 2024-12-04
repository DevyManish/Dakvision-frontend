"use client"
import { useState } from "react"
import { Send, Paperclip, Image, Mic, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"

export default function Page() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", sender: "system" }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user"
    }

    setMessages(prevMessages => [...prevMessages, newUserMessage])
    setInputMessage("")

    // Simulate system response
    setTimeout(() => {
      const systemResponse = getSystemResponse(inputMessage)
      const newSystemMessage = {
        id: messages.length + 2,
        text: systemResponse,
        sender: "system"
      }
      setMessages(prevMessages => [...prevMessages, newSystemMessage])
    }, 1000)
  }

  const getSystemResponse = userMessage => {
    const lowerCaseMessage = userMessage.toLowerCase()
    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      return "Hello! How can I help you today?"
    } else if (
      lowerCaseMessage.includes("bye") ||
      lowerCaseMessage.includes("goodbye")
    ) {
      return "Goodbye! If you have any more questions, feel free to ask."
    } else if (lowerCaseMessage.includes("help")) {
      return "I'm here to help! What specific information do you need?"
    } else if (lowerCaseMessage.includes("contact")) {
      return "You can contact our support team at support@example.com or call us at 1-800-123-4567."
    } else if (
      lowerCaseMessage.includes("hours") ||
      lowerCaseMessage.includes("open")
    ) {
      return "Our business hours are Monday to Friday, 9 AM to 5 PM EST."
    } else {
      return "I'm sorry, I don't have specific information about that. Could you please rephrase your question or ask something else?"
    }
  }

  const handleAttachment = type => {
    // Simulate file selection and upload
    const attachmentUrl = `/placeholder.svg?height=200&width=200`
    const newUserMessage = {
      id: messages.length + 1,
      text: `Attached ${type}`,
      sender: "user",
      attachment: { type, url: attachmentUrl }
    }
    setMessages(prevMessages => [...prevMessages, newUserMessage])
    setIsDialogOpen(false)

    // Simulate system response
    setTimeout(() => {
      const newSystemMessage = {
        id: messages.length + 2,
        text: `I've received your ${type} attachment. How can I help you with this?`,
        sender: "system"
      }
      setMessages(prevMessages => [...prevMessages, newSystemMessage])
    }, 1000)
  }

  return (
    <>
    <Header/>
    <div className="w-full h-screen px-14">
        <div className="flex flex-col mt-20 h-[600px] border rounded-lg overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
            <Badge variant="secondary" className="text-sm font-semibold">
            Chat Enquiry System
            </Badge>
        </div>
        <ScrollArea className="flex-grow p-4">
            {messages.map(message => (
            <div
                key={message.id}
                className={`mb-4 ${
                message.sender === "user" ? "text-right" : "text-left"
                }`}
            >
                <div
                className={`inline-block p-2 rounded-lg ${
                    message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
                >
                {message.text}
                {message.attachment && (
                    <div className="mt-2">
                    {message.attachment.type === "image" && (
                        /* eslint-disable @next/next/no-img-element */
                        <img
                        src="https://dummyimage.com/420x260"
                        alt="Attached image"
                        className="max-w-full h-auto rounded"
                        />
                    )}
                    {message.attachment.type === "audio" && (
                        <audio
                        controls
                        src={message.attachment.url}
                        className="max-w-full"
                        />
                    )}
                    {message.attachment.type === "document" && (
                        <a
                        href={message.attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                        >
                        View Document
                        </a>
                    )}
                    </div>
                )}
                </div>
            </div>
            ))}
        </ScrollArea>
        <div className="p-4 border-t">
            <form
            onSubmit={e => {
                e.preventDefault()
                handleSendMessage()
            }}
            className="flex space-x-2"
            >
            <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                className="flex-grow"
            />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                <Button type="button" size="icon" variant="outline">
                    <Paperclip className="h-4 w-4" />
                    <span className="sr-only">Attach file</span>
                </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Attach a file</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4">
                    <Button
                    onClick={() => handleAttachment("image")}
                    className="flex flex-col items-center p-4"
                    >
                    <Image className="h-8 w-8 mb-2" alt="image"/>
                    Image
                    </Button>
                    <Button
                    onClick={() => handleAttachment("audio")}
                    className="flex flex-col items-center p-4"
                    >
                    <Mic className="h-8 w-8 mb-2" />
                    Audio
                    </Button>
                    <Button
                    onClick={() => handleAttachment("document")}
                    className="flex flex-col items-center p-4"
                    >
                    <File className="h-8 w-8 mb-2" />
                    Document
                    </Button>
                </div>
                </DialogContent>
            </Dialog>
            <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
            </Button>
            </form>
        </div>
        </div>
    </div>
    </>
  )
}
