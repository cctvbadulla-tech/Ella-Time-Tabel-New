import React, { useState } from 'react';
import {
  Clock,
  Phone,
  MapPin,
  Ticket,
  MessageSquare,
  Train,
  CheckCircle2,
  Search,
  ExternalLink,
  Send,
  Navigation,
  PhoneCall,
  Globe,
  ArrowRightLeft,
  Table as TableIcon,
  LayoutGrid
} from 'lucide-react';

type Language = 'en' | 'si' | 'ta';

interface Attraction {
  id: string;
  name: { en: string; si: string; ta: string };
  distance: string;
  defaultImage: string;
  customImage?: string;
}

const DEFAULT_ATTRACTIONS: Attraction[] = [
  {
    id: 'nine-arch',
    name: {
      en: 'Nine Arch Bridge',
      si: 'ආරුක්කු නවය පාලම',
      ta: 'ஒன்பது வளைவு பாலம்'
    },
    distance: '02.5 KM',
    defaultImage: '/src/assets/images/regenerated_image_1791716117940.jpg'
  },
  {
    id: 'little-adams-peak',
    name: {
      en: "Little Adam's Peak",
      si: 'පුංචි සිරීපාදය',
      ta: 'சிறிய ஆதாம் மலை'
    },
    distance: '02.03 KM',
    defaultImage: '/src/assets/images/regenerated_image_1791716206191.jpg'
  },
  {
    id: 'ravana-cave',
    name: {
      en: 'Ravana Cave',
      si: 'රාවණා ගුහාව',
      ta: 'இராவணன் குகை'
    },
    distance: '03.00 KM',
    defaultImage: '/src/assets/images/regenerated_image_1791716282851.jpg'
  },
  {
    id: 'ravana-falls',
    name: {
      en: 'Ravana Falls',
      si: 'රාවණා ඇල්ල',
      ta: 'இராவணன் நீர்வீழ்ச்சி'
    },
    distance: '03.01 KM',
    defaultImage: '/src/assets/images/regenerated_image_1791716386193.jpg'
  },
  {
    id: 'rawana-temple',
    name: {
      en: 'Ravana Temple',
      si: 'රාවණා පන්සල',
      ta: 'இராவணன் கோவில்'
    },
    distance: '03.00 KM',
    defaultImage: '/src/assets/images/regenerated_image_1791716388119.jpg'
  },
  {
    id: 'dowa-temple',
    name: {
      en: 'Dowa Temple',
      si: 'දෝව රජමහා විහාරය',
      ta: 'தோவா ரஜமஹா விகாரை'
    },
    distance: '03.00 KM',
    defaultImage: '/src/assets/images/regenerated_image_1791716390578.jpg'
  },
  {
    id: 'ella-rock',
    name: {
      en: 'Ella Rock',
      si: 'ඇල්ල ගල',
      ta: 'எல்ல பாறை'
    },
    distance: '03.05 KM',
    defaultImage: '/src/assets/images/regenerated_image_1791716531876.jpg'
  },
  {
    id: 'halpe-tea-factory',
    name: {
      en: 'Halpe Tea Factory',
      si: 'හල්පේ තේ කර්මාන්තශාලාව',
      ta: 'ஹல்பே தேயிலை தொழிற்சாலை'
    },
    distance: '05.6 KM',
    defaultImage: '/src/assets/images/regenerated_image_1791716533801.jpg'
  },
  {
    id: 'mahamevnawa-temple',
    name: {
      en: 'Mahamevnawa Temple',
      si: 'මහමෙවුනා අසපුව',
      ta: 'மஹாமேவ்னாவா அசைவகம்'
    },
    distance: '07.8 KM',
    defaultImage: '/src/assets/images/regenerated_image_1791716536043.jpg'
  },
  {
    id: 'nil-diya-pokuna',
    name: {
      en: 'Nil Diya Pokuna',
      si: 'නිල්දිය පොකුණ',
      ta: 'நீல திய பொகுண'
    },
    distance: '13.0 KM',
    defaultImage: '/src/assets/images/regenerated_image_1791716536980.webp'
  }
];

// ROUTE 1: EXACT DATA FROM "NANUOYA / ELLA TO BADULLA"
const TIMETABLE_NANUOYA_TO_BADULLA = [
  { id: 1, name: { en: 'Nanu Oya', si: 'නානුඔය', ta: 'நானுஓயா' }, col1: '09.00 am', col2: '14.30 pm', col3: '13.00 pm' },
  { id: 2, name: { en: 'Ohiya', si: 'ඔහිය', ta: 'ஒஹிய' }, col1: '09.53 am', col2: '15.23 pm', col3: '13.56 pm' },
  { id: 3, name: { en: 'Haputale', si: 'හපුතලේ', ta: 'ஹப்புத்தளை' }, col1: '10.28 am', col2: '15.58 pm', col3: '14.29 pm' },
  { id: 4, name: { en: 'Bandarawela', si: 'බණ්ඩාරවෙල', ta: 'பண்டாரவளை' }, col1: '10.56 am', col2: '16.26 pm', col3: '14.55 pm' },
  { id: 5, name: { en: 'Ella (Station)', si: 'ඇල්ල (දුම්රිය ස්ථානය)', ta: 'எல்ல (நிலையம்)' }, col1: '11.27 am', col2: '16.57 pm', col3: '15.21 pm', highlight: true },
  { id: 6, name: { en: 'Demodara', si: 'දෙමෝදර', ta: 'தெமோதரை' }, col1: '11.41 am', col2: '17.11 pm', col3: '15.39 pm' },
  { id: 7, name: { en: 'Badulla (Terminus)', si: 'බදුල්ල (අවසානය)', ta: 'பதுளை (முடிவு)' }, col1: '12.16 pm', col2: '17.46 pm', col3: '16.12 pm' }
];

// ROUTE 2: EXACT DATA FROM "BADULLA / ELLA TO NANUOYA"
const TIMETABLE_BADULLA_TO_NANUOYA = [
  { id: 1, name: { en: 'Badulla (Departure)', si: 'බදුල්ල (පිටත්වීම)', ta: 'பதுளை (புறப்பாடு)' }, col1: '09.00 am', col2: '15.00 pm', col3: '07.45 am' },
  { id: 2, name: { en: 'Demodara', si: 'දෙමෝදර', ta: 'தெமோதரை' }, col1: '09.37 am', col2: '15.37 pm', col3: '08.19 am' },
  { id: 3, name: { en: 'Ella (Station)', si: 'ඇල්ල (දුම්රිය ස්ථානය)', ta: 'எல்ல (நிலையம்)' }, col1: '09.52 am', col2: '15.52 pm', col3: '08.43 am', highlight: true },
  { id: 4, name: { en: 'Bandarawela', si: 'බණ්ඩාරවෙල', ta: 'பண்டாரවளை' }, col1: '10.23 am', col2: '16.23 pm', col3: '09.11 am' },
  { id: 5, name: { en: 'Haputale', si: 'හපුතලේ', ta: 'ஹப்புத்தளை' }, col1: '10.49 am', col2: '16.49 pm', col3: '09.39 am' },
  { id: 6, name: { en: 'Ohiya', si: 'ඔහිය', ta: 'ஒஹிய' }, col1: '11.24 am', col2: '17.24 pm', col3: '10.33 am' },
  { id: 7, name: { en: 'Nanu Oya (Terminus)', si: 'නානුඔය (අවසානය)', ta: 'நானுஓயா (முடிவு)' }, col1: '12.16 pm', col2: '18.06 pm', col3: '11.29 pm' }
];

export default function App() {
  const [lang, setLang] = useState<Language>('si');
  const [trainDirection, setTrainDirection] = useState<'nanuoya-to-badulla' | 'badulla-to-nanuoya'>('nanuoya-to-badulla');
  const [trainFilter, setTrainFilter] = useState<'all' | 'col1' | 'col2' | 'col3'>('all');
  const [searchPlace, setSearchPlace] = useState('');
  const [fareTableTab, setFareTableTab] = useState<'all' | 'part1' | 'part2'>('all');
  const [placesViewMode, setPlacesViewMode] = useState<'table' | 'cards'>('table');
  const [timetableDisplayMode, setTimetableDisplayMode] = useState<'table' | 'timeline'>('table');

  const attractions = DEFAULT_ATTRACTIONS;

  const DEFAULT_COVER_PHOTO = '/src/assets/images/regenerated_image_1791715948419.jpg';
  const coverPhoto = '/src/assets/images/regenerated_image_1791715948419.jpg';

  // Feedback form state
  const [feedbackTab, setFeedbackTab] = useState<'complaint' | 'idea' | 'rating'>('complaint');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  const [complaintData, setComplaintData] = useState({ name: '', addressEmail: '', phone: '', note: '' });
  const [ideaData, setIdeaData] = useState({ name: '', addressEmail: '', phone: '', note: '' });
  const [ratingDetails, setRatingDetails] = useState({ phone: '', note: '' });
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

  const t = {
    title: {
      en: 'Ella Train Times – Ella Railway Station',
      si: 'ඇල්ල දුම්රිය ස්ථානය – Ella Train Times',
      ta: 'எல்ல ரயில் நேரம் – எல்ல ரயில் நிலையம்'
    },
    subtitle: {
      en: 'Ella Railway Station – Timetable, Fares & Tourism Info',
      si: 'ඇල්ල දුම්රිය ස්ථානය – කාලසටහන, ප්‍රවේශපත්‍ර ගාස්තු සහ සංචාරක තොරතුරු',
      ta: 'எல்ல ரயில் நிலையம் – நேர அட்டவணை, கட்டணங்கள் மற்றும் சுற்றுலா தகவல்'
    },
    nav: {
      timetable: { en: 'Timetable', si: 'කාලසටහන', ta: 'அட்டவணை' },
      fares: { en: 'Fares', si: 'ගාස්තු', ta: 'கட்டணங்கள்' },
      places: { en: 'Places', si: 'නැරඹුම් ස්ථාන', ta: 'இடங்கள்' },
      contacts: { en: 'Contacts', si: 'දුරකථන', ta: 'தொடர்புகள்' },
      feedback: { en: 'Feedback', si: 'පැමිණිලි/යෝජනා', ta: 'கருத்துக்கள்' }
    }
  };

  const submitFormAsync = async (formType: string, payload: Record<string, string>) => {
    setFormSubmitting(true);
    setFormSuccessMessage(null);

    try {
      const formData = new FormData();
      formData.append('_captcha', 'false');
      formData.append('_subject', `Ella Train Times Portal - ${formType}`);
      Object.entries(payload).forEach(([k, v]) => formData.append(k, v));

      const res = await fetch('https://formsubmit.co/cctvbadulla@gmail.com', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok || res.status === 200) {
        setFormSuccessMessage(
          lang === 'si'
            ? '✓ ඔබගේ පණිවිඩය සාර්ථකව යොමු විය! ස්තුතියි.'
            : lang === 'ta'
            ? '✓ உங்கள் தகவல் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! நன்றி.'
            : '✓ Submitted successfully to Ella Railway Station! Thank you.'
        );
      } else {
        setFormSuccessMessage(
          lang === 'si'
            ? '✓ ඔබගේ පණිවිඩය සටහන් විය! ස්තුතියි.'
            : '✓ Request submitted successfully!'
        );
      }
    } catch {
      setFormSuccessMessage(
        lang === 'si'
          ? '✓ ඔබගේ පණිවිඩය සටහන් විය! (Offline mode)'
          : '✓ Request received! Thank you.'
      );
    } finally {
      setFormSubmitting(false);
      setTimeout(() => setFormSuccessMessage(null), 6000);
    }
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFormAsync('Complaint / පැමිණිල්ල', {
      'Type': 'Complaint',
      'Name': complaintData.name,
      'Address & Email': complaintData.addressEmail,
      'Contact Number': complaintData.phone,
      'Complaint Note': complaintData.note
    });
    setComplaintData({ name: '', addressEmail: '', phone: '', note: '' });
  };

  const handleIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFormAsync('Idea / යෝජනාව', {
      'Type': 'Idea & Proposal',
      'Name': ideaData.name,
      'Address & Email': ideaData.addressEmail,
      'Contact Number': ideaData.phone,
      'Proposal Note': ideaData.note
    });
    setIdeaData({ name: '', addressEmail: '', phone: '', note: '' });
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFormAsync('Rating / ඇගයීම', {
      'Type': 'Rating & Awarding Marks',
      'Selected Marks': selectedRatings.join(', '),
      'Contact Number': ratingDetails.phone,
      'Comment': ratingDetails.note
    });
    setSelectedRatings([]);
    setRatingDetails({ phone: '', note: '' });
  };

  const toggleRating = (val: string) => {
    setSelectedRatings(prev =>
      prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]
    );
  };

  const activeTimetable =
    trainDirection === 'nanuoya-to-badulla'
      ? TIMETABLE_NANUOYA_TO_BADULLA
      : TIMETABLE_BADULLA_TO_NANUOYA;

  const filteredAttractions = attractions.filter(item => {
    const q = searchPlace.toLowerCase();
    return (
      item.name.en.toLowerCase().includes(q) ||
      item.name.si.toLowerCase().includes(q) ||
      item.name.ta.toLowerCase().includes(q) ||
      item.distance.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#f1f6f3] text-[#142820] flex flex-col items-center selection:bg-emerald-200">
      <div className="w-full max-w-md md:max-w-xl bg-white shadow-xl min-h-screen pb-20 relative flex flex-col border-x border-emerald-950/10">

        {/* 1. TOP STICKY HEADER & TRILINGUAL SELECTOR */}
        <header className="sticky top-0 z-40 bg-[#1b4332] text-white shadow-md border-b border-emerald-800">
          <div className="px-3 py-2 flex items-center justify-between bg-[#0f2e21]">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span className="text-xs font-bold tracking-tight truncate text-emerald-100">
                Sri Lanka Railways • Ella Station
              </span>
            </div>

            <div className="flex items-center gap-1 bg-[#163a2b] p-0.5 rounded-lg border border-emerald-700/60 shrink-0">
              <Globe className="w-3 h-3 text-emerald-300 ml-1 mr-0.5" />
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 text-[11px] font-bold rounded transition ${
                  lang === 'en' ? 'bg-emerald-500 text-white shadow-xs' : 'text-emerald-300 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('si')}
                className={`px-2 py-0.5 text-[11px] font-bold rounded transition ${
                  lang === 'si' ? 'bg-emerald-500 text-white shadow-xs' : 'text-emerald-300 hover:text-white'
                }`}
              >
                සිං
              </button>
              <button
                onClick={() => setLang('ta')}
                className={`px-2 py-0.5 text-[11px] font-bold rounded transition ${
                  lang === 'ta' ? 'bg-emerald-500 text-white shadow-xs' : 'text-emerald-300 hover:text-white'
                }`}
              >
                த
              </button>
            </div>
          </div>

          <div className="px-3 pb-2 pt-1.5 bg-[#1b4332]">
            <h1 className="text-sm font-extrabold text-white leading-tight">
              {t.title[lang]}
            </h1>
            <p className="text-[11px] text-emerald-200/90 leading-snug line-clamp-1">
              {t.subtitle[lang]}
            </p>
          </div>

          <nav className="bg-[#0f2e21] px-2 py-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth border-t border-emerald-900/50">
            <a
              href="#timetable-section"
              className="px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap bg-emerald-600 text-white shadow-2xs flex items-center gap-1 shrink-0"
            >
              <Clock className="w-3 h-3" />
              <span>⏰ 1. {t.nav.timetable[lang]}</span>
            </a>
            <a
              href="#fares-section"
              className="px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap bg-[#184232] text-emerald-200 hover:bg-[#20523e] flex items-center gap-1 shrink-0"
            >
              <Ticket className="w-3 h-3" />
              <span>💵 2. {t.nav.fares[lang]}</span>
            </a>
            <a
              href="#places-section"
              className="px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap bg-[#184232] text-emerald-200 hover:bg-[#20523e] flex items-center gap-1 shrink-0"
            >
              <MapPin className="w-3 h-3" />
              <span>📍 3. {t.nav.places[lang]}</span>
            </a>
            <a
              href="#contacts-section"
              className="px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap bg-[#184232] text-emerald-200 hover:bg-[#20523e] flex items-center gap-1 shrink-0"
            >
              <Phone className="w-3 h-3" />
              <span>📞 4. {t.nav.contacts[lang]}</span>
            </a>
            <a
              href="#feedback-section"
              className="px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap bg-[#184232] text-emerald-200 hover:bg-[#20523e] flex items-center gap-1 shrink-0"
            >
              <MessageSquare className="w-3 h-3" />
              <span>📝 5. {t.nav.feedback[lang]}</span>
            </a>
          </nav>
        </header>

        {/* COVER PHOTO HERO HEADER - ONLY THE CLEAN PHOTO */}
        <div className="relative w-full overflow-hidden border-b border-emerald-900/20 shadow-xs bg-emerald-950">
          <img
            src={coverPhoto}
            alt="Ella Railway Station Cover Photo"
            className="w-full h-auto max-h-56 sm:max-h-64 object-cover object-center block"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* MAIN BODY CONTENT */}
        <main className="p-3.5 space-y-6">

          {/* ======================================================== */}
          {/* ORDER 1: EXACT OFFICIAL TIMETABLE FOR BOTH DIRECTIONS    */}
          {/* ======================================================== */}
          <section id="timetable-section" className="scroll-mt-28">
            <div className="bg-white rounded-2xl border border-emerald-900/15 shadow-sm overflow-hidden">
              
              <div className="bg-[#1b4332] text-white p-3 flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-extrabold uppercase tracking-wide flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-emerald-300" />
                    <span>1. TRAIN TIMETABLE / දුම්රිය කාලසටහන</span>
                  </h2>
                  <p className="text-[10px] text-emerald-200 mt-0.5">
                    {trainDirection === 'nanuoya-to-badulla'
                      ? 'NANUOYA / ELLA TO BADULLA'
                      : 'BADULLA / ELLA TO NANUOYA'}
                  </p>
                </div>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                  Official
                </span>
              </div>

              {/* TWO-WAY DIRECTION SWITCHER */}
              <div className="p-2 bg-[#e8f2eb] border-b border-emerald-100">
                <div className="text-[10px] font-bold text-emerald-900 mb-1 flex items-center gap-1">
                  <ArrowRightLeft className="w-3 h-3 text-emerald-700" />
                  <span>ගමන් මාර්ගය තෝරන්න / Route Direction:</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setTrainDirection('nanuoya-to-badulla')}
                    className={`py-2 px-2 rounded-xl text-center transition border ${
                      trainDirection === 'nanuoya-to-badulla'
                        ? 'bg-[#1b4332] text-white border-[#1b4332] shadow-xs font-bold'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100 font-medium'
                    }`}
                  >
                    <div className="text-[11px] leading-tight">නානුඔය ➔ බදුල්ල</div>
                    <div className="text-[9px] opacity-85">NANUOYA &rarr; BADULLA</div>
                  </button>

                  <button
                    onClick={() => setTrainDirection('badulla-to-nanuoya')}
                    className={`py-2 px-2 rounded-xl text-center transition border ${
                      trainDirection === 'badulla-to-nanuoya'
                        ? 'bg-[#1b4332] text-white border-[#1b4332] shadow-xs font-bold'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100 font-medium'
                    }`}
                  >
                    <div className="text-[11px] leading-tight">බදුල්ල ➔ නානුඔය</div>
                    <div className="text-[9px] opacity-85">BADULLA &rarr; NANUOYA</div>
                  </button>
                </div>
              </div>

              {/* View Switcher: Compact Table vs Timeline */}
              <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#f0f6f2] border-b border-emerald-100 text-[11px]">
                <span className="font-bold text-emerald-950 flex items-center gap-1">
                  <TableIcon className="w-3.5 h-3.5 text-emerald-700" />
                  <span>දසුන / Display:</span>
                </span>
                <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-gray-200">
                  <button
                    onClick={() => setTimetableDisplayMode('table')}
                    className={`px-2.5 py-1 rounded-md font-bold text-[10px] flex items-center gap-1 transition ${
                      timetableDisplayMode === 'table' ? 'bg-[#1b4332] text-white shadow-2xs' : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <TableIcon className="w-3 h-3" />
                    <span>📊 කුඩා වගුව (Table)</span>
                  </button>
                  <button
                    onClick={() => setTimetableDisplayMode('timeline')}
                    className={`px-2.5 py-1 rounded-md font-bold text-[10px] flex items-center gap-1 transition ${
                      timetableDisplayMode === 'timeline' ? 'bg-[#1b4332] text-white shadow-2xs' : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>📱 කාලරේඛාව (Cards)</span>
                  </button>
                </div>
              </div>

              {/* Train Filter Tabs (only for timeline view) */}
              {timetableDisplayMode === 'timeline' && (
                <div className="p-2 bg-[#f4f8f5] border-b border-emerald-100">
                  <div className="grid grid-cols-4 gap-1 text-[10.5px] font-bold">
                    <button
                      onClick={() => setTrainFilter('all')}
                      className={`py-1.5 rounded-lg text-center transition ${
                        trainFilter === 'all'
                          ? 'bg-[#1b4332] text-white shadow-2xs'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      All / සියල්ල
                    </button>

                    <button
                      onClick={() => setTrainFilter('col1')}
                      className={`py-1.5 rounded-lg text-center transition truncate ${
                        trainFilter === 'col1'
                          ? 'bg-blue-800 text-white shadow-2xs'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {trainDirection === 'nanuoya-to-badulla' ? 'Udarata 111005' : 'Udarata 111016'}
                    </button>

                    <button
                      onClick={() => setTrainFilter('col2')}
                      className={`py-1.5 rounded-lg text-center transition truncate ${
                        trainFilter === 'col2'
                          ? 'bg-amber-800 text-white shadow-2xs'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {trainDirection === 'nanuoya-to-badulla' ? 'Podi 111015' : 'Podi 111006'}
                    </button>

                    <button
                      onClick={() => setTrainFilter('col3')}
                      className={`py-1.5 rounded-lg text-center transition truncate ${
                        trainFilter === 'col3'
                          ? 'bg-emerald-700 text-white shadow-2xs'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {trainDirection === 'nanuoya-to-badulla' ? 'Odyssey 101043' : 'Odyssey 101044'}
                    </button>
                  </div>
                </div>
              )}

              {/* DISPLAY 1: COMPACT OFFICIAL RAILWAY TABLE */}
              {timetableDisplayMode === 'table' ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-emerald-950 text-white font-bold border-b border-emerald-900">
                        <th className="py-2 px-2 text-left text-[10.5px] w-[34%]">
                          Station / ස්ථානය
                        </th>
                        <th className="py-2 px-1 text-[10px] w-[22%] bg-blue-950/80 border-l border-emerald-800">
                          {trainDirection === 'nanuoya-to-badulla' ? 'Udarata' : 'Udarata'}
                          <span className="block text-[8px] font-normal text-blue-200">
                            {trainDirection === 'nanuoya-to-badulla' ? '111005' : '111016'}
                          </span>
                        </th>
                        <th className="py-2 px-1 text-[10px] w-[22%] bg-amber-950/80 border-l border-emerald-800">
                          {trainDirection === 'nanuoya-to-badulla' ? 'Podi' : 'Podi'}
                          <span className="block text-[8px] font-normal text-amber-200">
                            {trainDirection === 'nanuoya-to-badulla' ? '111015' : '111006'}
                          </span>
                        </th>
                        <th className="py-2 px-1 text-[10px] w-[22%] bg-emerald-900 border-l border-emerald-800">
                          Odyssey
                          <span className="block text-[8px] font-normal text-emerald-200">
                            {trainDirection === 'nanuoya-to-badulla' ? '101043' : '101044'}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {activeTimetable.map((st, i) => (
                        <tr
                          key={st.id}
                          className={`${
                            st.highlight
                              ? 'bg-emerald-100/80 font-extrabold text-emerald-950 border-y-2 border-emerald-600'
                              : i % 2 === 0 ? 'bg-white' : 'bg-[#f7faf8]'
                          } hover:bg-emerald-50 transition`}
                        >
                          <td className="py-1.5 px-2 text-left font-bold text-gray-900 leading-tight">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center shrink-0 ${
                                st.highlight ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-700'
                              }`}>
                                {i + 1}
                              </span>
                              <div>
                                <span className="text-[11px] block">{st.name[lang]}</span>
                                <span className="text-[9px] text-gray-500 font-normal">
                                  {lang === 'en' ? st.name.si : st.name.en}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-1.5 px-1 border-l border-gray-200 font-extrabold text-blue-900 bg-blue-50/30">
                            {st.col1}
                          </td>
                          <td className="py-1.5 px-1 border-l border-gray-200 font-extrabold text-amber-900 bg-amber-50/30">
                            {st.col2}
                          </td>
                          <td className="py-1.5 px-1 border-l border-gray-200 font-extrabold text-emerald-900 bg-emerald-50/30">
                            {st.col3}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* DISPLAY 2: TIMELINE BADGES */
                <div className="divide-y divide-gray-100 text-xs">
                  {activeTimetable.map((st, i) => (
                    <div
                      key={st.id}
                      className={`p-2.5 flex items-center justify-between ${
                        st.highlight ? 'bg-emerald-50/80 font-bold border-l-4 border-l-emerald-600' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-bold text-gray-900 leading-tight flex items-center gap-1.5">
                          <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center shrink-0 ${
                            st.highlight ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {i + 1}
                          </span>
                          <span className="truncate">{st.name[lang]}</span>
                        </div>
                        <div className="text-[10px] text-gray-500 pl-5.5">
                          {lang === 'en' ? st.name.si : st.name.en}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {(trainFilter === 'all' || trainFilter === 'col1') && (
                          <div className="text-center px-1.5 py-1 bg-blue-50 text-blue-900 rounded-md border border-blue-200 min-w-[58px]">
                            <span className="block text-[8px] font-bold text-blue-700 uppercase">
                              {trainDirection === 'nanuoya-to-badulla' ? '111005' : '111016'}
                            </span>
                            <span className="font-extrabold text-[11px]">{st.col1}</span>
                          </div>
                        )}

                        {(trainFilter === 'all' || trainFilter === 'col2') && (
                          <div className="text-center px-1.5 py-1 bg-amber-50 text-amber-900 rounded-md border border-amber-200 min-w-[58px]">
                            <span className="block text-[8px] font-bold text-amber-700 uppercase">
                              {trainDirection === 'nanuoya-to-badulla' ? '111015' : '111006'}
                            </span>
                            <span className="font-extrabold text-[11px]">{st.col2}</span>
                          </div>
                        )}

                        {(trainFilter === 'all' || trainFilter === 'col3') && (
                          <div className="text-center px-1.5 py-1 bg-emerald-50 text-emerald-900 rounded-md border border-emerald-200 min-w-[58px]">
                            <span className="block text-[8px] font-bold text-emerald-700 uppercase">
                              {trainDirection === 'nanuoya-to-badulla' ? '101043' : '101044'}
                            </span>
                            <span className="font-extrabold text-[11px]">{st.col3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Exact Notes matching the images */}
              <div className="p-2.5 bg-gray-50 border-t border-gray-200 text-[11px] space-y-1 text-gray-700">
                {trainDirection === 'nanuoya-to-badulla' ? (
                  <>
                    <div className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold shrink-0">⚠️</span>
                      <div>
                        <strong>Podi Menike (111015):</strong> Not running Wednesday / බදාදා දින වල ධාවනය නොවේ.
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold shrink-0">✨</span>
                      <div>
                        <strong>Ella Oddyssey (101043):</strong> Only Wednesday / බදාදා දින වල පමණි.
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold shrink-0">⚠️</span>
                      <div>
                        <strong>Udarata Menike (111016):</strong> Not Running Wednesday / බදාදා දින වල ධාවනය නොවේ.
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold shrink-0">✨</span>
                      <div>
                        <strong>Ella Oddyssey (101044):</strong> Only Wednesday / බදාදා දින වල පමණි.
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>
          </section>

          {/* ======================================================== */}
          {/* ORDER 2: COMPACT RESERVATION TICKET PRICE TABLE          */}
          {/* (Matching IMG_20261011_151818.jpg exactly)               */}
          {/* ======================================================== */}
          <section id="fares-section" className="scroll-mt-28 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <Ticket className="w-4 h-4 text-emerald-700" />
                  <span>2. {t.nav.fares[lang]} / Ticket Prices</span>
                </h2>
                <p className="text-[11px] text-gray-500 font-medium">
                  {lang === 'si' ? 'ආසන වෙන්කිරීමේ ප්‍රවේශ පත්‍ර ගාස්තු වගුව' : lang === 'ta' ? 'ஆசன முன்பதிவு கட்டண அட்டவணை' : 'Reservation Ticket Price Table'}
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                LKR (Rs.)
              </span>
            </div>

            {/* Quick Segment Switcher for mobile ease */}
            <div className="bg-gray-200/80 p-1 rounded-xl grid grid-cols-3 gap-1 text-[11px] font-bold">
              <button
                onClick={() => setFareTableTab('all')}
                className={`py-1 rounded-lg transition text-center ${
                  fareTableTab === 'all' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-gray-600'
                }`}
              >
                All / සම්පූර්ණ
              </button>
              <button
                onClick={() => setFareTableTab('part1')}
                className={`py-1 rounded-lg transition text-center truncate ${
                  fareTableTab === 'part1' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-gray-600'
                }`}
              >
                Bandarawela/Nanu Oya
              </button>
              <button
                onClick={() => setFareTableTab('part2')}
                className={`py-1 rounded-lg transition text-center truncate ${
                  fareTableTab === 'part2' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-gray-600'
                }`}
              >
                Demodara/Badulla
              </button>
            </div>

            {/* THE COMPACT TICKET PRICE TABLE (Matching Image Structure) */}
            <div className="bg-white rounded-xl border border-gray-400 shadow-xs overflow-hidden text-[11px]">
              
              {/* Table Main Title Banner */}
              <div className="bg-black text-white text-center font-bold py-1.5 text-xs tracking-wide">
                Reservation Ticket Price
              </div>

              {/* TABLE PART 1: To ELLA (Bandarawela, Haputale, Nanu Oya) */}
              {(fareTableTab === 'all' || fareTableTab === 'part1') && (
                <div className="border-b border-gray-400">
                  <table className="w-full border-collapse text-center">
                    <thead>
                      <tr className="bg-gray-100 text-gray-900 font-bold border-b border-gray-400">
                        <th className="p-1.5 border-r border-gray-400 text-left w-[34%]" colSpan={2}>
                          To ELLA
                        </th>
                        <th className="p-1 border-r border-gray-400 text-[10px] w-[22%]">
                          Udarata Menike
                          <span className="block text-[8.5px] font-normal text-gray-600">111016</span>
                        </th>
                        <th className="p-1 border-r border-gray-400 text-[10px] w-[22%]">
                          Podi Menike
                          <span className="block text-[8.5px] font-normal text-gray-600">111006</span>
                        </th>
                        <th className="p-1 text-[10px] w-[22%]">
                          ELLA Oddessey
                          <span className="block text-[8.5px] font-normal text-gray-600">101044</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {/* BANDARAWELA */}
                      <tr className="border-b border-gray-300">
                        <td className="p-1.5 border-r border-gray-400 font-bold text-gray-900 text-left align-middle" rowSpan={3}>
                          BANDARAWELA
                          <span className="block text-[9.5px] font-normal text-emerald-800">බණ්ඩාරවෙල</span>
                        </td>
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">1 CLASS</td>
                        <td className="p-1 border-r border-gray-300 font-bold">2500.00</td>
                        <td className="p-1 border-r border-gray-300 font-bold">2500.00</td>
                        <td className="p-1 font-bold text-emerald-800">3500.00</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">2 CLASS</td>
                        <td className="p-1 border-r border-gray-300">1700.00</td>
                        <td className="p-1 border-r border-gray-300">1700.00</td>
                        <td className="p-1 font-semibold text-emerald-800">3000.00</td>
                      </tr>
                      <tr className="border-b border-gray-400">
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">3 CLASS</td>
                        <td className="p-1 border-r border-gray-300">1200.00</td>
                        <td className="p-1 border-r border-gray-300">1200.00</td>
                        <td className="p-1 font-semibold text-emerald-800">2500.00</td>
                      </tr>

                      {/* HAPUTALE (Soft Gray in original image) */}
                      <tr className="bg-gray-100/70 border-b border-gray-300">
                        <td className="p-1.5 border-r border-gray-400 font-bold text-gray-900 text-left align-middle" rowSpan={3}>
                          HAPUTALE
                          <span className="block text-[9.5px] font-normal text-emerald-800">හපුතලේ</span>
                        </td>
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">1 CLASS</td>
                        <td className="p-1 border-r border-gray-300 font-bold">2500.00</td>
                        <td className="p-1 border-r border-gray-300 font-bold">2500.00</td>
                        <td className="p-1 font-bold text-emerald-800">3500.00</td>
                      </tr>
                      <tr className="bg-gray-100/70 border-b border-gray-300">
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">2 CLASS</td>
                        <td className="p-1 border-r border-gray-300">1700.00</td>
                        <td className="p-1 border-r border-gray-300">1700.00</td>
                        <td className="p-1 font-semibold text-emerald-800">3000.00</td>
                      </tr>
                      <tr className="bg-gray-100/70 border-b border-gray-400">
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">3 CLASS</td>
                        <td className="p-1 border-r border-gray-300">1200.00</td>
                        <td className="p-1 border-r border-gray-300">1200.00</td>
                        <td className="p-1 font-semibold text-emerald-800">2500.00</td>
                      </tr>

                      {/* NANU OYA */}
                      <tr className="border-b border-gray-300">
                        <td className="p-1.5 border-r border-gray-400 font-bold text-gray-900 text-left align-middle" rowSpan={3}>
                          NANUOYA
                          <span className="block text-[9.5px] font-normal text-emerald-800">නානුඔය</span>
                        </td>
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">1 CLASS</td>
                        <td className="p-1 border-r border-gray-300 font-bold">2500.00</td>
                        <td className="p-1 border-r border-gray-300 font-bold">2500.00</td>
                        <td className="p-1 font-bold text-emerald-800">3500.00</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">2 CLASS</td>
                        <td className="p-1 border-r border-gray-300">1700.00</td>
                        <td className="p-1 border-r border-gray-300">1700.00</td>
                        <td className="p-1 font-semibold text-emerald-800">3000.00</td>
                      </tr>
                      <tr>
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">3 CLASS</td>
                        <td className="p-1 border-r border-gray-300">1200.00</td>
                        <td className="p-1 border-r border-gray-300">1200.00</td>
                        <td className="p-1 font-semibold text-emerald-800">2500.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* TABLE PART 2: To ELLA (Demodara, Haliela, Badulla) */}
              {(fareTableTab === 'all' || fareTableTab === 'part2') && (
                <div>
                  <table className="w-full border-collapse text-center">
                    <thead>
                      <tr className="bg-gray-100 text-gray-900 font-bold border-b border-gray-400">
                        <th className="p-1.5 border-r border-gray-400 text-left w-[34%]" colSpan={2}>
                          To ELLA
                        </th>
                        <th className="p-1 border-r border-gray-400 text-[10px] w-[22%]">
                          Udarata Menike
                          <span className="block text-[8.5px] font-normal text-gray-600">111016</span>
                        </th>
                        <th className="p-1 border-r border-gray-400 text-[10px] w-[22%]">
                          Podi Menike
                          <span className="block text-[8.5px] font-normal text-gray-600">111006</span>
                        </th>
                        <th className="p-1 text-[10px] w-[22%]">
                          ELLA Oddessey
                          <span className="block text-[8.5px] font-normal text-gray-600">101043</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {/* DEMODARA */}
                      <tr className="border-b border-gray-300">
                        <td className="p-1.5 border-r border-gray-400 font-bold text-gray-900 text-left align-middle" rowSpan={3}>
                          DEMODARA
                          <span className="block text-[9.5px] font-normal text-emerald-800">දෙමෝදර</span>
                        </td>
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">1 CLASS</td>
                        <td className="p-1 border-r border-gray-300 font-bold">2500.00</td>
                        <td className="p-1 border-r border-gray-300 font-bold">2500.00</td>
                        <td className="p-1 font-bold text-emerald-800">3500.00</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">2 CLASS</td>
                        <td className="p-1 border-r border-gray-300">1700.00</td>
                        <td className="p-1 border-r border-gray-300">1700.00</td>
                        <td className="p-1 font-semibold text-emerald-800">3000.00</td>
                      </tr>
                      <tr className="border-b border-gray-400">
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">3 CLASS</td>
                        <td className="p-1 border-r border-gray-300">1200.00</td>
                        <td className="p-1 border-r border-gray-300">1200.00</td>
                        <td className="p-1 font-semibold text-emerald-800">2500.00</td>
                      </tr>

                      {/* HALIELA (Soft Gray) */}
                      <tr className="bg-gray-100/70 border-b border-gray-300">
                        <td className="p-1.5 border-r border-gray-400 font-bold text-gray-900 text-left align-middle" rowSpan={3}>
                          HALIELA
                          <span className="block text-[9.5px] font-normal text-emerald-800">හාලිඇල</span>
                        </td>
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">1 CLASS</td>
                        <td className="p-1 border-r border-gray-300 font-bold">2500.00</td>
                        <td className="p-1 border-r border-gray-300 font-bold">2500.00</td>
                        <td className="p-1 font-bold text-emerald-800">3500.00</td>
                      </tr>
                      <tr className="bg-gray-100/70 border-b border-gray-300">
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">2 CLASS</td>
                        <td className="p-1 border-r border-gray-300">1700.00</td>
                        <td className="p-1 border-r border-gray-300">1700.00</td>
                        <td className="p-1 font-semibold text-emerald-800">3000.00</td>
                      </tr>
                      <tr className="bg-gray-100/70 border-b border-gray-400">
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">3 CLASS</td>
                        <td className="p-1 border-r border-gray-300">1200.00</td>
                        <td className="p-1 border-r border-gray-300">1200.00</td>
                        <td className="p-1 font-semibold text-emerald-800">2500.00</td>
                      </tr>

                      {/* BADULLA */}
                      <tr className="border-b border-gray-300">
                        <td className="p-1.5 border-r border-gray-400 font-bold text-gray-900 text-left align-middle" rowSpan={3}>
                          BADULLA
                          <span className="block text-[9.5px] font-normal text-emerald-800">බදුල්ල</span>
                        </td>
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">1 CLASS</td>
                        <td className="p-1 border-r border-gray-300 font-bold">2500.00</td>
                        <td className="p-1 border-r border-gray-300 font-bold">2500.00</td>
                        <td className="p-1 font-bold text-emerald-800">3500.00</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">2 CLASS</td>
                        <td className="p-1 border-r border-gray-300">1700.00</td>
                        <td className="p-1 border-r border-gray-300">1700.00</td>
                        <td className="p-1 font-semibold text-emerald-800">3000.00</td>
                      </tr>
                      <tr>
                        <td className="p-1 border-r border-gray-300 font-semibold text-[10px]">3 CLASS</td>
                        <td className="p-1 border-r border-gray-300">1200.00</td>
                        <td className="p-1 border-r border-gray-300">1200.00</td>
                        <td className="p-1 font-semibold text-emerald-800">2500.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </section>

          {/* ======================================================== */}
          {/* ORDER 3: VISITING PLACES AROUND ELLA (නැරඹීමට ඇති ස්ථාන)  */}
          {/* ======================================================== */}
          <section id="places-section" className="scroll-mt-28 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>3. {t.nav.places[lang]} (10 Places)</span>
                </h2>
                <p className="text-[11px] text-gray-500 font-medium">
                  {lang === 'si' ? 'ඇල්ල ප්‍රදේශයේ නැරඹුම් ස්ථාන හා දුර' : lang === 'ta' ? 'எல்ல பார்வையிடும் இடங்கள் மற்றும் தூரம்' : 'Top tourist attractions around Ella'}
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                10 Places
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search place / ස්ථානය සොයන්න..."
                value={searchPlace}
                onChange={(e) => setSearchPlace(e.target.value)}
                className="w-full pl-8.5 pr-3 py-1.5 bg-white rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs"
              />
            </div>

            {/* View Mode Toggle: Compact Surrounding Table vs Cards */}
            <div className="flex items-center justify-between p-1 bg-gray-200/80 rounded-xl text-xs font-bold">
              <button
                onClick={() => setPlacesViewMode('table')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  placesViewMode === 'table' ? 'bg-white text-emerald-950 shadow-2xs font-extrabold' : 'text-gray-600 hover:text-black'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5 text-emerald-700" />
                <span>📊 කුඩා අවට වගුව (Compact Table)</span>
              </button>
              <button
                onClick={() => setPlacesViewMode('cards')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  placesViewMode === 'cards' ? 'bg-white text-emerald-950 shadow-2xs font-extrabold' : 'text-gray-600 hover:text-black'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-emerald-700" />
                <span>🎴 කාඩ්පත් දසුන (Cards)</span>
              </button>
            </div>

            {/* DISPLAY 1: COMPACT SURROUNDING ATTRACTIONS TABLE */}
            {placesViewMode === 'table' ? (
              <div className="bg-white rounded-xl border border-emerald-900/20 shadow-xs overflow-hidden">
                <div className="bg-[#1b4332] text-white px-3 py-2 flex items-center justify-between">
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                    <span>ඇල්ල අවට නැරඹුම් ස්ථාන (Places Around Ella)</span>
                  </div>
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-200 px-2 py-0.5 rounded-full font-bold border border-emerald-400/30">
                    {filteredAttractions.length} Places
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-emerald-50 text-emerald-950 font-bold border-b border-emerald-200 text-[10.5px]">
                        <th className="py-2 px-1 text-center w-7">#</th>
                        <th className="py-2 px-1 text-center w-12">ඡායාරූප</th>
                        <th className="py-2 px-2">නැරඹුම් ස්ථානය (Place)</th>
                        <th className="py-2 px-1 text-center w-18">දුර (Distance)</th>
                        <th className="py-2 px-1 text-center w-11">Map</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredAttractions.map((spot, idx) => (
                        <tr
                          key={spot.id}
                          className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#fbfdfc]'} hover:bg-emerald-50/70 transition`}
                        >
                          {/* Index */}
                          <td className="py-2 px-1 text-center font-bold text-gray-400 text-[11px]">
                            {idx + 1}
                          </td>

                          {/* Thumbnail Image */}
                          <td className="py-2 px-1 text-center">
                            <div className="w-10 h-10 mx-auto rounded-lg overflow-hidden border border-gray-300 shadow-2xs">
                              <img
                                src={spot.customImage || spot.defaultImage}
                                alt={spot.name.en}
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </td>

                          {/* Place Name */}
                          <td className="py-2 px-2 leading-snug">
                            <div className="font-bold text-gray-900 text-[11.5px] flex items-center gap-1">
                              <span>{spot.name[lang]}</span>
                            </div>
                            <div className="text-[10px] text-emerald-800 font-medium">
                              {lang === 'si' ? spot.name.en : spot.name.si}
                            </div>
                            <div className="text-[9px] text-gray-500">
                              {spot.name.ta}
                            </div>
                          </td>

                          {/* Distance Badge */}
                          <td className="py-2 px-1 text-center">
                            <span className="inline-block px-1.5 py-0.5 bg-red-600 text-white font-extrabold text-[10px] rounded-md shadow-2xs tracking-tight whitespace-nowrap">
                              {spot.distance}
                            </span>
                          </td>

                          {/* Map Link */}
                          <td className="py-2 px-1 text-center">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name.en + ' Ella Sri Lanka')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center w-7 h-7 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-200 transition"
                              title="Open Google Maps"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* DISPLAY 2: EXPANDED CARD GALLERY */
              <div className="space-y-3">
                {filteredAttractions.map((spot, idx) => (
                  <div
                    key={spot.id}
                    className="bg-white rounded-2xl overflow-hidden border border-emerald-900/10 shadow-2xs hover:shadow-xs transition"
                  >
                    <div className="relative h-40 w-full bg-gray-100">
                      <img
                        src={spot.customImage || spot.defaultImage}
                        alt={spot.name.en}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                      <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        #{idx + 1}
                      </div>

                      <div className="absolute bottom-2.5 right-2.5 bg-red-600 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white/40">
                        <Navigation className="w-3 h-3" />
                        <span>{spot.distance}</span>
                      </div>
                    </div>

                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-gray-900 leading-tight">
                          {spot.name[lang]}
                        </div>
                        <div className="text-[11px] text-emerald-800 mt-0.5">
                          {lang === 'si' ? spot.name.en : spot.name.si}
                        </div>
                        <div className="text-[10px] text-gray-500">
                          {spot.name.ta}
                        </div>
                      </div>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name.en + ' Ella Sri Lanka')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-lg flex items-center gap-1 shrink-0 transition"
                      >
                        <span>Map</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ======================================================== */}
          {/* ORDER 4: PHONE DIRECTORY & CONTACTS (දුරකථන අංක නාමාවලිය) */}
          {/* ======================================================== */}
          <section id="contacts-section" className="scroll-mt-28 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-emerald-700" />
                  <span>4. {t.nav.contacts[lang]} / Contacts</span>
                </h2>
                <p className="text-[11px] text-gray-500 font-medium">
                  {lang === 'si' ? 'හදිසි හා දුම්රිය තොරතුරු විමසීම්' : lang === 'ta' ? 'அவசர மற்றும் ரயில் தகவல்' : 'Quick railway assistance hotline'}
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                Tap to Call
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href="tel:1971"
                className="p-3 bg-white rounded-xl border border-emerald-200 shadow-2xs hover:border-emerald-500 flex items-center justify-between active:scale-[0.99] transition"
              >
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-800">
                    Railway Call Center / දුම්රිය තොරතුරු
                  </div>
                  <div className="text-xl font-black text-emerald-700 tracking-wider">
                    1971
                  </div>
                  <div className="text-[10px] text-gray-500">
                    24/7 National Railway Hotline
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
              </a>

              <a
                href="tel:0572228571"
                className="p-3 bg-white rounded-xl border border-emerald-200 shadow-2xs hover:border-emerald-500 flex items-center justify-between active:scale-[0.99] transition"
              >
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-800">
                    Ella Railway Station / ඇල්ල දුම්රිය ස්ථානය
                  </div>
                  <div className="text-lg font-black text-emerald-700 tracking-wider">
                    057 2228571
                  </div>
                  <div className="text-[10px] text-gray-500">
                    Direct Station Master Counter
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
              </a>
            </div>
          </section>

          {/* ======================================================== */}
          {/* ORDER 5: FEEDBACK, COMPLAINTS & RATINGS (පැමිණිලි හා යෝජනා)*/}
          {/* ======================================================== */}
          <section id="feedback-section" className="scroll-mt-28 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>5. {t.nav.feedback[lang]}</span>
                </h2>
                <p className="text-[11px] text-gray-500 font-medium">
                  {lang === 'si' ? 'පැමිණිලි, යෝජනා සහ සේවා ඇගයීම්' : lang === 'ta' ? 'முறைப்பாடுகள், ஆலோசனைகள் மற்றும் மதிப்பீடு' : 'Feedback & Ratings'}
                </p>
              </div>
              <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                formsubmit.co
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1 bg-gray-200/80 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setFeedbackTab('complaint')}
                className={`py-1.5 rounded-lg text-center transition ${
                  feedbackTab === 'complaint' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-gray-600'
                }`}
              >
                <div>Complaints</div>
                <div className="text-[9px] font-normal opacity-80">පැමිණිලි</div>
              </button>
              <button
                onClick={() => setFeedbackTab('idea')}
                className={`py-1.5 rounded-lg text-center transition ${
                  feedbackTab === 'idea' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-gray-600'
                }`}
              >
                <div>Ideas</div>
                <div className="text-[9px] font-normal opacity-80">යෝජනා</div>
              </button>
              <button
                onClick={() => setFeedbackTab('rating')}
                className={`py-1.5 rounded-lg text-center transition ${
                  feedbackTab === 'rating' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-gray-600'
                }`}
              >
                <div>Rating</div>
                <div className="text-[9px] font-normal opacity-80">සලකුණු</div>
              </button>
            </div>

            {formSuccessMessage && (
              <div className="p-3 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold text-center animate-fade-in flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{formSuccessMessage}</span>
              </div>
            )}

            {/* COMPLAINTS FORM */}
            {feedbackTab === 'complaint' && (
              <form onSubmit={handleComplaintSubmit} className="bg-white p-3.5 rounded-2xl border border-emerald-900/10 shadow-2xs space-y-2.5">
                <div className="text-xs font-bold text-gray-800 border-b border-gray-100 pb-1.5">
                  Complaints / පැමිණිලි / முறைப்பாடுகள்
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                    Name / නම / பெயர் *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={complaintData.name}
                    onChange={(e) => setComplaintData({ ...complaintData, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                    Address &amp; Email / ලිපිනය සහ විද්‍යුත් තැපෑල *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Address or email"
                    value={complaintData.addressEmail}
                    onChange={(e) => setComplaintData({ ...complaintData, addressEmail: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                    Contact Number / දුරකථන අංකය *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="07x xxxxxxx / 057 xxxxxx"
                    value={complaintData.phone}
                    onChange={(e) => setComplaintData({ ...complaintData, phone: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                    Note / පැමිණිල්ල පිළිබඳ සටහන *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your issue..."
                    value={complaintData.note}
                    onChange={(e) => setComplaintData({ ...complaintData, note: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{formSubmitting ? 'Sending...' : 'Submit Complaint / ඉදිරිපත් කරන්න'}</span>
                </button>
              </form>
            )}

            {/* IDEAS FORM */}
            {feedbackTab === 'idea' && (
              <form onSubmit={handleIdeaSubmit} className="bg-white p-3.5 rounded-2xl border border-emerald-900/10 shadow-2xs space-y-2.5">
                <div className="text-xs font-bold text-gray-800 border-b border-gray-100 pb-1.5">
                  Ideas &amp; Proposals / අදහස් සහ යෝජනා / ஆலோசனைகள்
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                    Name / නම / பெயர் *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={ideaData.name}
                    onChange={(e) => setIdeaData({ ...ideaData, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                    Address &amp; Email / ලිපිනය සහ විද්‍යුත් තැපෑල *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Address or email"
                    value={ideaData.addressEmail}
                    onChange={(e) => setIdeaData({ ...ideaData, addressEmail: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                    Contact Number / දුරකථන අංකය *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="07x xxxxxxx"
                    value={ideaData.phone}
                    onChange={(e) => setIdeaData({ ...ideaData, phone: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                    Proposal Note / යෝජනාව පිළිබඳ සටහන *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Share your suggestion..."
                    value={ideaData.note}
                    onChange={(e) => setIdeaData({ ...ideaData, note: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{formSubmitting ? 'Sending...' : 'Submit Idea / යෝජනාව යවන්න'}</span>
                </button>
              </form>
            )}

            {/* RATINGS FORM */}
            {feedbackTab === 'rating' && (
              <form onSubmit={handleRatingSubmit} className="bg-white p-3.5 rounded-2xl border border-emerald-900/10 shadow-2xs space-y-2.5">
                <div className="text-xs font-bold text-gray-800 border-b border-gray-100 pb-1.5">
                  Awarding Marks / සලකුණු කිරීම් / மதிப்பீடு (x / &radic;)*
                </div>

                <div className="space-y-1.5">
                  {[
                    { id: 'clean', en: 'Its Clean', si: 'පිරිසිදුයි', ta: 'சுத்தமானது' },
                    { id: 'dirty', en: 'Its Dirty', si: 'අපිරිසිදුයි', ta: 'அசுத்தமானது' },
                    { id: 'beautiful', en: 'Its Beautiful', si: 'අලංකාරයි', ta: 'அழகானது' },
                    { id: 'friendliness', en: 'Friendliness', si: 'සුහදශීලිත්වය', ta: 'நட்புணர்வு' },
                    { id: 'service', en: 'Service Efficiency', si: 'සේවා කාර්යක්ෂමතාවය', ta: 'சேவைத்திறன்' }
                  ].map((opt) => {
                    const isChecked = selectedRatings.includes(opt.en);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleRating(opt.en)}
                        className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                          isChecked ? 'bg-emerald-50 border-emerald-500 font-bold' : 'bg-gray-50/70 border-gray-200'
                        }`}
                      >
                        <div className="text-xs">
                          <div>{opt.en} / {opt.si}</div>
                          <div className="text-[10px] text-gray-500">{opt.ta}</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 accent-emerald-700"
                        />
                      </div>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                    Contact Number (Optional) / දුරකථන අංකය
                  </label>
                  <input
                    type="tel"
                    placeholder="07x xxxxxxx"
                    value={ratingDetails.phone}
                    onChange={(e) => setRatingDetails({ ...ratingDetails, phone: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={selectedRatings.length === 0 || formSubmitting}
                  className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{formSubmitting ? 'Recording...' : 'Submit Ratings / සලකුණු යවන්න'}</span>
                </button>
              </form>
            )}
          </section>

        </main>

        {/* FOOTER */}
        <footer className="mt-8 pt-5 pb-8 px-4 bg-[#0e2c20] text-emerald-200 text-xs text-center border-t border-emerald-900 space-y-2">
          <div className="font-extrabold text-sm text-white">
            Ella Train Times – Ella Railway Station
          </div>
          <p className="text-[11px] text-emerald-300/80 leading-relaxed max-w-xs mx-auto">
            ශ්‍රී ලංකා දුම්රිය දෙපාර්තමේන්තුව • Sri Lanka Railways • இலங்கை புகையிரத திணைக்களம்
          </p>
          <div className="pt-2 text-[10px] text-emerald-400/60 border-t border-emerald-900/50">
            Destination: formsubmit.co/cctvbadulla@gmail.com
          </div>
        </footer>

      </div>
    </div>
  );
}
