import React from "react";
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom";
import Navbar from "./Navbar"; // Navbar component
import Home from "./Home"; // Home page component
import Kombatants from "./Kombatants"; // Kombatants page component
import About from "./About"; // About page component
import Tier from "./Tier/Tier"; // Tier list component
import PrivacyPolicy from "./privacy"; // Privacy Policy page component
import "./App.css"; // Import the CSS file to style the app

// Clerk components for authentication
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    SignIn,
    SignUp,
    UserButton,
    useUser,
    useAuth,
} from "@clerk/clerk-react";

import KombatantDetails from "./KombatantDetails"; // Details page for individual kombatants

// Error handling for missing Clerk Publishable Key
if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key!");
}
const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY; // Fetch Clerk Publishable Key from environment variables

// Define routes using createBrowserRouter
const myRoutes = createBrowserRouter([
    {
        // Home page route
        path: "/",
        element: (
            <>
                <Navbar />
                <Home />
            </>
        ),
    },
    {
        // Kombatants list page route
        path: "/kombatants",
        element: (
            <>
                <Navbar />
                <Kombatants />
            </>
        ),
    },
    {
        // Kombatant details page route (dynamic id in the URL)
        path: "/kombatantDetails/:id",
        element: (
            <>
                <Navbar />
                <KombatantDetails />
            </>
        ),
    },
    {
        // About page route
        path: "/about",
        element: (
            <>
                <Navbar />
                <About />
            </>
        ),
    },
    {
        // Tier list page route
        path: "/tier-list",
        element: (
            <>
                <Navbar />
                <Tier />
            </>
        ),
    },
    {
        // Privacy Policy page route
        path: "/privacy-policy",
        element: (
            <>
                <Navbar />
                <PrivacyPolicy />
            </>
        ),
    },
    {
        // Sign-in page route with Clerk's SignIn component
        path: "/sign-in/*",
        element: (
            <div className="signin-wrapper">
                <SignIn routing="path" path="/sign-in" />{" "}
            </div>
        ),
    },
    {
        // Sign-up page route with Clerk's SignUp component
        path: "/sign-up/*",
        element: <SignUp routing="path" path="/sign-up" />,
    },
]);

// Main App component that wraps everything in the ClerkProvider for authentication
const App = () => {
    return (
        <ClerkProvider
            publishableKey={clerkPublishableKey} // Pass the Clerk publishable key for authentication
            navigate={(to) => myRoutes.navigate(to)} // Navigation handler for route transitions
        >
            <RouterProvider router={myRoutes} /> // Provide the defined routes
            to the app
        </ClerkProvider>
    );
};

export default App; // Export the App component
