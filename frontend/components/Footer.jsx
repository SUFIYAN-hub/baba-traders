export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h3 className="text-yellow-400 text-xl font-bold mb-2">🛍️ Baba Traders</h3>
          <p className="text-sm text-gray-300">
            Your trusted local shop in Pandharpur, now online. 
            Quality products at the best prices.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold text-yellow-400 mb-2">Categories</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            {['Watches','Belts','Clocks','Kitchen','Goggles','Wallets'].map(cat => (
              <li key={cat}>
                <a href={`/products?category=${cat.toLowerCase()}`}
                   className="hover:text-yellow-400 transition">
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-yellow-400 mb-2">Contact Us</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>📍 Pandharpur, Solapur, Maharashtra</li>
            <li>📞 Your phone number</li>
            <li>📧 admin@babatraders.com</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 py-4 border-t border-blue-800">
        © 2024 Baba Traders. All rights reserved.
      </div>
    </footer>
  );
}