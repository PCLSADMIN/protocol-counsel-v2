'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}

export default function ShopPage() {
  const [cart, setCart] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: 'mug',
      name: 'The Litigator Mug',
      description: 'Matte black ceramic mug with gold foil logo. 12oz capacity.',
      price: 35,
      inStock: true,
    },
    {
      id: 'nameplate',
      name: 'The Partner Nameplate',
      description: 'Walnut desk plate with engraved gold lettering. Customizable.',
      price: 125,
      inStock: true,
    },
    {
      id: 'pen',
      name: 'The Executive Pen Set',
      description: 'Matte black pen with gold accents. Includes refills.',
      price: 85,
      inStock: true,
    },
  ];

  const addToCart = (id: string) => {
    setCart(prev => [...prev, id]);
  };

  return (
    <main className="min-h-screen bg-oxford">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-oxford/95 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-white">PROTOCOL<span className="text-[#D4AF37]">COUNSEL</span></Link>
          <div className="flex items-center gap-6">
            <Link href="/shop" className="text-white text-sm font-medium">Executive Boutique</Link>
            <Link href="/portal/login" className="text-slate-300 text-sm">Login</Link>
          </div>
        </div>
      </nav>

      <header className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Executive Boutique</h1>
          <p className="text-slate-400">Curated firm essentials.</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <section className="grid gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-slate-800 border border-slate-700 rounded-lg p-8">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-2">{product.name}</h2>
                  <p className="text-slate-400 mb-4">{product.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white mb-2">${product.price}</div>
                  <button 
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock || cart.includes(product.id)}
                    className="px-6 py-2 bg-[#D4AF37] text-oxford rounded font-semibold hover:bg-[#b8962f] disabled:opacity-50"
                  >
                    {cart.includes(product.id) ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {cart.length > 0 && (
          <div className="mt-8 bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Cart ({cart.length} items)</span>
              <button className="px-6 py-2 bg-[#D4AF37] text-oxford rounded font-semibold hover:bg-[#b8962f]">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        <footer className="mt-16 pt-8 border-t border-slate-700 text-center text-slate-500 text-sm">
          <p>Protocol Counsel. Managed by Streamline Industries Management.</p>
        </footer>
      </div>
    </main>
  );
}