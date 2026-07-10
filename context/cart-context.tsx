"use client"

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react"
import type { Product } from "@/lib/types"

const CART_STORAGE_KEY = "carthage-cart-v2"

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity?: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "SET_CART_OPEN"; isOpen: boolean }
  | { type: "LOAD_CART"; items: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.product.id
      )
      if (existingIndex > -1) {
        const newItems = [...state.items]
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + (action.quantity || 1),
        }
        return { ...state, items: newItems }
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: action.quantity || 1 }],
      }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.productId),
      }
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== action.productId),
        }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      }
    }
    case "CLEAR_CART":
      return { ...state, items: [] }
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }
    case "SET_CART_OPEN":
      return { ...state, isOpen: action.isOpen }
    case "LOAD_CART":
      return { ...state, items: action.items }
    default:
      return state
  }
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (isOpen: boolean) => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          const items = parsed.filter(
            (item): item is CartItem =>
              item &&
              typeof item.quantity === "number" &&
              item.quantity > 0 &&
              item.product &&
              typeof item.product.id === "string" &&
              typeof item.product.price === "number" &&
              item.product.translations,
          )
          dispatch({ type: "LOAD_CART", items })
        }
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // ignore storage errors
    }
  }, [state.items])

  const addItem = useCallback((product: Product, quantity?: number) => {
    dispatch({ type: "ADD_ITEM", product, quantity })
  }, [])

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: "REMOVE_ITEM", productId })
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" })
  }, [])

  const toggleCart = useCallback(() => {
    dispatch({ type: "TOGGLE_CART" })
  }, [])

  const setCartOpen = useCallback((isOpen: boolean) => {
    dispatch({ type: "SET_CART_OPEN", isOpen })
  }, [])

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        setCartOpen,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
