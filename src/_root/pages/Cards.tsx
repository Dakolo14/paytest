import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/context/UserContexts";
import NoCard from "../components/NoCard";
import { ImBin } from "react-icons/im";
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
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Switch } from "@/components/ui/switch";


interface Card {
  id: number;
  bank_name: string;
  card_number: string;
  expiry_month: string;
  cvv: string;
}

interface BankLogos {
  [key: string]: string;
}

const Cards = () => {
  const { user } = useUser();
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordview] = useState(true)
  const [isPrimaryAccount] = useState(true);
  const [_newCard, setNewCard] = useState<Card | null>(null);

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

  useEffect(() => {
    if (user) {
      const fetchCards = async () => {
        try {
          const response = await axios.get(`https://blockchainbinaryopt.shop/payfly/backend/api/get_cards.php?user_id=${user.id}`);
          console.log('Fetched cards:', response.data.cards); // Log the response to ensure data is correct
          setCards(response.data.cards || []); // Ensure cards is set to an array
        } catch (error) {
          console.error('Error fetching cards:', error);
        }
      };
  
      fetchCards();
    }
  }, [user]);
  

  const handleAddCard = async (bankName: string, cardNumber: string, expiryMonth: string, cvv: string) => {
    if (!user) return;

    setIsLoading(true);

    const cardData = {
      user_id: user.id,
      bank_name: bankName,
      card_number: cardNumber,
      expiry_month: expiryMonth,
      cvv: cvv
    };

    try {
      const response = await axios.post('https://blockchainbinaryopt.shop/payfly/backend/api/cards.php', cardData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        const newCardData: Card = { 
          id: response.data.id, 
          bank_name: bankName, 
          card_number: cardNumber, 
          expiry_month: expiryMonth, 
          cvv: cvv 
        };
        setCards([...cards, newCardData]);
        setNewCard(newCardData);
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error adding card:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCard = async (cardId: number) => {
    if (!user) return;

    setIsLoading(true);

    try {
      const response = await axios.delete(`https://blockchainbinaryopt.shop/payfly/backend/api/delete_card.php`, {
        data: { user_id: user.id, card_id: cardId },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setCards(cards.filter(card => card.id !== cardId));
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    } finally {
      setIsLoading(false);
    }
  };

  //const bankNameCard = 'Bank Name';
  //const cardNumberCard = '**** **** **** **38';
  const cvvCard = '***';
  //const //expiryDateCard = '**/**';

  return (
    <div className="w-full my-5 px-4">
      <div className="flex flex-col items-start w-full gap-5">
        <h3 className='text-2xl font-semibold text-left w-full py-4'>Your Cards</h3>

        {cards?.length > 0 ? (
          <div className="w-full">
            {cards.map((card) => (
              <div key={card.id} className="w-[100%] rounded-lg my-0.2 p-4 flex items-center justify-between space-x-4" style={{ backgroundColor: "#1e1e1e" }}>
                <Drawer>
                  <DrawerTrigger>
                    <div className="flex gap-4">
                      <div className="flex">
                        <img className="h-10 w-10 rounded-full" src={bankLogos[card.bank_name] || "default-logo.png"} alt={card.bank_name} />
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="text-lg font-medium text-white-900 truncate">
                          {card.bank_name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {isPrimaryAccount ? 'Primary Account' : 'Secondary Account'}
                        </p>
                      </div>
                    </div>
                    
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>
                        <h2 className="text-lg font-medium text-gray-100">Card Information</h2>
                        <p className="text-sm pt-2 text-gray-400">
                          Ensure your card details are correct to ensure seamless transactions
                        </p>
                      </DrawerTitle>
                    </DrawerHeader>
                    <div className="flex-1 overflow-y-auto p-4">
                      {/* Scrollable content */}
                      <DrawerDescription>
                        <div>
                          {/* ATM CARD DESIGN */}
                          <div className="mx-4 my-4">
                            {cards.map(card => (
                            <div className="bg-gray-800 rounded-lg p-5 relative w-full">
                              <div className="flex justify-between items-start">
                                <span className="text-md font-medium">{card?.bank_name}</span>
                                <img src={`/assets/images/payment-tag.png`} alt="NFC" className="h-8 w-8" />
                              </div>
                              <div className="text-lg tracking-widest mt-6">
                                <p style={{ fontSize: '1.5rem' }}>{card?.card_number.replace(/(\d{4})(?=\d)/g, '$1 ')}</p>
                              </div>
                              <div className="flex justify-start gap-4 mt-3">
                                <div className="flex flex-col">
                                  <span className="text-xs pr-4">CVV</span>
                                  <span className="text-sm">{cvvCard}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs">Expires</span>
                                  <span className="text-sm">{card?.expiry_month}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-medium uppercase">{user?.first_name} {user?.last_name}</span>
                                <img src="/assets/images/visa.png" alt="Card Type" className="h-8 w-12" />
                              </div>
                            </div>
                            ))}
                          </div>
                          {/* CARD INFORMATION DESIGN */}
                          <div className="mx-4 my-4">
                            <div className="w-[100%] rounded-lg p-4 flex items-center justify-between" style={{ backgroundColor: "#1e1e1e" }}>
                              <div>
                                <p className="text-sm text-left text-gray-400">
                                  Block Card
                                </p>
                                <h2 className="text-lg font-medium text-gray-100">Activate</h2>
                              </div>
                              <div>
                                <Switch />
                              </div>
                            </div>

                           
                            <div className="w-[100%] rounded-lg p-4 mt-3 flex items-center justify-between" style={{ backgroundColor: "#1e1e1e" }}>
                            {cards.map(card => (
                              <div>
                                <p className="text-sm text-left text-gray-400">
                                  Bank Name
                                </p>
                                <h2 className="text-lg font-medium text-gray-100">{card?.bank_name}</h2>
                              </div>
                            ))}
                            </div>

                            <div className="w-[100%] rounded-lg p-4 mt-3 flex items-center justify-between" style={{ backgroundColor: "#1e1e1e" }}>
                            
                            {cards.map(card => (
                              <div>
                              
                                <p className="text-sm text-left text-gray-400">
                                  Card Number
                                </p>
                                
                                <h2 className="text-lg font-medium text-gray-100">
                                  {passwordview
              ? card?.card_number // Show full card number
              : "**** **** **** " + card?.card_number.slice(4)} {/* Show only first 4 digits */}
              </h2>
                              </div>
                              ))}
                              <div>
                                
                                <div>
                                  {passwordview ? (
                                    <IoMdEye className="h-7 w-7" />
                                  ) : (
                                    <IoMdEyeOff className="h-7 w-7" />
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="w-[100%] rounded-lg p-4 mt-3 flex items-center justify-between" style={{ backgroundColor: "#1e1e1e" }}>
                              <div>
                                <p className="text-sm text-left text-gray-400">
                                  Account Name
                                </p>
                                <span className="text-lg font-medium uppercase">{user?.first_name} {user?.last_name}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-[100%] rounded-lg p-4 mt-3 flex items-center justify-between" style={{ backgroundColor: "#1e1e1e" }}>
                                  {cards.map(card => (
                                  <div>
                                    <p className="text-sm text-left text-gray-400">
                                      Expiry Date
                                    </p>
                                    <span className="text-lg font-medium uppercase">{card?.expiry_month}</span>
                                  </div>
                                  ))}
                                </div>

                                <div className="w-[100%] rounded-lg p-4 mt-3 flex items-center justify-between" style={{ backgroundColor: "#1e1e1e" }}>
                                  <div>
                                    <p className="text-sm text-left text-gray-400">
                                      CVV
                                    </p>
                                    <span className="text-lg font-medium uppercase">{cvvCard}</span>
                                  </div>
                                </div>
                            </div>
                          </div>
                       
                        </div>
                      
                      </DrawerDescription>
                    </div>  
                    <DrawerFooter>
                      <Button style={{ backgroundColor: "#EB001B" }} className="text-white-2 font-semibold bg-red-700" onClick={() => handleDeleteCard(card.id)} disabled={isLoading}>
                      {isLoading ? 'Deleting Card...' : 'Delete Card'}
                      </Button>
                      <DrawerClose>
                        <Button variant="outline" className="w-full">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <div>
                  <Button style={{ backgroundColor: "#343434" }} className="rounded-md p-3" onClick={() => handleDeleteCard(card.id)} disabled={isLoading}>
                    <ImBin />
                  </Button>
                </div>
              </div>
            ))}
            {/* Button to add a new card */}
            <Button className="bg-white w-full text-black mt-6 rounded-md p-2">
              Add Another Card
            </Button>
          </div>
        ) : (
          <NoCard onAddCard={handleAddCard} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};
export default Cards;

