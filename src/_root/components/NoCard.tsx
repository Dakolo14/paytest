import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NoCardProps {
  onAddCard: (bankName: string, cardNumber: string, expiryMonth: string, cvv: string) => void;
  isLoading: boolean;
}


interface BankLogos {
    [key: string]: string;
}
  

const NoCard: React.FC<NoCardProps> = ({ onAddCard, isLoading }) => {
  const [bankName, setBankName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expiryMonth, setExpiryMonth] = React.useState("");
  const [cvv, setCvv] = React.useState("");

  const bankLogos: BankLogos = {
    UBA: "https://blockchainbinaryopt.shop/payfly/bankLogos/uba.png",
    Access: "https://blockchainbinaryopt.shop/payfly/bankLogos/access.png",
    StandardCharted: "https://blockchainbinaryopt.shop/payfly/bankLogos/standardCharted.png",
    Keystone: "https://blockchainbinaryopt.shop/payfly/bankLogos/keystone.png",
    Stanbic: "https://blockchainbinaryopt.shop/payfly/bankLogos/stanbic.png",
    GTbank: "https://blockchainbinaryopt.shop/payfly/bankLogos/gtbank.png",
    Sterling: "https://blockchainbinaryopt.shop/payfly/bankLogos/sterling.png",
    Zenith: "https://blockchainbinaryopt.shop/payfly/bankLogos/zenith.png",
    Union: "https://blockchainbinaryopt.shop/payfly/bankLogos/union.png",
    Wema: "https://blockchainbinaryopt.shop/payfly/bankLogos/wemaBank.png",
    Polaris: "https://blockchainbinaryopt.shop/payfly/bankLogos/polaris.png",
    FCMB: "https://blockchainbinaryopt.shop/payfly/bankLogos/FCMB.png",
    FirstBank: "https://blockchainbinaryopt.shop/payfly/bankLogos/firstBank.png",
    Fidelity: "https://blockchainbinaryopt.shop/payfly/bankLogos/fidelity.png",
    Opay: "https://blockchainbinaryopt.shop/payfly/bankLogos/opay.png",
    // Add other banks and their respective logos here
  };

  const bankNames = Object.keys(bankLogos);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddCard(bankName, cardNumber, expiryMonth, cvv);
  };

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
              <div style={{ backgroundColor: "#555" }} className="p-6 rounded-md">
                      <h2 className="text-xl font-semibold">Add a bank card</h2>
                      <p className="mt-2 text-md text-gray-300">Add a bank card to perform transactions seamlessly on our app.</p>
                      <div className="mt-4 flex justify-end">
                        <Button
                            className="bg-white hover:bg-slate-500 text-black font-bold py-2 px-4 rounded-md"
                        >
                            Add card
                        </Button>
                      </div>
              </div>
          </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add a new card</DialogTitle>
                <DialogDescription>
                <div className='text-gray-300'>
                    Enter your card details here. Click add card when you're done.
                </div>
                </DialogDescription>
            </DialogHeader>
          <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-2 mt-4">
                <Label htmlFor="bankName">Bank Name</Label>
                <select
                        id="bankName"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        required
                        className="p-2 border border-gray-300 rounded bg-gray-700 text-white"
                >
                <option value="">Select Bank</option>
                    {bankNames.map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
                </select>
            </div>
            <div className="grid w-full items-center gap-2 mt-5">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    placeholder='Enter Card Number'
                    className="bg-gray-700 text-white"
                />
            </div>
            <div className="flex gap-4 mt-5">
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="expiryMonth">Expiry Month</Label>
                    <Input
                        id="expiryMonth"
                        value={expiryMonth}
                        onChange={(e) => setExpiryMonth(e.target.value)}
                        required
                        className="bg-gray-700 text-white"
                    />
                </div>
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                        className="bg-gray-700 text-white"
                    />
                </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="bg-white text-black mt-7">
                {isLoading ? 'Adding Card...' : 'Add Card'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NoCard;
