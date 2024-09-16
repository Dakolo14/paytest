import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from '@/context/UserContexts';
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { Badge } from "@/components/ui/badge"
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import TapToPayButton from "../components/TapToPayButton";

interface Card {
  id: number;
  bank_name: string;
  card_number: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
}

const cardColors = ['bg-blue-500', 'bg-green-500', 'bg-pink-500', 'bg-yellow-500', 'bg-purple-500'];

const Home = () => {
  const { user } = useUser();
  const [_cards, setCards] = useState<Card[]>([]);
  const [_selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [notifications] = useState(1);
  const [cardAdded] = useState(true);
  const [_cardColorMap, setCardColorMap] = useState<{ [key: number]: string }>({});
  const [isPrimaryAccount] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchCards = async () => {
        try {
          const response = await axios.get(`https://blockchainbinaryopt.shop/payfly/backend/api/get_cards.php?user_id=${user.id}`);
          const fetchedCards: Card[] = response.data.cards;
          setCards(fetchedCards);

          if (fetchedCards.length > 0) {
            setSelectedCard(fetchedCards[0]); // Set the first card or last used card
          }

          // Assign colors to cards
          const colorMap: { [key: number]: string } = {};
          let availableColors = [...cardColors];

          fetchedCards.forEach(card => {
            if (availableColors.length === 0) {
              availableColors = [...cardColors]; // Reset available colors if exhausted
            }
            const colorIndex = Math.floor(Math.random() * availableColors.length);
            colorMap[card.id] = availableColors.splice(colorIndex, 1)[0];
          });

          setCardColorMap(colorMap);
        } catch (error) {
          console.error('Error fetching cards:', error);
        }
      };

      fetchCards();
    }
  }, [user]);

  // const handleCardSwitch = (card: Card) => {
  //   setSelectedCard(card);
  // };

  /* if (!user) {
    return <p>Loading...</p>; // Or handle it in a different way
  } */

  // Filter the cards to exclude the selected card
  // const otherCards = cards.filter(card => card.id !== selectedCard?.id);


  const bankName = 'Bank Name';
  const cardNumber = '**** **** **** **38';
  const cvv = '***';
  const expiryDate = '**/**';
  // const accounts = [
  //   { id: 1, name: 'Primary Account', isActive: true },
  //   { id: 2, name: 'Secondary Account', isActive: false },
  // ];


  return (
    <div className="w-full my-5 px-4">
      {/* Main Avatar, Welcome Message and notification row */}
      <div className='flex justify-between gap-4'>
        <div className="flex gap-4">
          {/* {This image should be connected to user profile image} */}
          <Link to='/profile' className='flex-center gap-3'>
            <img src={'/assets/images/profile.png'} alt="profile image" className='h-full w-full rounded-full' />
          </Link>
          <div className="flex flex-col">
            <p className="text-sm text-gray-400 truncate">Welcome Back,</p>
            <h3 className="pt-2 text-xl font-medium text-gray-100">{user?.first_name} {user?.last_name}</h3>
          </div>
        </div>
        <Link to='/notification' style={{ backgroundColor: '#555' }} className="px-4 py-2 rounded-full flex items-center justify-center relative">
          <div>
            <IoNotificationsOutline className="text-white w-6 h-6" />
            {notifications > 0 && (
              <Badge className="absolute top-3 right-4 transform translate-x-1/4 -translate-y-1/4 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications}
              </Badge>
            )}
          </div>
        </Link>
      </div>

      {/* State change between having a card and not */}    
      <div className="text-white p-2 rounded-md" style={{ marginTop: '42px' }}>
        {cardAdded ? (
          <div>
            <div className="text-sm text-gray-400 mb-2">
              {isPrimaryAccount ? 'Primary Account' : 'Secondary Account'}
            </div>
            {/* ATM CARD DESIGN */}
            <div className="bg-gray-800 rounded-lg p-4 relative w-full">
              <div className="flex justify-between items-start">
                <span className="text-md font-medium">{bankName}</span>
                <img src={`/assets/images/payment-tag.png`} alt="NFC" className="h-8 w-8" />
              </div>
              <div className="text-lg tracking-widest mt-6">
                <p style={{ fontSize: '1.5rem' }}>{cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}</p>
              </div>
              <div className="flex justify-start gap-4 mt-3">
                <div className="flex flex-col">
                  <span className="text-xs pr-4">CVV</span>
                  <span className="text-sm">{cvv}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">Expires</span>
                  <span className="text-sm">{expiryDate}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-medium uppercase">{user?.first_name} {user?.last_name}</span>
                <img src="/assets/images/visa.png" alt="Card Type" className="h-8 w-12" />
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <Drawer>
                <DrawerTrigger className="text-sm text-white mb-2">Customize Card</DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>
                      <h2 className="text-l font-medium text-gray-100">Customize Card</h2>
                      <p className="text-sm pt-2 text-gray-400">
                          Make your card stand out with custom designs
                      </p>
                    </DrawerTitle>
                  </DrawerHeader>
                    <div className="flex-1 overflow-y-auto p-4">
                      {/* Scrollable content */}
                      <DrawerDescription>
                        {/* Card options 1 */}
                        <div className="grid p-4 grid-flow-col w-full">
                          <Checkbox id="terms" />
                          <label
                            htmlFor="terms"
                            className="text-xxl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <div className="bg-gray-800 rounded-lg p-5 relative w-100vw">
                              <div className="flex justify-between items-start">
                                <span className="text-md font-medium">{bankName}</span>
                                <img src={`/assets/images/payment-tag.png`} alt="NFC" className="h-8 w-8" />
                              </div>
                              <div className="text-lg tracking-widest mt-6">
                                <p style={{ fontSize: '1.5rem' }}>{cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}</p>
                              </div>
                              <div className="flex justify-start gap-4 mt-3">
                                <div className="flex flex-col">
                                  <span className="text-xs pr-4">CVV</span>
                                  <span className="text-sm">{cvv}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs">Expires</span>
                                  <span className="text-sm">{expiryDate}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-medium uppercase">{user?.first_name} {user?.last_name}</span>
                                <img src="/assets/icons/visa-icon.png" alt="Card Type" className="h-6 w-10" />
                              </div>
                            </div>
                          </label>
                        </div>
                        {/* Card options 2 */}
                        <div className="grid p-4 grid-flow-col w-full">
                          <Checkbox id="terms" />
                          <label
                            htmlFor="terms"
                            className="text-xxl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <div className="bg-gray-800 rounded-lg p-5 relative w-100vw">
                              <div className="flex justify-between items-start">
                                <span className="text-md font-medium">{bankName}</span>
                                <img src={`/assets/images/payment-tag.png`} alt="NFC" className="h-8 w-8" />
                              </div>
                              <div className="text-lg tracking-widest mt-6">
                                <p style={{ fontSize: '1.5rem' }}>{cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}</p>
                              </div>
                              <div className="flex justify-start gap-4 mt-3">
                                <div className="flex flex-col">
                                  <span className="text-xs pr-4">CVV</span>
                                  <span className="text-sm">{cvv}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs">Expires</span>
                                  <span className="text-sm">{expiryDate}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-medium uppercase">{user?.first_name} {user?.last_name}</span>
                                <img src="/assets/icons/visa-icon.png" alt="Card Type" className="h-6 w-10" />
                              </div>
                            </div>
                          </label>
                        </div>
                        {/* Card options 3 */}
                        <div className="grid p-4 grid-flow-col w-full">
                          <Checkbox id="terms" />
                          <label
                            htmlFor="terms"
                            className="text-xxl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <div className="bg-gray-800 rounded-lg p-5 relative w-100vw">
                              <div className="flex justify-between items-start">
                                <span className="text-md font-medium">{bankName}</span>
                                <img src={`/assets/images/payment-tag.png`} alt="NFC" className="h-8 w-8" />
                              </div>
                              <div className="text-lg tracking-widest mt-6">
                                <p style={{ fontSize: '1.5rem' }}>{cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}</p>
                              </div>
                              <div className="flex justify-start gap-4 mt-3">
                                <div className="flex flex-col">
                                  <span className="text-xs pr-4">CVV</span>
                                  <span className="text-sm">{cvv}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs">Expires</span>
                                  <span className="text-sm">{expiryDate}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-medium uppercase">{user?.first_name} {user?.last_name}</span>
                                <img src="/assets/icons/visa-icon.png" alt="Card Type" className="h-6 w-10" />
                              </div>
                            </div>
                          </label>
                        </div>
                      </DrawerDescription>
                    </div>
                  <DrawerFooter>
                    <Button className="bg-white text-dark-2">Select Design</Button>
                    <DrawerClose>
                      <Button variant="outline" className="w-full">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              <Drawer>
                <DrawerTrigger className="text-sm text-white underline mb-2">Switch Account</DrawerTrigger>
                <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>
                      <h2 className="text-l font-medium text-gray-100">Switch Account</h2>
                      <p className="text-sm pt-2 text-gray-400">
                        Switch between your bank cards and set a primary card for faster payments
                      </p>
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="flex-1 overflow-y-auto p-4">
                      {/* Scrollable content */}
                      <DrawerDescription>
                        {/* Card options 1 */}
                        <div className="grid p-4 grid-flow-col w-full">
                          <Checkbox id="terms" />
                          <label
                            htmlFor="terms"
                            className="text-xxl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <div className="bg-gray-800 rounded-lg p-5 relative w-100vw">
                              <div className="flex justify-between items-start">
                                <span className="text-lg font-semibold">{bankName}</span>
                                <img src={`/assets/images/payment-tag.png`} alt="NFC" className="h-8 w-8" />
                              </div>
                              <div className="text-lg tracking-widest mt-6">
                                <p style={{ fontSize: '1.5rem' }}>{cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}</p>
                              </div>
                              <div className="flex justify-start gap-4 mt-3">
                                <div className="flex flex-col">
                                  <span className="text-xs pr-4">CVV</span>
                                  <span className="text-sm">{cvv}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs">Expires</span>
                                  <span className="text-sm">{expiryDate}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-medium uppercase">{user?.first_name} {user?.last_name}</span>
                                <img src="/assets/icons/visa-icon.png" alt="Card Type" className="h-6 w-10" />
                              </div>
                            </div>
                          </label>
                        </div>
                        {/* Card options 2 */}
                        <div className="grid p-4 grid-flow-col w-full">
                          <Checkbox id="terms" />
                          <label
                            htmlFor="terms"
                            className="text-xxl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <div className="bg-gray-800 rounded-lg p-5 relative w-100vw">
                              <div className="flex justify-between items-start">
                                <span className="text-lg font-semibold">{bankName}</span>
                                <img src={`/assets/images/payment-tag.png`} alt="NFC" className="h-8 w-8" />
                              </div>
                              <div className="text-lg tracking-widest mt-6">
                                <p style={{ fontSize: '1.5rem' }}>{cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}</p>
                              </div>
                              <div className="flex justify-start gap-4 mt-3">
                                <div className="flex flex-col">
                                  <span className="text-xs pr-4">CVV</span>
                                  <span className="text-sm">{cvv}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs">Expires</span>
                                  <span className="text-sm">{expiryDate}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-medium uppercase">{user?.first_name} {user?.last_name}</span>
                                <img src="/assets/icons/visa-icon.png" alt="Card Type" className="h-6 w-10" />
                              </div>
                            </div>
                          </label>
                        </div>
                        {/* Card options 3 */}
                        <div className="grid p-4 grid-flow-col w-full">
                          <Checkbox id="terms" />
                          <label
                            htmlFor="terms"
                            className="text-xxl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <div className="bg-gray-800 rounded-lg p-5 relative w-100vw">
                              <div className="flex justify-between items-start">
                                <span className="text-lg font-semibold">{bankName}</span>
                                <img src={`/assets/images/payment-tag.png`} alt="NFC" className="h-8 w-8" />
                              </div>
                              <div className="text-lg tracking-widest mt-6">
                                <p style={{ fontSize: '1.5rem' }}>{cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}</p>
                              </div>
                              <div className="flex justify-start gap-4 mt-3">
                                <div className="flex flex-col">
                                  <span className="text-xs pr-4">CVV</span>
                                  <span className="text-sm">{cvv}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs">Expires</span>
                                  <span className="text-sm">{expiryDate}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-medium uppercase">{user?.first_name} {user?.last_name}</span>
                                <img src="/assets/icons/visa-icon.png" alt="Card Type" className="h-6 w-10" />
                              </div>
                            </div>
                          </label>
                        </div>
                      </DrawerDescription>
                    </div>
                  <DrawerFooter>
                      <Button className="bg-white text-dark-2">Select Card</Button>
                      <DrawerClose>
                        <Button variant="outline" className="w-full">Cancel</Button>
                      </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ backgroundColor: "#555" }} className="p-6 rounded-md">
                    <h2 className="text-xl font-semibold">Add a bank card</h2>
                    <p className="mt-2 text-md text-gray-300">Add a bank card to perform transactions seamlessly on our app.</p>
                    <div className="mt-4 flex justify-end">
                    <Link 
                        to='/cards'
                        className="bg-white hover:bg-slate-500 text-black font-bold py-2 px-4 rounded-md"
                    >
                        Add card
                    </Link>
                    </div>
            </div>
          </div>
        )}
      </div>

      {/* Using the ability to input pin or code */}     
      <div className="text-white p-2 flex mx-auto rounded-md" style={{ marginTop: '2rem' }}>
        {cardAdded ? (
          <TapToPayButton />
        ) : (
          <div style={{ backgroundColor: "#555" }} className="hidden">
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
