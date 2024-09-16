
<Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
<DialogTrigger asChild>
  <span className="flex flex-col items-center">
    <img src="/assets/icons/edit.svg" width={26} height={26} alt="Edit Profile Icon" />
    <p className="text-sm">Edit</p>
  </span>
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
      <Label htmlFor="username" className="text-right">
        Username
      </Label>
      <Input
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="col-span-3 shad-input"
        readOnly
      />
    </div>
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor="email" className="text-right">
        Email Address
      </Label>
      <Input
        id="email"
        type="email"
        defaultValue={user.email}
        placeholder="Enter Email Address"
        className="col-span-3 shad-input"
        readOnly
      />
    </div>
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor="address" className="text-right">
        Address
      </Label>
      <Input
        id="address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Input Your Address"
        className="col-span-3 shad-input"
      />
    </div>
  </div>
  <DialogFooter>
    <Button type="button" variant='white' onClick={handleSaveChanges}>Save changes</Button>
  </DialogFooter>
</DialogContent>
</Dialog>
<Dialog>
<DialogTrigger asChild>
  <span className="flex flex-col items-center">
    <img src="/assets/icons/share.svg" width={26} height={26} alt="Share Profile Icon" />
    <p className="text-sm">Share</p>
  </span>
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
        defaultValue={`https://yourapp.com/profile/${user.username}`} // Adjust link as needed
        className="shad-input"
        readOnly
      />
    </div>
    <Button type="button" size="icon" className="px-3">
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










<div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
          <Label htmlFor="username" className="text-sm">Username</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="username"
              defaultValue={user.username}
              className="shad-input"
              readOnly
            />
            <Button type="submit" size="icon" className="px-1">
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
              defaultValue={user.email}
              className="shad-input"
              readOnly
            />
            <Button type="submit" size="icon" className="px-1">
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
              defaultValue={user.address}
              className="shad-input"
              readOnly
              disabled
            />
            <Button type="submit" size="icon" className="px-1">
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>