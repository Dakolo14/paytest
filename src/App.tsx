import { Routes, Route } from "react-router-dom";
import './globals.css';
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import LandingLayout from "./_landing/LandingLayout";
import { Toaster } from "@/components/ui/toaster"
import { Cards, Home, Profile, Transaction, UpgradeProfile } from "./_root/pages";
import { LandingPage, About, HowTo, Developers } from "./_landing/pages/landing";
import ProfileLayout from "./_profilepages/ProfileLayout";
import { UserDetails, ResetPin, Referrals, HelpSupport, WhatsNew, Faq, Terms, PrivacyPolicy, Notification } from "./_profilepages/pages/profile";

const App = () => {
  return (
    <main className="flex h-screen">
        <Routes>
            {/* Public Routes: accessible to everyone */}
            <Route element={<AuthLayout />}>
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/signin" element={<SigninForm />} />
            </Route>

            {/* Private Routes: accessible to users logged in */}
            <Route element={<LandingLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/howto" element={<HowTo />} />
                <Route path="/developer" element={<Developers />} />
            </Route>

            {/* Private Routes: accessible to users logged in */}
            <Route element={<RootLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/update-profile/:id" element={<UpgradeProfile />} />
            </Route>

            {/* Private Routes: accessible to users logged in */}
            <Route element={<ProfileLayout />}>
                <Route path="/user-details" element={<UserDetails />} />
                <Route path="/reset-pin" element={<ResetPin />} />
                <Route path="/referrals" element={<Referrals />} />
                <Route path="/help" element={<HelpSupport />} />
                <Route path="/whats-new" element={<WhatsNew />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/terms-of-use" element={<Terms />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/notification" element={<Notification />} />
            </Route>


        </Routes>

        <Toaster />
    </main>
  )
}

export default App
