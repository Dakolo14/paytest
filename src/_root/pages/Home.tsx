import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from '@/lib/context/UserContexts';
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
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

const cardImages = [
  '/assets/images/card-design1.jpg', // URL of your first card design image
  '/assets/images/card-design2.jpg', // URL of your second card design image
  '/assets/images/card-design3.jpg', // URL of your third card design image
  '/assets/images/card-design4.jpg', // URL of your third card design image
  '/assets/images/card-design5.jpg', // URL of your third card design image
  '/assets/images/card-design6.jpg', // URL of your third card design image
  '/assets/images/card-design7.jpg', // URL of your third card design image
  '/assets/images/card-design8.jpg', // URL of your third card design image
  '/assets/images/card-design9.jpg', // URL of your third card design image
  '/assets/images/card-design10.jpg', // URL of your third card design image
  '/assets/images/card-design11.jpg', // URL of your third card design image
];

const Home = () => {
  const { user } = useUser();
  const [_cards, setCards] = useState<Card[]>([]); // Ensure it's always an array
  const [_selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [cardAdded, setCardAdded] = useState(false); // Initialize as false
  const [_cardColorMap, setCardColorMap] = useState<{ [key: number]: string }>({});
  const [isPrimaryAccount] = useState(true);
  const [selectedCardImage, setSelectedCardImage] = useState(cardImages[0]); // Default image
  const [tempSelectedImage] = useState(cardImages[0]);
  
  useEffect(() => {
    if (user) {
      console.log('User is:', user);  // Log user info
  
      const fetchCards = async () => {
        try {
          const response = await axios.get(`https://blockchainbinaryopt.shop/payfly/backend/api/get_cards.php?user_id=${user.id}`);
          console.log('API response:', response.data);  // Log API response

          const fetchedCards: Card[] = response.data?.cards || [];
          setCards(fetchedCards);

          if (Array.isArray(fetchedCards) && fetchedCards.length > 0) {
            setSelectedCard(fetchedCards[0]); // Set the first card or last used card
            setCardAdded(true); // Cards are available
          } else {
            setCardAdded(false); // No cards available
          }

          // Assign colors to cards
          const colorMap: { [key: number]: string } = {};
          let availableColors = [...cardImages];

          fetchedCards.forEach(card => {
            if (availableColors.length === 0) {
              availableColors = [...cardImages]; // Reset available colors if exhausted
            }
            const colorIndex = Math.floor(Math.random() * availableColors.length);
            colorMap[card.id] = availableColors.splice(colorIndex, 1)[0];
          });

          setCardColorMap(colorMap);
        } catch (error) {
          console.error('Error fetching cards:', error);
          setCards([]); // Ensure _cards is an array even if fetching fails
          setCardAdded(false); // No cards due to error
        }
      };

      fetchCards();
    } else {
      console.warn('User not available, skipping card fetch');
    }
  }, [user]);

  if (!user) {
    return <p>Loading...</p>; // Or handle it in a different way
  }

  // const handleCardSwitch = (card: Card) => {
  //   setSelectedCard(card);
  // };

  // Filter the cards to exclude the selected card
  // const otherCards = cards.filter(card => card.id !== selectedCard?.id);

  const defaultAvatar = './assets/avatar/avatar-1.png'

  const bankName = 'Bank Name';
  const cardNumber = '**** **** **** **38';
  const cvv = '***';
  const expiryDate = '**/**';
  // const accounts = [
  //   { id: 1, name: 'Primary Account', isActive: true },
  //   { id: 2, name: 'Secondary Account', isActive: false },
  // ];


  const identifyCardType = (number: string) => {
    const trimmedNumber = number.replace(/\s+/g, ''); // Remove spaces if any
    
    // Mastercard starts with 51-55 or specific ranges like 51991107
    if (/^5[1-5]/.test(trimmedNumber) || trimmedNumber.startsWith('51991107')) {
      return "mastercard";
    }
    // Visa starts with 4
    if (/^4/.test(trimmedNumber)) {
      return "visa";
    }
    // Verve starts with 5061, 6500, or 5078
    if (/^(5061|6500|5078)/.test(trimmedNumber)) {
      return "verve";
    }
    return "unknown";
  };

  const handleSelectDesign = () => {
    // Update the selected card image with the one chosen in the drawer
    setSelectedCardImage(tempSelectedImage);
  };

  return (
    <div className="w-full my-5 px-4">
      {/* Main Avatar, Welcome Message and notification row */}
      <div className='flex justify-between gap-4'>
        <div className="flex gap-4">
          {/* {This image should be connected to user profile image} */}
          <Link to='/profile' className='flex-center gap-3'>
            <img src={user?.avatar || defaultAvatar} 
            alt={`${user?.first_name}'s Profile Picture`} className='rounded-full h-12 w-12 object-cover' />
          </Link> 
          <div className="flex flex-col">
            <p className="text-sm text-gray-400 truncate">Welcome Back,</p>
            <h3 className="pt-2 text-xl font-medium text-gray-100">{user?.first_name} {user?.last_name}</h3>
          </div>
        </div>
        <Link to='/notification' className="px-4 py-2 rounded-full flex items-center justify-center relative">
          <div>
            <IoNotificationsOutline className="text-white w-6 h-6" />
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
          
            <div
              className="relative rounded-lg p-5 w-100vw"
              style={{
                backgroundImage: `url(${selectedCardImage})`, // Background image based on selected design
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
               
              {/* Add overlay for darker effect */}
              
              <div className="absolute inset-0 bg-black opacity-60 border border-slate-700 rounded-lg"></div>
            
              {/* ATM card content */}
              {_cards && Array.isArray(_cards) && _cards.length > 0 ? (
              _cards.map(card => {
                const cardType = identifyCardType(card.card_number); // Returns 'visa', 'mastercard', 'verve', etc.
                const lastTwoDigits = card.card_number.slice(-2);

                // Define the image source based on the card type
                const cardTypeImage = {
                  mastercard: '/assets/images/mastercard.png',
                  visa: '/assets/images/visa.png',
                  verve: '/assets/images/mastercard.png',
                  unknown: '/assets/images/visa.png', // Default fallback for unknown card types
                };
                
                return (
                  <div key={card.id} className="relative z-10">
                    <div className="flex justify-between">
                      <span className="text-md font-medium text-white">{card.bank_name}</span>
                      <img src={`/assets/images/payment-tag.png`} alt="NFC" className="h-8 w-8" />
                    </div>
                    <div className="text-lg tracking-widest mt-6">
                      <p style={{ fontSize: '1.5rem' }}> **** **** **** **{lastTwoDigits}</p>
                    </div>
                    <div className="flex justify-start gap-4 mt-3">
                      <div className="flex flex-col">
                        <span className="text-xs pr-4">CVV</span>
                        <span className="text-sm">{card.cvv}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs">Expires</span>
                        <span className="text-sm">{card.expiry_month}/{card.expiry_year}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-lg font-medium uppercase">{user?.first_name} {user?.last_name}</span>
                      <img 
                        src={cardTypeImage[cardType] || '/assets/images/visa.png'} 
                        alt="Card Type" 
                        className="h-8 w-12" 
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No cards found. Please add a card.</p>
            )}
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
                    {cardImages.map((image, index) => (
                      <div key={index} className="grid p-4 grid-flow-col w-full">
                        <Checkbox id={`terms-${index}`} />
                        <label
                          htmlFor={`terms-${index}`}
                          className="text-xxl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <div
                            className="relative rounded-lg p-5 w-100vw"
                            style={{
                              backgroundImage: `url(${image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              height: '200px', // Set a fixed height for your card design
                            }}
                          >
                            {/* Overlay using ::before */}
                            <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
                            
                            <div className="relative z-10">
                              <div className="flex justify-between items-start">
                                <span className="text-md font-medium text-white">{bankName}</span>
                                <img src={`/assets/images/payment-tag.png`} alt="NFC" className="h-8 w-8" />
                              </div>
                              <div className="text-lg tracking-widest mt-6 text-white">
                                <p style={{ fontSize: '1.5rem' }}>{cardNumber}</p>
                              </div>
                              <div className="flex justify-start gap-4 mt-3">
                                <div className="flex flex-col text-white">
                                  <span className="text-xs pr-4">CVV</span>
                                  <span className="text-sm">{cvv}</span>
                                </div>
                                <div className="flex flex-col text-white">
                                  <span className="text-xs">Expires</span>
                                  <span className="text-sm">{expiryDate}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-medium uppercase text-white">{user?.first_name} {user?.last_name}</span>
                                <img src="/assets/images/visa.png" alt="Card Type" className="h-6 w-10" />
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </DrawerDescription>
                </div>
                <DrawerFooter>
                  <Button className="bg-white text-dark-2" onClick={handleSelectDesign}>Select Design</Button>
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
                      <DrawerDescription>
                        {_cards.length > 0 ? (
                          _cards.map((card, index) => (
                            <div className="grid p-4 grid-flow-col w-full" key={index}>
                              <Checkbox
                                id={`switch-card-${index}`}
                                checked={_selectedCard?.id === card.id}
                                onChange={() => setSelectedCard(card)}
                              />
                              <label htmlFor={`switch-card-${index}`} className="text-xxl font-medium leading-none">
                                {/* Card content */}
                                <div className="bg-gray-800 rounded-lg p-5 relative w-full">
                                  <div className="flex justify-between items-start">
                                    <span className="text-lg font-semibold">{card?.bank_name}</span>
                                    <img src={'/assets/images/payment-tag.png'} alt="NFC" className="h-8 w-8" />
                                  </div>
                                  <div className="text-lg tracking-widest mt-6">
                                    <p style={{ fontSize: '1.5rem' }}>
                                      {card?.card_number.replace(/(\d{4})(?=\d)/g, '$1 ')}
                                    </p>
                                  </div>
                                  <div className="flex justify-start gap-4 mt-3">
                                    <div className="flex flex-col">
                                      <span className="text-xs pr-4">CVV</span>
                                      <span className="text-sm">***</span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-xs">Expires</span>
                                      <span className="text-sm">
                                        {card?.expiry_month}/{card?.expiry_year}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center mt-4">
                                    <span className="text-lg font-medium uppercase">
                                      {user?.first_name} {user?.last_name}
                                    </span>
                                    <img src="/assets/icons/visa-icon.png" alt="Card Type" className="h-6 w-10" />
                                  </div>
                                </div>
                              </label>
                            </div>
                          ))
                        ) : (
                          <div>
                            <div style={{ backgroundColor: "#555" }} className="p-6 rounded-md">
                              <h2 className="text-xl font-semibold">Add a bank card</h2>
                              <p className="mt-2 text-md text-gray-300">
                                Add a bank card to perform transactions seamlessly on our app.
                              </p>
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
      <div className="text-white p-2 flex mx-auto rounded-md" style={{ marginTop: '2rem', marginBottom: '100px', overflow: 'scroll' }}>
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
