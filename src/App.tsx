import { Routes, Route } from "react-router-dom";
import './globals.css';
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster"
import { Cards, Home, Profile, Transaction, UpgradeProfile } from "./_root/pages";

const App = () => {
  return (
    <main className="flex h-screen">
        <Routes>
            {/* Public Routes: accessible to everyone */}
            <Route element={<AuthLayout />}>
                <Route path="/signin" element={<SigninForm />} />
                <Route path="/signup" element={<SignupForm />} />
            </Route>

            {/* Private Routes: accessible to users logged in */}
            <Route element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/profile/:id/*" element={<Profile />} />
                <Route path="/update-profile/:id" element={<UpgradeProfile />} />
            </Route>
        </Routes>

        <Toaster />
    </main>
  )
}

export default App
