export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">ELEVATE</h3>
            <p className="text-sm text-muted-foreground">
              Elevating creators and brands through transparent credibility ratings and opportunities.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-foreground">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/about" className="hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 ELEVATE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
