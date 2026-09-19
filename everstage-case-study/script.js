
const sections = ["overview","context","ideal-reality","problem","insight","solution","scenario","explorations","final-ui","outcome-last"];
const progressBar = document.getElementById('progressBar');
const tocLinks = document.querySelectorAll('.toc a');
const mobileToc = document.getElementById('mobileToc');
sections.forEach(id=>{
  const dot = document.createElement('button');
  dot.className='m-dot';
  dot.dataset.id=id;
  dot.textContent = (id[0]+id[1]).toUpperCase();
  dot.onclick=()=> document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  mobileToc.appendChild(dot);
});
function setActive(id){
  tocLinks.forEach(a=> a.classList.toggle('active', a.dataset.id===id));
  document.querySelectorAll('.m-dot').forEach(b=> b.classList.toggle('active', b.dataset.id===id));
}
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ setActive(e.target.id); e.target.classList.add('is-visible'); } });
}, {rootMargin:"-25% 0px -60% 0px", threshold:0.1});
sections.forEach(id=>{ const el=document.getElementById(id); if(el) io.observe(el); });
const fadeIO = new IntersectionObserver((entries)=>{ entries.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('is-visible'); }); }, {threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=> fadeIO.observe(el));
window.addEventListener('scroll', ()=>{
  const sc = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  if(progressBar) progressBar.style.transform=`scaleY(${sc})`;
}, {passive:true});
const track = document.getElementById('carouselTrack');
const slides = track ? Array.from(track.children) : [];
const captionEl = document.getElementById('carouselCaption');
const dotsEl = document.getElementById('carouselDots');
let cur=0;
if(dotsEl){
  slides.forEach((_,i)=>{
    const d=document.createElement('div');
    d.className='dot'+(i===0?' active':'');
    d.onclick=()=> go(i);
    dotsEl.appendChild(d);
  });
}
function go(n){
  cur=(n+slides.length)%slides.length;
  slides.forEach((s,i)=> s.classList.toggle('active', i===cur));
  const txt = slides[cur].dataset.text;
  if(captionEl){ captionEl.style.opacity='0'; setTimeout(()=>{ captionEl.textContent=txt; captionEl.style.opacity='0.6'; }, 150); }
  if(dotsEl) Array.from(dotsEl.children).forEach((d,i)=> d.classList.toggle('active', i===cur));
}
document.getElementById('prevBtn')?.addEventListener('click', ()=> go(cur-1));
document.getElementById('nextBtn')?.addEventListener('click', ()=> go(cur+1));
const lb=document.getElementById('lightbox'); const lbImg=document.getElementById('lightboxImg');
document.querySelectorAll('.zoomable').forEach(img=>{
  img.addEventListener('click', ()=>{ lbImg.src=img.src; lb.classList.add('open'); });
});
lb?.addEventListener('click', (e)=>{ if(e.target===lb || e.target.classList.contains('lb-close')) lb.classList.remove('open'); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape') lb.classList.remove('open'); });
const bannerInput=document.getElementById('bannerInput');
const bannerDrop=document.getElementById('bannerDrop');
const bannerImg=document.getElementById('bannerImg');
bannerDrop?.addEventListener('click', ()=> bannerInput?.click());
bannerDrop?.addEventListener('dragover', e=>{ e.preventDefault(); bannerDrop.style.opacity='0.8'; });
bannerDrop?.addEventListener('dragleave', ()=> bannerDrop.style.opacity='1');
bannerDrop?.addEventListener('drop', e=>{
  e.preventDefault(); bannerDrop.style.opacity='1';
  const f=e.dataTransfer.files[0]; if(f){ const url=URL.createObjectURL(f); bannerImg.src=url; }
});
bannerInput?.addEventListener('change', e=>{
  const f=e.target.files[0]; if(f){ const url=URL.createObjectURL(f); bannerImg.src=url; }
});
