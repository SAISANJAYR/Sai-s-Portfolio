import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen flex flex-col justify-between">
      <div className="max-w-2xl mx-auto px-6 w-full flex-grow flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-display text-charcoal mb-8 text-center">
          Contact
        </h1>
        <p className="text-graymid text-lg leading-relaxed text-center mb-16 max-w-md mx-auto">
          If something here resonated with you, I'd love to hear your story too.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="space-y-4">
            <h2 className="text-sm tracking-widest uppercase text-graymid mb-6">Links</h2>
            <a href="mailto:saisanjay024@gmail.com" className="block glass p-6 rounded-xl hover:bg-white/50 transition-all hover:-translate-y-1">
              <div className="text-xs uppercase tracking-widest text-graymid mb-2">Email</div>
              <div className="text-charcoal font-medium">saisanjay024@gmail.com</div>
            </a>
            <a href="https://www.linkedin.com/in/saisanjay-r-79513132a" target="_blank" rel="noopener noreferrer" className="block glass p-6 rounded-xl hover:bg-white/50 transition-all hover:-translate-y-1">
              <div className="text-xs uppercase tracking-widest text-graymid mb-2">LinkedIn</div>
              <div className="text-charcoal font-medium">saisanjay-r</div>
            </a>
            <a href="https://github.com/SAISANJAYR" target="_blank" rel="noopener noreferrer" className="block glass p-6 rounded-xl hover:bg-white/50 transition-all hover:-translate-y-1">
              <div className="text-xs uppercase tracking-widest text-graymid mb-2">GitHub</div>
              <div className="text-charcoal font-medium">SAISANJAYR</div>
            </a>
          </div>

          <div>
            <h2 className="text-sm tracking-widest uppercase text-graymid mb-6">Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest text-graymid mb-2">Name</label>
                <input type="text" id="name" className="w-full glass bg-transparent px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-graymid/50 text-charcoal" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-graymid mb-2">Email</label>
                <input type="email" id="email" className="w-full glass bg-transparent px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-graymid/50 text-charcoal" />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-graymid mb-2">Message</label>
                <textarea id="message" rows={4} className="w-full glass bg-transparent px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-graymid/50 text-charcoal resize-none" />
              </div>
              <button type="button" className="w-full px-6 py-4 bg-charcoal text-offwhite rounded-lg text-sm font-medium hover:bg-brand-black transition-colors shadow-lg">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}
