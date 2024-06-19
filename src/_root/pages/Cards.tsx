import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const Cards = () => {
  return (
    <div className="w-full mt-2">
      <div className="flex flex-col items-start w-full gap-5 pe-5">
        <h3 className='h3-bold md:h2-bold text-left w-full py-4 px-6'>Your Cards</h3>
          <div className="border-2 w-[90%] border-gray-300 rounded-lg my-4 mx-6 p-4 flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img className="h-12 w-12 rounded-full" src="https://via.placeholder.com/150" /* Just put the user logged in avatar here*/ alt="Bank Profile Picture" /> 
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-medium text-gray-100">Bank Name</p>
              <p className="text-sm text-gray-400 truncate">Account Number</p>
            </div>
            <div>
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
          <Dialog>
          <DialogTrigger asChild>
              <p className="mx-auto underline">
                Add Bank Card
              </p>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Bank Card</DialogTitle>
              <DialogDescription>
                Add your bank card information. Click save changes when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-5 py-4">
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="bank-name" className="text-right">
                  Bank Name
                </Label>
                <Input
                  id="bank-name"
                  placeholder="Enter bank name here..."
                  className="col-span-3 shad-input"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="card-number" className="text-right">
                  Card Number
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your card number"
                  className="col-span-3 shad-input"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="flex gap-5 ">
                  <div>
                    <Label htmlFor="username" className="text-right">
                      Expiry Month
                    </Label>
                    <Input
                      id="username"
                      placeholder="MM/YY"
                      className="col-span-3 shad-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="username" className="text-right">
                      CVV
                    </Label>
                    <Input
                      id="username"
                      placeholder="***"
                      className="col-span-3 shad-input"
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" variant='white'>Save changes</Button>
            </DialogFooter>
          </DialogContent>
          </Dialog>
      </div>
    </div>
  )
}

export default Cards
