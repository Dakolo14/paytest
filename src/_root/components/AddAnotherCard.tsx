import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NoCardProps {
  onAddCard: (bankName: string, cardNumber: string, expiryMonth: string, expiryYear: string, cvv: string) => void;
  isLoading: boolean;
}


interface BankLogos {
    [key: string]: string;
}
  

const AddAnotherCard: React.FC<NoCardProps> = ({ onAddCard, isLoading }) => {
  const [bankName, setBankName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expiryMonth, setExpiryMonth] = React.useState("");
  const [expiryYear, setExpiryYear] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [_errors, setErrors] = React.useState<string | null>(null);


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
    if (cardNumber.length !== 16) {
      setErrors("Card number must be 16 digits");
      return;
    }

    if (cvv.length !== 3) {
      setErrors("CVV must be 3 digits");
      return;
    }

    if (parseInt(expiryMonth) < 1 || parseInt(expiryMonth) > 12) {
      setErrors("Month can only be 1-12");
      return;
    }

    if (!bankName) {
      setErrors("Please select a bank");
      return;
    }

    setErrors(null); // Clear any errors if validation passes
    onAddCard(bankName, cardNumber, expiryMonth, expiryYear, cvv);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ""); // Allow only digits
    if (input.length <= 16) setCardNumber(input);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ""); // Allow only digits
    if (input.length <= 3) setCvv(input);
  };

  const handleExpiryMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ""); // Allow only digits
    if (input.length <= 2 && parseInt(input) >= 1 && parseInt(input) <= 12) {
      setExpiryMonth(input);
    }
  };

  const handleExpiryYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ""); // Allow only digits
    if (input.length <= 2) setExpiryYear(input);
  };

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
            <Button
                className="w-full bg-white hover:bg-slate-500 text-black font-bold py-2 px-4 rounded-md"
            >
                Add Another Card
            </Button>
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
                <div className="w-full flex items-center gap-2">
                  <select
                          id="bankName"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          required
                          className="p-2 border border-gray-300 rounded bg-gray-700 text-white flex-1"
                  >
                  <option value="">Select Bank</option>
                      {bankNames.map((name) => (
                      <option key={name} value={name}>
                          {name}
                      </option>
                  ))}
                  </select>
                  {bankName && (
                    <div className="">
                      <img src={bankLogos[bankName]} alt={`${bankName} logo`} className="w-10 h-10 rounded-full" />
                    </div>
                  )}
                </div>
            </div>
            <div className="grid w-full items-center gap-2 mt-5">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    autoComplete="off"
                    required
                    placeholder='Enter Card Number'
                    className="bg-gray-700 text-white"
                />
            </div>
            <div className="flex gap-4 mt-5">
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="expiryMonth">Expiry Date</Label>
                    <div className="flex w-full items-center gap-2">
                      <Input
                          id="expiryMonth"
                          value={expiryMonth}
                          onChange={handleExpiryMonthChange}
                          required
                          className="bg-gray-700 text-white"
                          placeholder='MM'
                      />
                      <Input
                        id="expiryYear"
                        value={expiryYear}
                        onChange={handleExpiryYearChange}
                        required
                        className="bg-gray-700 text-white"
                        placeholder='YY'
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                        id="cvv"
                        value={cvv}
                        onChange={handleCvvChange}
                        autoComplete="off"
                        required
                        className="bg-gray-700 text-white"
                        placeholder='***'
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

export default AddAnotherCard;
