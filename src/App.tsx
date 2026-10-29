import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { FeaturesBento } from './components/FeaturesBento';
import { LiveBenchmark } from './components/LiveBenchmark';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';

export function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [planPrice, setPlanPrice] = useState(16);

  // Mouse spotlight glow coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleOpenCheckout = (
    planName = 'Pro',
    cycle: 'monthly' | 'yearly' = 'monthly',
    price = 16
  ) => {
    setSelectedPlan(planName);
    setBillingCycle(cycle);
    setPlanPrice(price);
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#060709] text-slate-100 relative selection:bg-emerald-500 selection:text-black">
      {/* Subtle dynamic mouse spotlight follower */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-40 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.05), transparent 80%)`,
        }}
      />

      {/* Main Navbar */}
      <Navbar onOpenCheckout={() => handleOpenCheckout('Pro', 'monthly', 16)} />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenCheckout={handleOpenCheckout} />
        <InteractiveSimulator />
        <FeaturesBento />
        <LiveBenchmark />
        <Pricing onOpenCheckout={handleOpenCheckout} />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Checkout & License Generation Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        selectedPlan={selectedPlan}
        billingCycle={billingCycle}
        price={planPrice}
      />
    </div>
  );
}

export default App;
