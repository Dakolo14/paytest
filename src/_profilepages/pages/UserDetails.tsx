import { IoCalendarOutline } from "react-icons/io5";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/lib/context/UserContexts";
import axios from 'axios';
import { toast } from "@/components/ui/use-toast";

const UserDetails: React.FC = () => {
  const { user, setUser } = useUser();
  // const [isVerified] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const avatars = [
    { id: 1, src: './assets/avatar/avatar-1.png', gender: 'female' },
  { id: 2, src: './assets/avatar/avatar-2.png', gender: 'female' },
  { id: 3, src: './assets/avatar/avatar-3.png', gender: 'male' },
  { id: 4, src: './assets/avatar/avatar-4.png', gender: 'male' },
  { id: 5, src: './assets/avatar/avatar-5.png', gender: 'male' },
  { id: 6, src: './assets/avatar/avatar-6.png', gender: 'female' },
  { id: 7, src: './assets/avatar/avatar-7.png', gender: 'male' },
  { id: 8, src: './assets/avatar/avatar-9.png', gender: 'female' },
  ];

  if (!user) {
    return <p>Session Expired...</p>;
  }

  // State for form inputs
  const [username, setUsername] = useState<string>(user.username);
  const [address, setAddress] = useState<string>(user.address || '');
  const [phoneNumber, setPhoneNumber] = useState<string>(user.phone || '');
  const [dateOfBirth, setDateOfBirth] = useState<string>(user.date_of_birth || '');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(user.avatar || avatars[0].src);

  const handleSaveChanges = async () => {
    if (!user.id) {
      return; // Handle missing user ID case
    }

    setIsLoading(true);

    // Create FormData to handle text data
    const formData = new FormData();
    formData.append("user_id", user.id.toString());
    formData.append("username", username);
    formData.append("address", address);
    formData.append("phone", phoneNumber);
    formData.append("date_of_birth", dateOfBirth);
    formData.append("avatar", selectedAvatar); // Save selected avatar

    try {
      const response = await axios.post("https://blockchainbinaryopt.shop/payfly/backend/api/update_profile.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        // Update user context with new data
        setUser({ ...user, username, address, phone: phoneNumber, date_of_birth: dateOfBirth, avatar: selectedAvatar });
        setIsEditModalOpen(false); // Close the modal
        toast({
          variant: 'success',
          title: 'Your profile has successfully been updated!',
        })
      } else {
        // console.error(response.data.error); // Handle error response
        toast({
          variant: 'destructive',
          title: 'Error encounted, Try Again!',
        })
      }
    } catch (error) {
      console.error("Error updating profile:", error); // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* User Details Listing */}
      <div className="w-full">
        <div className="w-[100%] rounded-lg p-4 flex items-center justify-between" style={{ backgroundColor: "#1e1e1e" }}>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-left text-gray-400">
              Profile Name
            </p>
            <h2 className="text-lg font-medium text-gray-100">{user?.first_name} {user?.last_name}</h2>
          </div>
        </div>

        <div className="w-[100%] rounded-lg p-4 mt-3 flex items-center justify-between" style={{ backgroundColor: "#1e1e1e" }}>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-left text-gray-400">
              UserName
            </p>
            <h2 className="text-lg font-medium text-gray-100">@{user?.username}</h2>
          </div>
        </div>

        <div className="w-[100%] rounded-lg p-4 mt-3 flex items-center justify-between" style={{ backgroundColor: "#1e1e1e" }}>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-left text-gray-400">
              Email Address
            </p>
            <h2 className="text-lg font-medium text-gray-100">{user?.email}</h2>
          </div>
        </div>

        <div className="w-[100%] rounded-lg p-4 mt-3 flex items-center justify-between" style={{ backgroundColor: "#1e1e1e" }}>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-left text-gray-400">
              Address
            </p>
            <h2 className="text-lg font-medium text-gray-100">{address || 'Not Set'}</h2>
          </div>
        </div>

        {/* Date Of Birth Section */}
        <div className="w-[100%] rounded-lg p-4 mt-3 flex items-center justify-between" style={{ backgroundColor: "#1e1e1e" }}>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-left text-gray-400">
              Date Of Birth
            </p>
            <span className="text-lg font-medium">{dateOfBirth || "Not Set"}</span>
          </div>
          {/* <div>
            <IoCalendarOutline className="h-6 w-6" />
          </div> */}
        </div>

        <div className="w-[100%] rounded-lg p-4 mt-3 flex items-center justify-between" style={{ backgroundColor: "#1e1e1e" }}>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-left text-gray-400">
              Phone Number
            </p>
            <span className="text-lg font-medium">{phoneNumber || "Not Set"}</span>
          </div>
          {/* <div>
            {isVerified ? <GoVerified className="h-6 w-6 text-green-500" /> : <GoVerified className="h-6 w-6" /> }
          </div> */}
        </div>

        {/* Edit Profile Section */}
        <div className="flex flex-col w-full mt-8 gap-4">
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
              <Button style={{ backgroundColor: "#fff" }} className="text-dark-2 font-base bg-red-700" disabled={isLoading}>
                {isLoading ? 'Editing Profile...' : 'Edit Profile'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Your Profile</DialogTitle>
                <DialogDescription>
                  <div className="text-gray-300">
                    Make changes to your profile here. Click save changes when you're done.
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-5 py-4">
                {/* Username */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter Your Username"
                    className="col-span-3 shad-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    className="col-span-3 shad-input"
                    placeholder="Enter Your Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                
                {/* Phone Number */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="Enter Your Phone Number"
                    className="col-span-3 shad-input"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="dob">Date Of Birth</Label>
                  <div className="relative w-full">
                    {/* Input Field */}
                    <Input
                      id="dob"
                      type="date"
                      className="w-full pr-10 shad-input"  // Add padding-right to avoid overlap with the icon
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      ref={(input) => {
                        if (input) {
                          input.setAttribute("aria-label", "Select a date");
                        }
                      }}
                    />

                    {/* Calendar Icon */}
                    <IoCalendarOutline
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white cursor-pointer"
                      onClick={() => document.getElementById('dob')?.focus()}  // Programmatically trigger the focus on input
                    />
                  </div>
                </div>  

                {/* Avatar Selection */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="avatar">Choose Avatar</Label>
                  <div className="flex gap-3 mt-3 flex-wrap">
                    {avatars.map((avatar) => (
                      <img
                        key={avatar.id}
                        src={avatar.src}
                        alt="Avatar"
                        className={`cursor-pointer h-12 w-12 rounded-md ${selectedAvatar === avatar.src ? "border-2 border-blue-500" : ""}`}
                        onClick={() => setSelectedAvatar(avatar.src)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleSaveChanges} disabled={isLoading} style={{ backgroundColor: "#fff" }} className="text-dark-2 font-base bg-red-700" >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button style={{ backgroundColor: "#EB001B" }} className="text-white font-base bg-red-700" disabled={isLoading}>
            {isLoading ? 'Deleting Account...' : 'Delete Account'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
