const data = window.PORTFOLIO;
const projectOrder = ["ServeFlow", "RiLyPark", "SportBooking", "Study Helper", "Playra", "Preciyus Mobile"];
data.projects = projectOrder
  .map(title => data.projects.find(project => project.title === title))
  .filter(Boolean)
  .map((project, index) => ({ ...project, number: String(index + 1).padStart(2, "0") }));

const projectSlug = title => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const projectUrl = project => `project.html?project=${projectSlug(project.title)}`;

const projectVisual = (project) => project.screens ? `
  <a class="project-visual figma-visual ${project.accent} ${project.format === "desktop" ? "desktop-visual" : ""}" href="${projectUrl(project)}" aria-label="View the full ${project.title} case study">
    <span class="project-client">${project.client} · Full case study</span>
    <div class="screen-stack">
      ${project.screens.map((screen, index) => `<img src="${screen}" alt="" class="screen-${index + 1}" loading="lazy" />`).join("")}
    </div>
    <span class="figma-link">View full project ↗</span>
  </a>` : `
  <div class="project-visual ${project.accent}" aria-hidden="true">
    <span class="project-client">${project.client}</span>
    <strong>${project.title.substring(0, 2).toUpperCase()}</strong>
    <div class="visual-lines"><i></i><i></i><i></i></div>
  </div>`;

const projectMarkup = (project) => `
  <article class="project reveal" tabindex="0">
    <div class="project-top"><span>${project.number}</span><span>${project.year}</span></div>
    ${projectVisual(project)}
    <div class="project-info">
      <div><p>${project.type}</p><h3>${project.title}</h3><a class="case-link" href="${projectUrl(project)}">View full project ↗</a></div>
      <p class="project-description">${project.description}</p>
    </div>
    <div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
  </article>`;

document.querySelector("#projects").innerHTML = data.projects.map(projectMarkup).join("");

const galleryDialog = document.querySelector("#gallery-dialog");
const galleryTitle = document.querySelector("#gallery-title");
const galleryGrid = document.querySelector("#gallery-grid");
document.querySelector(".gallery-close")?.addEventListener("click", () => galleryDialog.close());
document.querySelector("#bio").textContent = data.bio;
document.querySelector("#skills-list").innerHTML = data.skills.map(skill => `
  <article class="skill-row reveal"><span>${skill[0]}</span><h3>${skill[1]}</h3><p>${skill[2]}</p></article>
`).join("");
document.querySelector("#socials").innerHTML = data.socials.map(([name, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${name} ↗</a>`).join("");
document.querySelector("#year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", event => {
  glow.style.transform = `translate(${event.clientX - 180}px, ${event.clientY - 180}px)`;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => anchor.addEventListener("click", event => {
  const target = document.querySelector(anchor.getAttribute("href"));
  if (target) { event.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
}));

const translations = {
  en: {
    navWork:"Work",navAbout:"About",availability:"Available for work",heroEyebrow:"UI/UX DESIGNER · MOROCCO",
    heroTitle:'I design digital<br>experiences that<br><em>feel effortless.</em>',heroIntro:"From first user flow to polished interface, I turn complex ideas into clear, thoughtful mobile and web products.",explore:'Explore selected work <span>↘</span>',together:"Let’s work together",
    workEyebrow:"SELECTED WORK · 2024—2026",workTitle:"Projects built around<br>real user needs.",workIntro:"Mobile apps, platforms and dashboards shaped through research, structure and precise visual design.",
    about:"ABOUT",aboutTitle:'Good design is quiet.<br>It removes friction and lets<br><em>the product speak.</em>',skills:"CAPABILITIES",skillsTitle:"How I shape a product.",education:"EDUCATION",educationTitle:"Built on design practice<br>and constant curiosity.",contact:"HAVE A PROJECT IN MIND?",contactTitle:'Let’s create something<br><em>worth remembering.</em>'
  },
  fr: {
    navWork:"Projets",navAbout:"À propos",availability:"Disponible",heroEyebrow:"DESIGNER UI/UX · MAROC",
    heroTitle:'Je conçois des expériences<br>digitales <em>simples et intuitives.</em>',heroIntro:"Du premier parcours utilisateur à l’interface finale, je transforme des idées complexes en produits web et mobiles clairs et réfléchis.",explore:'Découvrir mes projets <span>↘</span>',together:"Travaillons ensemble",
    workEyebrow:"PROJETS SÉLECTIONNÉS · 2024—2026",workTitle:"Des projets conçus autour<br>des vrais besoins.",workIntro:"Applications mobiles, plateformes et tableaux de bord façonnés par la recherche, la structure et un design visuel précis.",
    about:"À PROPOS",aboutTitle:'Un bon design reste discret.<br>Il élimine les frictions et laisse<br><em>le produit s’exprimer.</em>',skills:"COMPÉTENCES",skillsTitle:"Ma façon de concevoir un produit.",education:"FORMATION",educationTitle:"Une pratique du design nourrie<br>par une curiosité constante.",contact:"UN PROJET EN TÊTE ?",contactTitle:'Créons ensemble quelque chose<br><em>de mémorable.</em>'
  }
};
const projectFrench = {
  "ServeFlow":["Plateforme de gestion de restaurant","Une plateforme complète qui réunit commandes, cuisine, tables, réservations, personnel et analyses dans un espace de travail unique."],
  "RiLyPark":["Tableau de bord de gestion du parking","Un espace d’administration riche en données pour suivre les opérations, les places, les abonnements et l’activité quotidienne."],
  "SportBooking":["Plateforme web de réservation","Une plateforme responsive pour découvrir et réserver des terrains, accompagnée d’une expérience de gestion claire pour les administrateurs."],
  "Study Helper":["Application mobile éducative","Une expérience d’apprentissage qui aide les étudiants à organiser leurs sessions, suivre leurs progrès et accéder rapidement aux outils essentiels."],
  "Playra":["Application de jeux entre amis","Une expérience multijoueur ludique pour créer des salons privés, inviter des amis et lancer rapidement des jeux sociaux."],
  "Preciyus Mobile":["Expérience mobile en 13 écrans","Une extension mobile cohérente du produit Preciyus, adaptée depuis le web vers une interface compacte et facile à utiliser."]
};
const skillFrench=[["01","Stratégie Produit","Recherche · Parcours utilisateur · Architecture de l’information"],["02","Expérience Utilisateur","Wireframes · Prototypes · Tests d’utilisabilité"],["03","Design d’Interface","UI mobile · UI web · Design responsive"],["04","Systèmes Visuels","Design systems · Composants · Cohérence de marque"],["05","Outils","Figma · FigJam · Photoshop · Illustrator · Canva"]];
let currentLanguage=localStorage.getItem("portfolio-language")||"en";
const applyLanguage=lang=>{const t=translations[lang];document.documentElement.lang=lang;document.querySelector("#nav-work").textContent=t.navWork;document.querySelector("#nav-about").textContent=t.navAbout;document.querySelector("#availability-text").textContent=t.availability;document.querySelector("#hero-eyebrow").textContent=t.heroEyebrow;document.querySelector("#hero-title").innerHTML=t.heroTitle;document.querySelector("#hero-intro").textContent=t.heroIntro;document.querySelector("#explore-work").innerHTML=t.explore;document.querySelector("#email-hero").textContent=t.together;document.querySelector("#work-eyebrow").textContent=t.workEyebrow;document.querySelector("#work-title").innerHTML=t.workTitle;document.querySelector("#work-intro").textContent=t.workIntro;document.querySelector("#about-eyebrow").textContent=t.about;document.querySelector("#about-title").innerHTML=t.aboutTitle;document.querySelector("#skills-eyebrow").textContent=t.skills;document.querySelector("#skills-title").textContent=t.skillsTitle;document.querySelector("#education-eyebrow").textContent=t.education;document.querySelector("#education-title").innerHTML=t.educationTitle;document.querySelector("#contact-eyebrow").textContent=t.contact;document.querySelector("#contact-title").innerHTML=t.contactTitle;document.querySelector("#bio").textContent=lang==="fr"?"Je suis Othmane, designer UI/UX spécialisé dans la création d’interfaces modernes et intuitives pour le mobile et le web. Je combine parcours utilisateur, wireframes et systèmes visuels pour rendre les produits digitaux plus simples et agréables à utiliser.":data.bio;document.querySelector("#skills-list").innerHTML=(lang==="fr"?skillFrench:data.skills).map(skill=>`<article class="skill-row visible"><span>${skill[0]}</span><h3>${skill[1]}</h3><p>${skill[2]}</p></article>`).join("");document.querySelectorAll(".project").forEach(card=>{const title=card.querySelector("h3")?.textContent;if(!title)return;const original=data.projects.find(p=>p.title===title);const fr=projectFrench[title];card.querySelector(".project-info>div>p").textContent=lang==="fr"?fr[0]:original.type;card.querySelector(".project-description").textContent=lang==="fr"?fr[1]:original.description;card.querySelector(".case-link").textContent=lang==="fr"?"Voir le projet complet ↗":"View full project ↗";const badge=card.querySelector(".project-client");if(badge)badge.textContent=`${original.client} · ${lang==="fr"?"Étude de cas":"Full case study"}`;const cta=card.querySelector(".figma-link");if(cta)cta.textContent=lang==="fr"?"Voir le projet complet ↗":"View full project ↗";});document.querySelector("#language-toggle").textContent=lang==="fr"?"EN":"FR";localStorage.setItem("portfolio-language",lang);};
document.querySelector("#language-toggle").addEventListener("click",()=>{currentLanguage=currentLanguage==="en"?"fr":"en";applyLanguage(currentLanguage)});
const themeButton=document.querySelector("#theme-toggle");const applyTheme=theme=>{document.documentElement.dataset.theme=theme;themeButton.textContent=theme==="dark"?"☀":"☾";localStorage.setItem("portfolio-theme",theme)};themeButton.addEventListener("click",()=>applyTheme(document.documentElement.dataset.theme==="light"?"dark":"light"));applyTheme(localStorage.getItem("portfolio-theme")||"dark");applyLanguage(currentLanguage);
const applyEnsadLanguage=()=>{document.querySelector("#ensad-title").textContent=currentLanguage==="fr"?"Étudiant en Design Graphique & Interactif":"Graphic & Interactive Design Student";document.querySelector("#ensad-school").textContent="ENSAD Mohammedia · DGI"};document.querySelector("#language-toggle").addEventListener("click",applyEnsadLanguage);applyEnsadLanguage();
