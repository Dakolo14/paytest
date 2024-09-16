import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { LuSmartphoneNfc } from "react-icons/lu";
import PinInput from "./PinInput";


const TapToPayButton = () => {
  return (
    <div className="mx-auto bg-white text-dark-3 font-bold p-3 rounded-md">
        <Drawer>
            <DrawerTrigger>
                <div className="flex items-center justify-center gap-4">
                    <LuSmartphoneNfc className="h-8 w-8" />
                    <p className="text-base">Tap to Pay</p>
                </div>
            </DrawerTrigger>
            <DrawerContent className="flex flex-col h-full">
                <DrawerHeader>
                    <DrawerTitle>
                      <h2 className="text-l font-medium text-gray-100">Input Pin</h2>
                      <p className="text-sm pt-2 text-gray-400">
                          Please input your transaction pin to authorize this transaction
                      </p>
                    </DrawerTitle>
                <div className="flex-1 overflow-y-auto p-4">
                    {/* Scrollable content */}
                    <DrawerDescription>
                        <div className="flex justify-center mt-3">
                            <PinInput />
                        </div>
                    </DrawerDescription>
                </div>
                </DrawerHeader>
                <DrawerFooter className="sticky bottom-0 bg-dark p-4">
                    <Button className="bg-white text-dark-2 font-semibold">Authorize Payment</Button>
                    <DrawerClose>
                      <Button variant="outline" className="w-full">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </div>
  )
}

export default TapToPayButton