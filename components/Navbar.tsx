"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, User, Heart } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useUserItems } from "@/app/context/UserItemsProvider";
import { useAuthContext } from "@/app/context/AuthProvider";
import { useCart } from "@/hooks/use-cart";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth
  const {
    isAuthenticated,
    user,
    logout,
    mounted: authMounted,
  } = useAuthContext();

  // User Items (cart + favorites)
  const { favorites, mounted: itemsMounted, getCartItemCount } = useUserItems();
  const { itemCount, mounted } = useCart();
  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  // allMounted ensures both Auth and Items are loaded
  const allMounted = authMounted && itemsMounted;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            MOFIT
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-muted-foreground"
            >
              Home
            </Link>
            <Link
              href="/products?category=Men"
              className="text-sm font-medium transition-colors hover:text-muted-foreground"
            >
              Men
            </Link>
            <Link
              href="/products?category=Women"
              className="text-sm font-medium transition-colors hover:text-muted-foreground"
            >
              Women
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium transition-colors hover:text-muted-foreground"
            >
              All products
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Auth */}
            {authMounted &&
              (isAuthenticated && user ? (
                <div className="hidden items-center gap-3 md:flex">
                  <span className="text-sm text-muted-foreground">
                    Hi, {user.name}
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login" className="hidden md:block">
                  <Button variant="ghost" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              ))}

            {/* Favorites */}
            <Link href="/favorites" className="relative">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                {allMounted && favorites.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {mounted && itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border/40 md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products?category=Men"
              className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              href="/products?category=Women"
              className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              href="/products"
              className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Products
            </Link>
            

            {authMounted &&
              (isAuthenticated && user ? (
                <>
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Hi, {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-md px-3 py-2 text-left text-base font-medium transition-colors hover:bg-accent"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
}
