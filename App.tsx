import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, Search, Settings, Car, FileText, ChevronRight, Gauge, Save, Loader2, Share2, Plus, Trash2, LogOut, Lock, User, ThermometerSnowflake, Info, ChevronLeft, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Vehicle, BlogPost } from './types';
import { INITIAL_VEHICLES, INITIAL_BLOG_POSTS } from './constants';
import { generateBlogContent, generateVehicleDescription } from './services/geminiService';
import SEO from './components/SEO';

// --- Shared UI Components ---
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' | 'danger' | 'secondary' }> = ({ className, variant = 'primary', ...props }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 shadow-lg hover:shadow-xl",
    secondary: "bg-slate-800 text-white hover:bg-slate-900 shadow-md",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
  };
  return <button className={`${baseStyle} ${variants[variant]} ${className || ''}`} {...props} />;
};

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className || ''}`}>{children}</div>
);

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span className={`px-2 py-1 rounded text-xs font-semibold ${className || 'bg-slate-100 text-slate-600'}`}>{children}</span>
);

// --- Login Page ---
const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('Hatalı kullanıcı adı veya şifre.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
      <SEO title="Yönetici Girişi" description="Admin paneli güvenli giriş." />
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-slate-100 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
         <div className="text-center mb-8">
           <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
             <Lock className="w-10 h-10 text-blue-600" />
           </div>
           <h1 className="text-2xl font-bold text-slate-900">Yönetici Paneli</h1>
           <p className="text-slate-500 text-sm mt-2">Sistem yönetimi için kimlik doğrulama gerekli.</p>
         </div>

         <form onSubmit={handleLogin} className="space-y-5">
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Kullanıcı Adı</label>
             <div className="relative group">
               <User className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
               <input 
                 type="text" 
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                 placeholder="admin"
               />
             </div>
           </div>
           
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Şifre</label>
             <div className="relative group">
               <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                 placeholder="••••••••"
               />
             </div>
           </div>

           {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium border border-red-100">{error}</div>}

           <Button type="submit" className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-none">
             Giriş Yap
           </Button>
         </form>
         
         <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
           Sistem Versiyonu v2.1.0 • Güvenli Bağlantı
         </div>
      </div>
    </div>
  );
};

// --- Layout ---
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-black text-2xl tracking-tight text-slate-900">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <Gauge className="w-6 h-6" />
            </div>
            <span>Lastik<span className="text-blue-600">Pro</span></span>
          </Link>
          
          <nav className="hidden md:flex gap-1 text-slate-600 font-medium">
            <Link to="/" className={`px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-all ${location.pathname === '/' ? 'text-blue-600 bg-blue-50' : ''}`}>Araç Arama</Link>
            <Link to="/blog" className={`px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-all ${location.pathname.includes('/blog') ? 'text-blue-600 bg-blue-50' : ''}`}>Blog & Rehber</Link>
            <Link to="/admin" className={`px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-all flex items-center gap-2 ${location.pathname.includes('/admin') ? 'text-blue-600 bg-blue-50' : ''}`}>
              <Settings className="w-4 h-4" /> Yönetim
            </Link>
          </nav>

          <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 flex flex-col gap-2 shadow-lg animate-in slide-in-from-top-2">
            <Link to="/" className="block py-3 px-4 rounded-lg hover:bg-slate-50 text-slate-600 font-medium">Araç Arama</Link>
            <Link to="/blog" className="block py-3 px-4 rounded-lg hover:bg-slate-50 text-slate-600 font-medium">Blog & Rehber</Link>
            <Link to="/admin" className="block py-3 px-4 rounded-lg hover:bg-slate-50 text-slate-600 font-medium">Yönetim</Link>
          </div>
        )}
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-16 mt-12 border-t border-slate-800">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-2xl text-white mb-6">
               <div className="bg-blue-600 text-white p-1 rounded-md">
                 <Gauge className="w-5 h-5" />
               </div>
              <span>LastikPro</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm mb-6">
              Sürücüler için en kapsamlı lastik basıncı ve bakım rehberi. Güvenliğiniz ve yakıt tasarrufunuz için verilerimizi sürekli güncelliyoruz.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 transition-colors flex items-center justify-center cursor-pointer">X</div>
               <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 transition-colors flex items-center justify-center cursor-pointer">In</div>
               <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 transition-colors flex items-center justify-center cursor-pointer">Fb</div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Hızlı Linkler</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Araç Arama</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Blog</Link></li>
              <li><Link to="/admin" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Yönetici Paneli</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Popüler Markalar</h3>
            <div className="flex flex-wrap gap-2 text-xs font-medium">
              {['Fiat', 'Renault', 'Toyota', 'Honda', 'BMW', 'Tesla', 'Ford', 'VW', 'Hyundai', 'Dacia'].map(b => (
                <Link to="/" key={b} className="bg-slate-800 hover:bg-slate-700 hover:text-white px-3 py-1.5 rounded transition-colors text-slate-300">{b}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <span>&copy; 2024 LastikPro Rehberi. Tüm hakları saklıdır.</span>
             <div className="flex gap-6">
               <a href="#" className="hover:text-white">Gizlilik Politikası</a>
               <a href="#" className="hover:text-white">Kullanım Şartları</a>
               <a href="#" className="hover:text-white">İletişim</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Home Component ---

const Home: React.FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const navigate = useNavigate();

  // Performance optimization: Memoize lists
  const makes = useMemo(() => Array.from(new Set(vehicles.map(v => v.make))).sort(), [vehicles]);
  
  const models = useMemo(() => {
    if (!selectedMake) return [];
    return Array.from(new Set(vehicles.filter(v => v.make === selectedMake).map(v => v.model))).sort();
  }, [vehicles, selectedMake]);

  const years = useMemo(() => {
    if (!selectedMake || !selectedModel) return [];
    return Array.from(new Set(vehicles.filter(v => v.make === selectedMake && v.model === selectedModel).map(v => v.year))).sort((a: number, b: number) => b - a);
  }, [vehicles, selectedMake, selectedModel]);

  const handleSearch = () => {
    if (selectedMake && selectedModel && selectedYear) {
      const vehicle = vehicles.find(v => v.make === selectedMake && v.model === selectedModel && v.year === Number(selectedYear));
      if (vehicle) {
        navigate(`/vehicle/${vehicle.id}`);
      }
    }
  };

  const recentVehicles = useMemo(() => vehicles.slice(0, 6), [vehicles]);

  return (
    <div className="space-y-16">
      <SEO 
        title="Araç Lastik Basıncı Arama Motoru" 
        description="Türkiye'nin en kapsamlı lastik basıncı veritabanı. Aracınız için en doğru PSI ve Bar değerleri." 
        schema={{ type: 'WebSite', data: { name: 'LastikPro' } }}
      />
      
      {/* Hero Section */}
      <div className="relative bg-[#0F172A] rounded-[2rem] overflow-hidden min-h-[500px] flex items-center justify-center p-8 shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
               <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
               Veritabanı Güncellendi • 2024 Verileri
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
              Aracınız İçin İdeal <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Lastik Basıncı</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              Doğru basınç hayat kurtarır ve yakıt tasarrufu sağlar. Marka model seçerek fabrika verilerine saniyeler içinde ulaşın.
            </p>

            {/* Glassmorphism Search Widget */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 md:p-3 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">
                <select 
                  className="bg-slate-900/80 text-white border-0 rounded-xl px-6 py-4 md:py-3 w-full outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-slate-800 transition-colors"
                  value={selectedMake}
                  onChange={(e) => { setSelectedMake(e.target.value); setSelectedModel(''); setSelectedYear(''); }}
                >
                  <option value="">Marka Seçiniz</option>
                  {makes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                
                <select 
                  className="bg-slate-900/80 text-white border-0 rounded-xl px-6 py-4 md:py-3 w-full outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  value={selectedModel}
                  onChange={(e) => { setSelectedModel(e.target.value); setSelectedYear(''); }}
                  disabled={!selectedMake}
                >
                  <option value="">Model</option>
                  {models.map(m => <option key={m} value={m}>{m}</option>)}
                </select>

                <select 
                  className="bg-slate-900/80 text-white border-0 rounded-xl px-6 py-4 md:py-3 w-full outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  disabled={!selectedModel}
                >
                  <option value="">Yıl</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>

                <button 
                  onClick={handleSearch}
                  disabled={!selectedYear}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 md:py-3 rounded-xl md:rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Search className="w-5 h-5" /> Bul
                </button>
            </div>
        </div>
      </div>

      {/* Features / Benefits */}
      <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
             <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4"><Gauge className="w-6 h-6"/></div>
             <h3 className="font-bold text-lg mb-2">Yakıt Tasarrufu</h3>
             <p className="text-slate-500 text-sm">Doğru basınç yuvarlanma direncini azaltarak %5'e varan yakıt tasarrufu sağlar.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
             <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4"><Share2 className="w-6 h-6"/></div>
             <h3 className="font-bold text-lg mb-2">Yol Tutuşu</h3>
             <p className="text-slate-500 text-sm">Virajlarda ve frenleme anında maksimum performans ve güvenlik sunar.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
             <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4"><Settings className="w-6 h-6"/></div>
             <h3 className="font-bold text-lg mb-2">Lastik Ömrü</h3>
             <p className="text-slate-500 text-sm">Eşit aşınma sağlayarak lastiklerinizin kullanım ömrünü %20'ye kadar uzatır.</p>
          </div>
      </div>

      {/* Quick Links / Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Car className="text-blue-600" /> Popüler Aramalar
            </h2>
            <Link to="#" className="text-blue-600 text-sm font-semibold hover:underline">Tümünü Gör</Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {recentVehicles.map(v => (
              <Link key={v.id} to={`/vehicle/${v.id}`} className="group block">
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group-hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-blue-600 mb-1">{v.make}</div>
                      <h3 className="font-bold text-slate-800 text-lg">{v.model}</h3>
                      <p className="text-sm text-slate-500 mt-1">{v.year} • {v.trim}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
               <FileText className="text-blue-600" /> Rehber
             </h2>
             <Link to="/blog" className="text-blue-600 text-sm font-semibold hover:underline">Blog'a Git</Link>
          </div>
          <div className="space-y-4">
            {INITIAL_BLOG_POSTS.slice(0, 3).map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                <article className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <span className="text-xs font-semibold text-slate-400 mb-2 block">{post.date}</span>
                  <h3 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const VehicleDetail: React.FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => {
  const { id } = useParams();
  const vehicle = vehicles.find(v => v.id === id);
  const [winterMode, setWinterMode] = useState(false);

  if (!vehicle) {
    return (
        <div className="text-center py-32">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Araç Bulunamadı</h2>
            <Link to="/" className="text-blue-600 hover:underline">Ana sayfaya dön</Link>
        </div>
    );
  }

  // Calculate PSI based on winter mode (+2 PSI rule of thumb)
  const calculatePressure = (base: number) => winterMode ? base + 2 : base;
  const calculateBar = (psi: number) => (psi * 0.0689476).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <SEO 
        title={`${vehicle.year} ${vehicle.make} ${vehicle.model} Lastik Basıncı`} 
        description={vehicle.description || `${vehicle.year} ${vehicle.make} ${vehicle.model} ön ve arka lastik basınç değerleri (PSI/Bar).`} 
        schema={{
          type: 'Product',
          data: {
            name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
            description: vehicle.description,
            make: vehicle.make
          }
        }}
      />

      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link to="/" className="hover:text-blue-600"><ChevronLeft className="w-4 h-4 inline" /> Geri Dön</Link>
        <span>/</span>
        <span className="font-semibold text-slate-900">{vehicle.make} {vehicle.model}</span>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 text-white p-8 md:p-12 relative overflow-hidden">
           {/* Decorative circles */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
           
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="inline-block bg-blue-600 text-xs font-bold px-2 py-1 rounded mb-2">{vehicle.year}</div>
                <h1 className="text-3xl md:text-5xl font-black mb-2">{vehicle.make} {vehicle.model}</h1>
                <p className="text-slate-300 text-lg flex items-center gap-4">
                    <span>{vehicle.trim}</span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                    <span>{vehicle.tireSize}</span>
                </p>
              </div>
              
              {/* Winter Mode Toggle */}
              <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/20 flex items-center gap-2">
                 <button 
                   onClick={() => setWinterMode(false)}
                   className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${!winterMode ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-300 hover:text-white'}`}
                 >
                    Yaz
                 </button>
                 <button 
                   onClick={() => setWinterMode(true)}
                   className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 ${winterMode ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-300 hover:text-white'}`}
                 >
                    <ThermometerSnowflake className="w-4 h-4" /> Kış
                 </button>
              </div>
           </div>
        </div>

        {winterMode && (
             <div className="bg-blue-50 border-b border-blue-100 p-4 flex items-center gap-3 text-blue-700 text-sm px-8 md:px-12">
                <Info className="w-5 h-5 flex-shrink-0" />
                <span>Kış modu aktif: Değerler güvenli sürüş için otomatik olarak +2 PSI artırılmıştır.</span>
             </div>
        )}

        <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8 bg-gradient-to-b from-slate-50 to-white">
          {/* Normal Load */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 relative group hover:border-blue-200 transition-colors">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-200 px-4 py-1 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wider shadow-sm">
                Normal Yük (1-2 Kişi)
            </div>
            <div className="mt-4 grid grid-cols-2 gap-8 text-center divide-x divide-slate-100">
               <div>
                  <span className="text-xs font-bold text-slate-400 uppercase block mb-2">Ön Lastik</span>
                  <div className={`text-4xl font-black ${winterMode ? 'text-blue-600' : 'text-slate-900'}`}>
                      {calculatePressure(vehicle.standardLoad.front)} <span className="text-sm font-medium text-slate-400">PSI</span>
                  </div>
                  <div className="text-sm font-medium text-slate-500 mt-1">{calculateBar(calculatePressure(vehicle.standardLoad.front))} Bar</div>
               </div>
               <div>
                  <span className="text-xs font-bold text-slate-400 uppercase block mb-2">Arka Lastik</span>
                  <div className={`text-4xl font-black ${winterMode ? 'text-blue-600' : 'text-slate-900'}`}>
                      {calculatePressure(vehicle.standardLoad.rear)} <span className="text-sm font-medium text-slate-400">PSI</span>
                  </div>
                  <div className="text-sm font-medium text-slate-500 mt-1">{calculateBar(calculatePressure(vehicle.standardLoad.rear))} Bar</div>
               </div>
            </div>
          </div>

          {/* Max Load */}
          <div className="bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-700 relative text-white">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 border border-slate-600 px-4 py-1 rounded-full text-xs font-bold text-slate-300 uppercase tracking-wider shadow-sm">
                Tam Yük (Yolcu + Bavul)
            </div>
             <div className="mt-4 grid grid-cols-2 gap-8 text-center divide-x divide-slate-700">
               <div>
                  <span className="text-xs font-bold text-slate-400 uppercase block mb-2">Ön Lastik</span>
                  <div className="text-4xl font-black text-white">
                      {calculatePressure(vehicle.maxLoad.front)} <span className="text-sm font-medium text-slate-500">PSI</span>
                  </div>
                  <div className="text-sm font-medium text-slate-400 mt-1">{calculateBar(calculatePressure(vehicle.maxLoad.front))} Bar</div>
               </div>
               <div>
                  <span className="text-xs font-bold text-slate-400 uppercase block mb-2">Arka Lastik</span>
                  <div className="text-4xl font-black text-white">
                      {calculatePressure(vehicle.maxLoad.rear)} <span className="text-sm font-medium text-slate-500">PSI</span>
                  </div>
                  <div className="text-sm font-medium text-slate-400 mt-1">{calculateBar(calculatePressure(vehicle.maxLoad.rear))} Bar</div>
               </div>
            </div>
          </div>
        </div>

        {vehicle.description && (
          <div className="px-8 md:px-12 pb-12 border-t border-slate-100 pt-8">
             <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600"/> Editörün Notu
             </h3>
             <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">{vehicle.description}</p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Info className="w-4 h-4 text-blue-500"/> {vehicle.make} {vehicle.model} Lastik Basıncı</h4>
                <p className="text-slate-600 text-sm">
                    {vehicle.year} model {vehicle.make} {vehicle.model} ({vehicle.trim}) için ideal ön lastik basıncı normal yükte {vehicle.standardLoad.front} PSI, arka lastik basıncı ise {vehicle.standardLoad.rear} PSI seviyesindedir.
                </p>
            </Card>
            <Card className="p-6">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><ThermometerSnowflake className="w-4 h-4 text-blue-500"/> Kışın Ne Yapmalı?</h4>
                <p className="text-slate-600 text-sm">
                    Kış aylarında hava sıcaklığı düştüğünde lastik içindeki hava büzülür. Güvenlik için yukarıdaki "Kış Modu"nu aktif ederek +2 PSI değerini uygulayabilirsiniz.
                </p>
            </Card>
      </div>
    </div>
  );
};

const BlogList: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="Blog & Rehber" description="Lastik bakımı, güvenli sürüş teknikleri ve otomobil dünyasından ipuçları." />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Otomobil Rehberi</h1>
        <p className="text-slate-500 max-w-xl mx-auto">Uzman editörlerimizden lastik bakımı, sürüş güvenliği ve araç performansı hakkında en güncel ipuçları.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className={`group block ${index === 0 ? 'md:col-span-2' : ''}`}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200">
                <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
                        <span className="px-2 py-1 bg-blue-50 rounded">Rehber</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-400">{post.date}</span>
                    </div>
                    <h2 className={`font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                        {post.title}
                    </h2>
                    <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center text-blue-600 font-bold text-sm">
                        Devamını Oku <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

const BlogPostDetail: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) return <div className="text-center py-20">Yazı bulunamadı.</div>;

  return (
    <article className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <SEO 
        title={post.title} 
        description={post.excerpt}
        schema={{ type: 'Article', data: post }}
      />
      <div className="bg-slate-50 p-8 md:p-12 border-b border-slate-100 text-center">
         <div className="inline-flex items-center gap-2 text-sm text-slate-500 mb-4">
            <span>{post.date}</span>
            <span>•</span>
            <span className="text-blue-600 font-medium">5 dk okuma</span>
         </div>
         <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">{post.title}</h1>
         <p className="text-slate-600 text-lg max-w-xl mx-auto">{post.excerpt}</p>
      </div>

      <div className="p-8 md:p-12">
        <div className="prose prose-blue prose-lg text-slate-600 max-w-none whitespace-pre-line first-letter:text-5xl first-letter:font-bold first-letter:text-slate-900 first-letter:float-left first-letter:mr-3">
            {post.content}
        </div>
      
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
            <Link to="/blog" className="text-slate-500 font-medium hover:text-slate-900 flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Tüm Yazılar
            </Link>
            <div className="flex gap-2">
                <Button variant="ghost" className="rounded-full w-10 h-10 p-0"><Share2 className="w-4 h-4" /></Button>
            </div>
        </div>
      </div>
    </article>
  );
};

// --- Internal Admin Components ---

// Separate component for vehicle table to handle pagination and filtering independently
const AdminVehicleTable: React.FC<{ 
    vehicles: Vehicle[], 
    onDelete: (id: string) => void 
}> = ({ vehicles, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter and Memoize
    const filteredVehicles = useMemo(() => {
        return vehicles.filter(v => 
            v.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
            v.model.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [vehicles, searchTerm]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
    const currentData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredVehicles.slice(start, start + itemsPerPage);
    }, [filteredVehicles, currentPage]);

    return (
        <div className="space-y-4">
            <div className="flex gap-4 mb-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Araç marka veya model ara..." 
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <div className="text-sm text-slate-500 flex items-center">
                    Top. {filteredVehicles.length} Araç
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-semibold text-slate-700">Marka / Model</th>
                      <th className="p-4 font-semibold text-slate-700">Yıl / Donanım</th>
                      <th className="p-4 font-semibold text-slate-700">Lastik Ebat</th>
                      <th className="p-4 font-semibold text-slate-700 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentData.length > 0 ? currentData.map(v => (
                      <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                            <div className="font-bold text-slate-900">{v.make}</div>
                            <div className="text-slate-600">{v.model}</div>
                        </td>
                        <td className="p-4 text-slate-500">
                            <div>{v.year}</div>
                            <div className="text-xs">{v.trim}</div>
                        </td>
                        <td className="p-4 text-slate-500 font-mono text-xs bg-slate-50 rounded px-2 py-1 w-fit">{v.tireSize}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => onDelete(v.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group" title="Sil">
                             <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>
                        </td>
                      </tr>
                    )) : (
                        <tr>
                            <td colSpan={4} className="p-8 text-center text-slate-500">Sonuç bulunamadı.</td>
                        </tr>
                    )}
                  </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                    <Button 
                        variant="ghost" 
                        disabled={currentPage === 1} 
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="p-2"
                    >
                        &lt;
                    </Button>
                    <span className="text-sm font-medium text-slate-600">
                        Sayfa {currentPage} / {totalPages}
                    </span>
                    <Button 
                        variant="ghost" 
                        disabled={currentPage === totalPages} 
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="p-2"
                    >
                        &gt;
                    </Button>
                </div>
            )}
        </div>
    );
};

const AdminPanel: React.FC<{ 
  vehicles: Vehicle[], 
  addVehicle: (v: Vehicle) => void,
  deleteVehicle: (id: string) => void,
  posts: BlogPost[],
  addPost: (p: BlogPost) => void,
  deletePost: (id: string) => void,
  onLogout: () => void
}> = ({ vehicles, addVehicle, deleteVehicle, posts, addPost, deletePost, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'vehicles' | 'blog'>('dashboard');
  const [loading, setLoading] = useState(false);
  
  // Blog form state
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');

  // Vehicle form state
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    make: '', model: '', year: 2024, standardLoad: {front: 32, rear: 32, frontBar: 2.2, rearBar: 2.2}, maxLoad: {front: 35, rear: 35, frontBar: 2.4, rearBar: 2.4}
  });

  const handleGenerateBlog = async () => {
    if (!blogTitle) return;
    setLoading(true);
    const content = await generateBlogContent(blogTitle);
    setBlogContent(content);
    setLoading(false);
  };

  const handleSaveBlog = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      slug: blogTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
      title: blogTitle,
      content: blogContent,
      excerpt: blogContent.slice(0, 100) + '...',
      date: new Date().toISOString().split('T')[0]
    };
    addPost(newPost);
    alert('Blog yazısı eklendi!');
    setBlogTitle('');
    setBlogContent('');
  };

  const handleSaveVehicle = async () => {
    if(!newVehicle.make || !newVehicle.model) return;
    setLoading(true);
    
    // AI Enhancement
    const description = await generateVehicleDescription(newVehicle.make, newVehicle.model, newVehicle.year || 2024);

    const v: Vehicle = {
      id: `${newVehicle.make}-${newVehicle.model}-${newVehicle.year}`.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
      make: newVehicle.make,
      model: newVehicle.model,
      year: newVehicle.year || 2024,
      trim: newVehicle.trim || 'Standart',
      tireSize: newVehicle.tireSize || '205/55 R16',
      standardLoad: newVehicle.standardLoad!,
      maxLoad: newVehicle.maxLoad!,
      description: description
    } as Vehicle;

    addVehicle(v);
    setLoading(false);
    alert('Araç eklendi!');
  };

  // Stats
  const makeStats = useMemo(() => {
    const counts: Record<string, number> = {};
    vehicles.forEach(v => { counts[v.make] = (counts[v.make] || 0) + 1; });
    return Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a,b) => b.count - a.count).slice(0, 8);
  }, [vehicles]);

  const pieData = [
      { name: 'Yayınlanan', value: posts.length },
      { name: 'Taslak', value: 2 }, 
  ];
  const COLORS = ['#0088FE', '#FFBB28'];

  return (
    <div className="grid md:grid-cols-5 gap-8">
       <SEO title="Yönetim Paneli" description="Site içerik yönetimi." />
       
       {/* Sidebar */}
      <div className="md:col-span-1 space-y-2">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">A</div>
                <div>
                    <div className="font-bold text-sm">Admin</div>
                    <div className="text-xs text-green-500">Çevrimiçi</div>
                </div>
            </div>
        </div>

        <nav className="space-y-1">
            <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Settings className="w-4 h-4" /> Genel Bakış
            </button>
            <button onClick={() => setActiveTab('vehicles')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'vehicles' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Car className="w-4 h-4" /> Araçlar
            </button>
            <button onClick={() => setActiveTab('blog')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'blog' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                <FileText className="w-4 h-4" /> Blog & İçerik
            </button>
        </nav>

        <div className="pt-8 mt-8 border-t border-slate-200">
           <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors">
               <LogOut className="w-4 h-4" /> Çıkış Yap
           </button>
        </div>
      </div>

      <div className="md:col-span-4">
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Panel Özeti</h2>
                <span className="text-sm text-slate-500">{new Date().toLocaleDateString('tr-TR')}</span>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <Card className="p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                 <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                 <div className="relative z-10">
                    <div className="text-slate-500 text-sm font-medium mb-1">Toplam Araç</div>
                    <div className="text-4xl font-black text-slate-900">{vehicles.length}</div>
                    <div className="text-xs text-green-600 mt-2 flex items-center gap-1">
                        <span className="bg-green-100 px-1.5 py-0.5 rounded">+12%</span> geçen hafta
                    </div>
                 </div>
              </Card>
              <Card className="p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                 <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                 <div className="relative z-10">
                    <div className="text-slate-500 text-sm font-medium mb-1">Blog Yazıları</div>
                    <div className="text-4xl font-black text-slate-900">{posts.length}</div>
                    <div className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                        <span className="bg-blue-100 px-1.5 py-0.5 rounded">Aktif</span> yayında
                    </div>
                 </div>
              </Card>
              <Card className="p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                 <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                 <div className="relative z-10">
                    <div className="text-slate-500 text-sm font-medium mb-1">Sistem Durumu</div>
                    <div className="text-xl font-bold text-green-600 mt-2">Tüm Servisler Aktif</div>
                    <div className="text-xs text-slate-400 mt-1">Gemini AI API: Bağlı</div>
                 </div>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 md:col-span-2 h-96">
                    <h3 className="font-bold mb-6 text-slate-800">En Çok Eklenen Markalar</h3>
                    <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={makeStats}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                    </ResponsiveContainer>
                </Card>
                <Card className="p-6 h-96 flex flex-col">
                    <h3 className="font-bold mb-4 text-slate-800">İçerik Dağılımı</h3>
                    <div className="flex-grow flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center text-sm text-slate-500">
                        Blog Yazısı vs Taslak
                    </div>
                </Card>
            </div>
          </div>
        )}

        {activeTab === 'vehicles' && (
          <div className="space-y-8 animate-in fade-in">
            <Card className="p-6 space-y-6 border-l-4 border-l-blue-600">
              <div className="flex items-center justify-between">
                 <h2 className="text-xl font-bold flex items-center gap-2"><Plus className="w-5 h-5 text-blue-600" /> Hızlı Araç Ekle</h2>
                 <Badge className="bg-blue-100 text-blue-700">AI Destekli</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input placeholder="Marka (Toyota)" className="border border-slate-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setNewVehicle({...newVehicle, make: e.target.value})} />
                <input placeholder="Model (Corolla)" className="border border-slate-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setNewVehicle({...newVehicle, model: e.target.value})} />
                <input type="number" placeholder="Yıl (2024)" className="border border-slate-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setNewVehicle({...newVehicle, year: parseInt(e.target.value)})} />
                <input placeholder="Donanım (1.6 Vision)" className="border border-slate-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setNewVehicle({...newVehicle, trim: e.target.value})} />
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                 <h3 className="text-xs font-bold uppercase text-slate-500 mb-3">Basınç Değerleri (PSI)</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div>
                        <label className="text-xs text-slate-400 mb-1 block">Ön (Normal)</label>
                        <input type="number" className="w-full border border-slate-200 p-2 rounded text-sm" onChange={e => setNewVehicle({...newVehicle, standardLoad: {...newVehicle.standardLoad!, front: parseInt(e.target.value)}})} />
                   </div>
                   <div>
                        <label className="text-xs text-slate-400 mb-1 block">Arka (Normal)</label>
                        <input type="number" className="w-full border border-slate-200 p-2 rounded text-sm" onChange={e => setNewVehicle({...newVehicle, standardLoad: {...newVehicle.standardLoad!, rear: parseInt(e.target.value)}})} />
                   </div>
                   <div>
                        <label className="text-xs text-slate-400 mb-1 block">Ön (Yüklü)</label>
                        <input type="number" className="w-full border border-slate-200 p-2 rounded text-sm" onChange={e => setNewVehicle({...newVehicle, maxLoad: {...newVehicle.maxLoad!, front: parseInt(e.target.value)}})} />
                   </div>
                   <div>
                        <label className="text-xs text-slate-400 mb-1 block">Arka (Yüklü)</label>
                        <input type="number" className="w-full border border-slate-200 p-2 rounded text-sm" onChange={e => setNewVehicle({...newVehicle, maxLoad: {...newVehicle.maxLoad!, rear: parseInt(e.target.value)}})} />
                   </div>
                 </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveVehicle} disabled={loading} className="w-full md:w-auto">
                    {loading ? <Loader2 className="animate-spin" /> : <Save className="w-4 h-4" />} Kaydet ve AI Açıklama Üret
                </Button>
              </div>
            </Card>

            <div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Araç Listesi Yönetimi</h3>
              {/* Uses the optimized internal component */}
              <AdminVehicleTable vehicles={vehicles} onDelete={deleteVehicle} />
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="space-y-8 animate-in fade-in">
            <Card className="p-6 space-y-4 border-l-4 border-l-green-600">
               <div className="flex items-center justify-between">
                 <h2 className="text-xl font-bold flex items-center gap-2"><Plus className="w-5 h-5 text-green-600" /> AI Blog Asistanı</h2>
                 <Badge className="bg-green-100 text-green-700">Gemini 3 Flash</Badge>
               </div>
               
               <div className="flex gap-2">
                 <input 
                   className="flex-grow border border-slate-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500 transition-shadow" 
                   placeholder="Konu başlığı girin (örn: Kış Lastiği Faydaları)" 
                   value={blogTitle}
                   onChange={e => setBlogTitle(e.target.value)}
                 />
                 <Button onClick={handleGenerateBlog} disabled={loading || !blogTitle} className="bg-green-600 hover:bg-green-700 shadow-green-200">
                   {loading ? <Loader2 className="animate-spin" /> : 'AI ile Yaz'}
                 </Button>
               </div>
               
               <div className="relative">
                   <div className="absolute top-2 right-2 text-xs text-slate-400">Markdown Destekli</div>
                   <textarea 
                    className="w-full border border-slate-200 p-4 rounded-lg h-64 outline-none focus:ring-2 focus:ring-green-500 font-mono text-sm leading-relaxed resize-none" 
                    placeholder="İçerik burada görünecek..."
                    value={blogContent}
                    onChange={e => setBlogContent(e.target.value)}
                    />
               </div>
               
               <Button onClick={handleSaveBlog} className="w-full bg-green-600 hover:bg-green-700 shadow-green-200" disabled={!blogContent}>
                 <Plus className="w-4 h-4" /> Yazıyı Yayınla
               </Button>
            </Card>

            <div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">İçerik Arşivi</h3>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-semibold text-slate-700">Başlık</th>
                      <th className="p-4 font-semibold text-slate-700">Tarih</th>
                      <th className="p-4 font-semibold text-slate-700 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {posts.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-medium text-slate-900">{p.title}</td>
                        <td className="p-4 text-slate-500">{p.date}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => deletePost(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group" title="Sil">
                             <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  
  // Auth state persisted in local storage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAdmin', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdmin');
  };

  const addVehicle = (v: Vehicle) => setVehicles(prev => [...prev, v]);
  const deleteVehicle = (id: string) => setVehicles(prev => prev.filter(v => v.id !== id));
  
  const addPost = (p: BlogPost) => setPosts(prev => [p, ...prev]);
  const deletePost = (id: string) => setPosts(prev => prev.filter(p => p.id !== id));

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home vehicles={vehicles} />} />
          <Route path="/vehicle/:id" element={<VehicleDetail vehicles={vehicles} />} />
          <Route path="/blog" element={<BlogList posts={posts} />} />
          <Route path="/blog/:slug" element={<BlogPostDetail posts={posts} />} />
          <Route 
            path="/admin" 
            element={
              isAuthenticated ? (
                <AdminPanel 
                  vehicles={vehicles} 
                  addVehicle={addVehicle} 
                  deleteVehicle={deleteVehicle}
                  posts={posts} 
                  addPost={addPost} 
                  deletePost={deletePost}
                  onLogout={handleLogout}
                />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            } 
          />
        </Routes>
      </Layout>
    </HashRouter>
  );
}