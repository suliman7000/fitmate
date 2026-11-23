import React,{useMemo,useState} from 'react';
import {Dumbbell,ArrowLeft,Play,ChevronLeft,ChevronRight,CheckCircle2,Activity,Target,Zap,Menu,X} from 'lucide-react';

const workouts=[
 {id:'strength',label:'القوة وبناء العضلات',tag:'STRENGTH',name:'تمارين القوة',desc:'ابنِ قوتك خطوة بخطوة مع تمارين مركّبة ومدروسة.',image:'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=85'},
 {id:'chest',label:'تمارين الصدر',tag:'CHEST DAY',name:'يوم الصدر',desc:'طوّر أداءك بتمارين الضغط والأوزان الحرة.',image:'https://images.unsplash.com/photo-1534368270820-9de3d8053204?auto=format&fit=crop&w=1000&q=85'},
 {id:'legs',label:'تمارين الأرجل',tag:'LEG DAY',name:'قوة من الأساس',desc:'تمارين السكوات والاندفاع لبناء قاعدة قوية.',image:'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=85'},
 {id:'cardio',label:'اللياقة والتحمّل',tag:'CONDITIONING',name:'ارفع مستوى لياقتك',desc:'حافظ على نشاطك وطوّر قدرتك على التحمّل.',image:'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=85'}
];
const heroImage='https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1800&q=90';

export default function Landing({onLogin,onRegister}){
 const[active,setActive]=useState('all');
 const[slide,setSlide]=useState(0);
 const[menu,setMenu]=useState(false);
 const visible=useMemo(()=>active==='all'?workouts:workouts.filter(w=>w.id===active),[active]);
 const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)};
 const next=()=>setSlide(s=>(s+1)%workouts.length);
 const prev=()=>setSlide(s=>(s+workouts.length-1)%workouts.length);
 return <div className="landing" dir="rtl">
  <header className="landing-nav"><a className="landing-brand" href="#top" onClick={e=>{e.preventDefault();go('top')}}><span><Dumbbell size={22}/></span><b>FITMATE</b><small>TRAIN SMARTER</small></a>
   <nav className={menu?'open':''}><button onClick={()=>go('top')}>الرئيسية</button><button onClick={()=>go('training')}>التمارين</button><button onClick={()=>go('features')}>مميزاتنا</button><button onClick={()=>go('about')}>عن FitMate</button></nav>
   <div className="landing-actions"><button className="landing-login" onClick={onLogin}>تسجيل الدخول</button><button className="landing-join" onClick={onRegister}>ابدأ مجاناً <ArrowLeft size={16}/></button></div>
   <button className="landing-menu" onClick={()=>setMenu(v=>!v)} aria-label="القائمة">{menu?<X/>:<Menu/>}</button>
  </header>
  <main>
   <section className="landing-hero" id="top" style={{'--hero-image':`url("${heroImage}")`}}>
    <div className="landing-hero-shade"/>
    <div className="landing-hero-content"><span className="landing-kicker"><i/> YOUR FITNESS. YOUR RULES.</span><h1>القوة ما بتنولد<br/> <em>بالصدفة.</em></h1><p>خطّط تمرينك، تابع تقدمك، وخلّي كل جلسة تقرّبك من النسخة الأقوى منك.</p><div className="landing-hero-buttons"><button className="landing-cta" onClick={onRegister}>ابدأ رحلتك الآن <ArrowLeft size={18}/></button><button className="landing-watch" onClick={()=>go('training')}><span><Play size={15} fill="currentColor"/></span> اكتشف التمارين</button></div><div className="landing-proof"><div className="proof-avatars"><b>F</b><b>M</b><b>+</b></div><span>مساحتك الخاصة للتطور والاستمرارية</span></div></div>
    <div className="hero-vertical">DISCIPLINE · CONSISTENCY · PROGRESS</div><div className="hero-index"><b>01</b><span/> 04</div>
   </section>
   <section className="landing-strip"><div><strong>01</strong><span>خطّط بذكاء</span></div><div><strong>02</strong><span>تمرّن بثبات</span></div><div><strong>03</strong><span>راقب تقدمك</span></div><div className="strip-note">NO SHORTCUTS. JUST PROGRESS.</div></section>
   <section className="landing-training" id="training"><div className="landing-section-top"><div><span className="landing-kicker dark">TRAINING LIBRARY / 01</span><h2>اختار هدفك.<br/><em>وابدأ الحركة.</em></h2></div><p>كل تمرين إله هدف. اكتشف أنواع التدريب، اختار اللي بناسبك، وخلي البداية تكون اليوم.</p></div>
    <div className="training-controls"><div className="training-filters"><button className={active==='all'?'selected':''} onClick={()=>setActive('all')}>الكل</button>{workouts.map(w=><button key={w.id} className={active===w.id?'selected':''} onClick={()=>setActive(w.id)}>{w.label}</button>)}</div><div className="training-arrows"><button onClick={prev} aria-label="السابق"><ChevronRight/></button><button onClick={next} aria-label="التالي"><ChevronLeft/></button></div></div>
    <div className="training-grid">{visible.map((w,i)=><article className="training-card" key={w.id} onMouseEnter={()=>setSlide(workouts.findIndex(x=>x.id===w.id))}><div className="training-photo"><img src={w.image} alt={w.label} loading="lazy"/><span>{w.tag}</span><button onClick={onRegister} aria-label="ابدأ التدريب"><ArrowLeft/></button></div><div className="training-card-copy"><small>0{workouts.findIndex(x=>x.id===w.id)+1} / TRAINING</small><h3>{w.name}</h3><p>{w.desc}</p></div></article>)}</div>
    <div className="training-feature"><div className="feature-photo" style={{backgroundImage:`url("${workouts[slide].image}")`}}/><div><span className="landing-kicker">MOVE WITH PURPOSE</span><h3>{workouts[slide].name}</h3><p>{workouts[slide].desc}</p><button onClick={onRegister}>أنشئ حسابك وابدأ <ArrowLeft size={16}/></button></div><div className="feature-count">0{slide+1}<span> / 04</span></div></div>
   </section>
   <section className="landing-features" id="features"><div className="landing-feature-heading"><span className="landing-kicker">WHY FITMATE / 02</span><h2>مش بس تتمرّن.<br/><em>تتمرّن بوعي.</em></h2></div><div className="landing-feature-grid"><article><span><Target/></span><small>01 / YOUR PLAN</small><h3>برنامج واضح</h3><p>رتّب أيام تمرينك واعرف شو عليك بكل جلسة.</p></article><article><span><Activity/></span><small>02 / TRACK PROGRESS</small><h3>تقدم ملموس</h3><p>سجّل الأوزان والتكرارات وشوف تطورك مع الوقت.</p></article><article><span><Zap/></span><small>03 / SMART COACH</small><h3>مساعدك الرياضي</h3><p>استفد من المدرب الذكي لفهم أدائك وتطوير خطتك.</p></article></div></section>
   <section className="landing-final" id="about"><div className="final-mark"><Dumbbell size={30}/></div><span className="landing-kicker">YOUR NEXT REP STARTS HERE</span><h2>جاهز تبدأ<br/><em>نسختك الأقوى؟</em></h2><p>أنشئ حسابك مجاناً وخلي FitMate يكون شريكك بكل خطوة.</p><button className="landing-cta" onClick={onRegister}>انضم إلى FitMate <ArrowLeft size={18}/></button><small>FREE TO START · BUILT FOR YOUR PROGRESS</small></section>
  </main>
  <footer className="landing-footer"><a className="landing-brand" href="#top"><span><Dumbbell size={20}/></span><b>FITMATE</b></a><small>© 2026 FITMATE. TRAIN SMARTER. LIVE STRONGER.</small><button onClick={onLogin}>دخول الأعضاء <ArrowLeft size={14}/></button></footer>
 </div>;
}
