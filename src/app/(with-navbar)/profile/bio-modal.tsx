"use client"

import { useState } from "react"
import { updateBio } from "@/app/actions/update-bio"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import * as ico from "lucide-react"

type Props = {
  dbUser: {
    bio: string | null
  }
}

export default function ProfileBio({ dbUser }: Props) {
  const [bio, setBio] = useState(dbUser.bio ?? "")
  const [open, setOpen] = useState(false)

  async function onSubmit(formData: FormData) {
    const newBio = formData.get("bio") as string
    await updateBio(newBio)
    setOpen(false)
  }

  return (
    <div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button>
            <ico.Feather className="size-5 text-accent border-b-2 border-accent hover:opacity-70 bg-transparent"/>
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit bio</DialogTitle>
          </DialogHeader>

          <form action={onSubmit} className="space-y-4">
            <Textarea
              name="bio"
              defaultValue={bio}
              maxLength={300}
            />
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
