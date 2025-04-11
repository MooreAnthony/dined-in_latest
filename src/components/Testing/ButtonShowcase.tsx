const ButtonsShowcase = () => {
    return (
      <div className="p-6 bg-dark-secondary rounded-2xl shadow-dark-md text-white space-y-6">
        <h2 className="text-xl font-bold text-white">Button Styles</h2>
  
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* Primary */}
          <button className="bg-dark-accent text-white px-4 py-2 rounded-lg hover:bg-dark-accent/80 transition">
            Primary
          </button>
  
          {/* Secondary */}
          <button className="bg-dark-primary text-white px-4 py-2 rounded-lg hover:bg-dark-primary/80 transition">
            Secondary
          </button>
  
          {/* Outline */}
          <button className="border border-dark-border text-white px-4 py-2 rounded-lg hover:bg-dark-primary transition">
            Outline
          </button>
  
          {/* Ghost */}
          <button className="px-4 py-2 text-white rounded-lg hover:bg-dark-primary transition">
            Ghost
          </button>
  
          {/* Link */}
          <button className="text-dark-accent underline hover:text-white transition">
            Link
          </button>
  
          {/* Highlight (Gradient Outline) */}
          <button className="relative px-4 py-2 text-white rounded-lg overflow-hidden group">
            <span className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-dark-accent" />
            <span className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 animate-gradient rounded-lg group-hover:opacity-100 opacity-30 transition-all hover:brightness-110" />
            <span className="relative z-10">Highlight</span>
          </button>
        </div>
      </div>
    );
  };
  
  export default ButtonsShowcase;
  