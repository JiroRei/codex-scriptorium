
import { MedievalSharp } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { SignedIn, useClerk, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { startTransition, useEffect, useRef, useState } from "react";
import * as ico from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ArtZodGoodies, createArtSchema } from "@/lib/artwork.schema";
import { zodResolver } from "@hookform/resolvers/zod"
import { createArtwork } from "../actions/create-artwork";
import { toast } from "sonner";

const myFont = MedievalSharp({
  weight: "400",
  subsets: ["latin"],
  });
  
export default function ProfileMenu(){
  const { openUserProfile, signOut } = useClerk();
  const { isSignedIn, user, isLoaded } = useUser()
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<ArtZodGoodies>({
    resolver: zodResolver(createArtSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: undefined,
      tags: [],
      creatorId: user?.id
    }
  })

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
  if (!showNewDialog) {
    setFile(null);
    setFileName(null);
  }
  }, [showNewDialog]);

  const onSubmit = async (values: ArtZodGoodies) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description || "");
        
        if (values.imageUrl && values.imageUrl[0]) {
          formData.append("imageUrl", values.imageUrl[0]);
        }
        
        if (values.tags && values.tags.length > 0) {
          formData.append("tags", values.tags.join(","));
        }

        const result = await createArtwork(formData);

        if (result.error) {
          toast("Error", {
            description: result.error,
          });
          return;
        }

        toast("Success", {
          description: result.message || "Artwork uploaded successfully!",
        });
        
        setShowNewDialog(false);
        form.reset();
      } catch (error) {
        toast("Error", {
          description: "Something went wrong. Please try again.",
        });
      }
    });
  }
  
  function handleFileChange(e: any){
    const file = e.target.files?.[0];
    if(file){
      setFile(file)
      setFileName(file.fileName)
    }else{
      setFile(null)
    }
  }

  return(
    <main>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <div className="mr-1 border-red-950 border-1 shadow-red-950 bg-primary flex items-center px-4 py-1 mt-3 gap-3 shadow text-secondary-foreground border-1 hover:cursor-pointer">
          
          <div className="flex items-center gap-3">
            <Image src={`${user?.imageUrl}`} width={35} height={35} alt="profile" className="border-2 border-ring"/>
            <span className={`${myFont.className} text-2xl text-primary-foreground`}>{user?.username}</span>
          </div>
        
          <ico.ChevronDown className="w-6 transition-transform data-[state=open]:rotate-180"/>
          </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60 " align="end">
          <DropdownMenuLabel className="flex justify-between gap-2">
            <div className="hover:cursor-default">
            {user?.username}
            </div>
            <Label onClick={() => openUserProfile()} className="text-xs text-gray-600 hover:cursor-pointer"> Manage Account</Label>  
          </DropdownMenuLabel>
          <Separator className=""/>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className=" hover:cursor-pointer">
                  <Link href={`/profile/${user?.username}`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShowNewDialog(true)} className=" hover:cursor-pointer">
                  Upload Art
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShowShareDialog(true)} className=" hover:cursor-pointer">
                  Create Series
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => signOut()} className="group text-accent2 hover:cursor-pointer">
                 <p className="group-data-[highlighted]:text-red-500">Log Out</p> <ico.LogOut className="group-data-[highlighted]:text-red-500" /> 
              </DropdownMenuItem>
          </DropdownMenuGroup>
          
          </DropdownMenuContent>
          
        </DropdownMenu>
        
        <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Art</DialogTitle>
              <DialogDescription>
                Upload your creation here.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="pb-3">
                <FormField control={form.control} name="title" render={({field}) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Title of your work"
                      {...field} className="-shadow focus-visible:ring-[1px] bg-white flex mt-2"/>
                    </FormControl>
                  </FormItem>
                )} />

                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desc</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your work here."
                        maxLength={150}
                        {...field}
                        className="-shadow focus-visible:ring-[1px] bg-white flex mt-2"
                      />
                    </FormControl>
                  </FormItem>
                )} />

                <FormField control={form.control} name="imageUrl" render={({field: {onChange, value, ...field}}) => (
                  <FormItem>
                    <FormLabel>Upload</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        className="flex mt-2"
                        onChange={(e) => {
                          handleFileChange(e);
                          onChange(e.target.files);
                        }}
                        {...field}
                      />
                      {/* <Button className="flex justify-center border-1" onClick={() => fileInputRef.current?.click()}> <ico.Upload />Upload Image File</Button> */}
                    </FormControl>
                  </FormItem>
                )} />

              
              <div className="flex justify-center">
                {previewUrl && (
                <div className="relative w-full max-w-xs aspect-square rounded overflow-hidden">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="shadow">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="shadow bg-secondary text-secondary-foreground hover:text-primary-foreground">
                Upload
              </Button>
            </DialogFooter>
            </form>
            </Form>
          </DialogContent>
        </Dialog>
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Share File</DialogTitle>
                <DialogDescription>
                Anyone with the link will be able to view this file.
                </DialogDescription>
            </DialogHeader>
            <FieldGroup className="py-3">
                <Field>
                <Label htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="shadcn@vercel.com"
                    autoComplete="off"
                />
                </Field>
                <Field>
                <FieldLabel htmlFor="message">Message (Optional)</FieldLabel>
                <Textarea
                    id="message"
                    name="message"
                    placeholder="Check out this file"
                />
                </Field>
            </FieldGroup>
            <DialogFooter>
                <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Send Invite</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    
    </main>
  );
}