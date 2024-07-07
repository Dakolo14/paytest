import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"


const Profile = () => {
  return (
    <div className="w-full mt-2">
      <div className="flex items-center w-full gap-5 pe-5">
        <h3 className='h3-bold md:h2-bold text-left w-full py-4 px-6'>Your Profile</h3>
        <Dialog>
          <DialogTrigger asChild>
              <img src="/assets/icons/edit.svg" width={26} height={26} alt="Edit Profile Icon" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Your Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save changes when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-5 py-4">
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name here..."
                  className="col-span-3 shad-input"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue='Dakolo14'/* Just put the user logged in input here*/
                  className="col-span-3 shad-input"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="email" className="text-right">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email Address"
                  className="col-span-3 shad-input"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" variant='white'>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
              <img src="/assets/icons/share.svg" width={40} height={40} alt="Edit Profile Icon" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share Link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view your profile.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue="@Dakolo14"
                  className="shad-input"
                  readOnly
                />
              </div>
              <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="white">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className='p-3 px-6'>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name" className="text-sm">Name</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="name"
              defaultValue="Ajose Damilare"
              className="shad-input"
              readOnly
            />
            <Button type="submit" size="sm" className="px-1">
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
          <Label htmlFor="username" className="text-sm">Username</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="username"
              defaultValue="@Dakolo14"
              className="shad-input"
              readOnly
            />
            <Button type="submit" size="sm" className="px-1">
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
          <Label htmlFor="email" className="text-sm">Email</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="email"
              defaultValue="ajosedare4u@gmail.com"
              className="shad-input"
              readOnly
            />
            <Button type="submit" size="sm" className="px-1">
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
          <Label htmlFor="address" className="text-sm">Address</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="address"
              defaultValue="7, Apapa Street, Apapa"
              className="shad-input"
              readOnly
              disabled
            />
            <Button type="submit" size="sm" className="px-1">
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link to='/' className='flex-center gap-3'>
            <Button className="w-[200px] md:w-1/3">Logout</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Profile
