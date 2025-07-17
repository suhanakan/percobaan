"use client"

import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat", // Menggunakan rute API yang sudah kita buat
  })

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-blue-800 text-white p-4">
        <CardTitle className="text-xl font-bold">Dobbie AI Chat</CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-96">
        <ScrollArea className="h-full pr-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-500">
              Ketik pesan untuk memulai chat dengan Dobbie AI!
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} className={`flex items-start mb-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <Avatar className="mr-3">
                  <AvatarImage src="/images/dobbie-logo.jpeg" alt="Dobbie AI" />
                  <AvatarFallback>DA</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  m.role === "user"
                    ? "bg-yellow-500 text-black rounded-br-none"
                    : "bg-blue-100 text-blue-900 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{m.content}</p>
              </div>
              {m.role === "user" && (
                <Avatar className="ml-3">
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start items-start mb-4">
              <Avatar className="mr-3">
                <AvatarImage src="/images/dobbie-logo.jpeg" alt="Dobbie AI" />
                <AvatarFallback>DA</AvatarFallback>
              </Avatar>
              <div className="p-3 rounded-lg bg-blue-100 text-blue-900 rounded-bl-none animate-pulse">
                <p className="text-sm">Dobbie is thinking...</p>
              </div>
            </div>
          )}
          {error && <div className="text-red-500 text-sm mt-2">Error: {error.message}</div>}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t bg-gray-50">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            className="flex-1"
            value={input}
            placeholder="Tanyakan sesuatu pada Dobbie..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            Kirim
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
