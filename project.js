const order = ["ServeFlow", "RiLyPark", "SportBooking", "Study Helper", "Playra", "Preciyus Mobile"];
const slugify = title => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const projects = order.map(title => window.PORTFOLIO.projects.find(project => project.title === title)).filter(Boolean).map((project,index) => ({...project,number:String(index+1).padStart(2,"0")}));
const slug = new URLSearchParams(location.search).get("project") || slugify(projects[0].title);
const project = projects.find(item => slugify(item.title) === slug);
const root = document.querySelector("#case-study");

const details = {
  "ServeFlow": {
    role: "Product Designer",
    challenge: "Restaurant teams switch between disconnected tools while orders, reservations, tables and staff activity change in real time.",
    approach: "I designed one operational system with clear navigation, consistent data patterns and focused workflows for every core restaurant task.",
    outcome: "A scalable dashboard experience that helps teams understand what needs attention and act without losing context."
  },
  "RiLyPark": {
    role: "UI/UX Designer",
    challenge: "Parking operators need to monitor occupancy, active sessions, revenue and facilities without navigating dense or fragmented interfaces.",
    approach: "I organized the platform around daily operational priorities, combining live metrics, floor maps, status systems and actionable tables.",
    outcome: "A dark, data-rich workspace where critical parking information stays readable and easy to manage."
  },
  "SportBooking": {
    role: "Product Designer",
    challenge: "Students need a simple way to understand field availability and complete a reservation without unnecessary steps.",
    approach: "I created a clear booking journey for students alongside dedicated authentication and management states for administrators.",
    outcome: "A responsive campus platform that makes sports facilities easier to discover, reserve and manage."
  },
  "Study Helper": {
    role: "UI/UX Designer",
    challenge: "Students often lose focus when study planning, progress tracking and learning tools live in separate experiences.",
    approach: "I brought the key study actions into a calm mobile system with visible progress, focused missions and a simple hierarchy.",
    outcome: "A supportive learning experience that keeps organization and motivation within reach."
  },
  "Playra": {
    role: "Product Designer",
    challenge: "Social party games need to feel immediate while still making rooms, invitations, players and settings easy to understand.",
    approach: "I built a bold game-first interface with short flows, vivid visual categories and clear multiplayer room states.",
    outcome: "A playful mobile experience that gets groups from invitation to game with minimal friction."
  },
  "Preciyus Mobile": {
    role: "UI/UX Design Intern",
    challenge: "Translate an existing web product into a compact mobile experience without losing its visual identity or core capabilities.",
    approach: "I reorganized the content and navigation around mobile priorities, then created a coherent 13-screen interface system.",
    outcome: "A focused mobile extension aligned with the Preciyus product and its users."
  }
};
const detailsFr={
  "ServeFlow":{description:"Une plateforme complète qui réunit commandes, cuisine, tables, réservations, personnel et analyses dans un espace unique.",role:"Product Designer",challenge:"Les équipes de restaurant passent d’un outil à l’autre alors que les commandes, réservations et tables évoluent en temps réel.",approach:"J’ai conçu un système opérationnel unique avec une navigation claire, des données cohérentes et des parcours centrés sur chaque tâche essentielle.",outcome:"Un tableau de bord évolutif qui aide les équipes à comprendre les priorités et agir sans perdre le contexte."},
  "RiLyPark":{description:"Un espace d’administration riche en données pour suivre les opérations, les places et l’activité quotidienne.",role:"Designer UI/UX",challenge:"Les opérateurs doivent surveiller l’occupation, les sessions, les revenus et les sites sans naviguer dans des interfaces fragmentées.",approach:"J’ai organisé la plateforme autour des priorités quotidiennes avec des métriques en direct, des plans et des tableaux exploitables.",outcome:"Un espace sombre et lisible où les informations critiques restent faciles à comprendre et à gérer."},
  "SportBooking":{description:"Une plateforme responsive pour découvrir et réserver des terrains, avec une gestion claire pour les administrateurs.",role:"Product Designer",challenge:"Les étudiants ont besoin d’un moyen simple de voir les disponibilités et réserver sans étapes inutiles.",approach:"J’ai créé un parcours de réservation clair pour les étudiants et des états dédiés à l’authentification et la gestion.",outcome:"Une plateforme campus qui facilite la découverte, la réservation et la gestion des installations sportives."},
  "Study Helper":{description:"Une expérience d’apprentissage qui aide les étudiants à planifier, progresser et accéder aux outils essentiels.",role:"Designer UI/UX",challenge:"Les étudiants perdent souvent leur concentration lorsque la planification et le suivi sont dispersés entre plusieurs outils.",approach:"J’ai réuni les actions principales dans un système mobile calme avec progression visible, missions ciblées et hiérarchie simple.",outcome:"Une expérience d’apprentissage motivante qui garde l’organisation et le progrès à portée de main."},
  "Playra":{description:"Une expérience multijoueur ludique pour créer des salons, inviter des amis et lancer rapidement des jeux sociaux.",role:"Product Designer",challenge:"Les jeux sociaux doivent être immédiats tout en gardant les salons, invitations et joueurs faciles à comprendre.",approach:"J’ai créé une interface vive avec des parcours courts, des catégories fortes et des états de salon clairs.",outcome:"Une expérience mobile qui fait passer un groupe de l’invitation au jeu avec un minimum de friction."},
  "Preciyus Mobile":{description:"Une extension mobile cohérente de Preciyus, adaptée depuis le web vers une interface compacte et intuitive.",role:"Stagiaire Designer UI/UX",challenge:"Adapter un produit web au mobile sans perdre son identité visuelle ni ses fonctionnalités essentielles.",approach:"J’ai réorganisé le contenu autour des priorités mobiles puis conçu un système cohérent de 13 écrans.",outcome:"Une extension mobile ciblée, alignée avec le produit Preciyus et ses utilisateurs."}
};

if (!project) {
  root.innerHTML = `<section class="missing"><p>Project not found.</p><a href="index.html#work">Return to selected work</a></section>`;
} else {
  const info = details[project.title];
  const images = project.gallery || (project.screens || []).map((source, index) => [`Screen ${index + 1}`, source]);
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  document.title = `${project.title} — Othmane Benlahbib`;
  root.innerHTML = `
    <section class="case-hero ${project.accent}">
      <div class="case-title">
        <p class="eyebrow">${project.number || ""} · ${project.type}</p>
        <h1>${project.title}</h1>
        <p class="lede">${project.description}</p>
        <div class="case-tags">${project.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
      </div>
      <dl class="case-meta">
        <div><dt>Client</dt><dd>${project.client}</dd></div>
        <div><dt>Year</dt><dd>${project.year}</dd></div>
        <div><dt>Role</dt><dd>${info.role}</dd></div>
      </dl>
    </section>
    <section class="case-story">
      <article><span>01</span><div><h2>Challenge</h2><p>${info.challenge}</p></div></article>
      <article><span>02</span><div><h2>Approach</h2><p>${info.approach}</p></div></article>
      <article><span>03</span><div><h2>Outcome</h2><p>${info.outcome}</p></div></article>
    </section>
    <section class="screens ${project.format === "desktop" ? "desktop-screens" : "mobile-screens"}">
      <div class="screens-head"><p class="eyebrow">SELECTED INTERFACES</p><h2>Designed screen by screen.</h2></div>
      ${images.length ? `<div class="screen-grid">${images.map(([label, source]) => `<figure class="${source.includes("landing-page") ? "tall-screen" : ""}"><img src="${source}" alt="${project.title} — ${label}" loading="lazy"><figcaption>${label}</figcaption></figure>`).join("")}</div>` : `<div class="screen-empty"><p>Additional project screens are available on request.</p></div>`}
    </section>
    <a class="next-case" href="project.html?project=${slugify(next.title)}"><span>Next project</span><strong>${next.title} ↗</strong></a>
    <footer><span>© ${new Date().getFullYear()} Othmane Benlahbib</span><a href="mailto:${window.PORTFOLIO.email}">${window.PORTFOLIO.email}</a></footer>`;
}

let caseLanguage=localStorage.getItem("portfolio-language")||"en";
const applyCaseLanguage=lang=>{document.documentElement.lang=lang;document.querySelector("#language-toggle").textContent=lang==="fr"?"EN":"FR";document.querySelector("#back-link").textContent=lang==="fr"?"← Tous les projets":"← All projects";if(project){const fr=detailsFr[project.title];const meta=document.querySelectorAll(".case-meta dt");["Client",lang==="fr"?"Année":"Year",lang==="fr"?"Rôle":"Role"].forEach((label,i)=>{if(meta[i])meta[i].textContent=label});document.querySelector(".lede").textContent=lang==="fr"?fr.description:project.description;const headings=document.querySelectorAll(".case-story h2");const paragraphs=document.querySelectorAll(".case-story p");const labels=lang==="fr"?["Problème","Approche","Résultat"]:["Challenge","Approach","Outcome"];const info=lang==="fr"?fr:details[project.title];[info.challenge,info.approach,info.outcome].forEach((value,i)=>{headings[i].textContent=labels[i];paragraphs[i].textContent=value});document.querySelector(".screens-head .eyebrow").textContent=lang==="fr"?"INTERFACES SÉLECTIONNÉES":"SELECTED INTERFACES";document.querySelector(".screens-head h2").textContent=lang==="fr"?"Conçu écran par écran.":"Designed screen by screen.";document.querySelector(".next-case span").textContent=lang==="fr"?"Projet suivant":"Next project";}localStorage.setItem("portfolio-language",lang)};
document.querySelector("#language-toggle").addEventListener("click",()=>{caseLanguage=caseLanguage==="en"?"fr":"en";applyCaseLanguage(caseLanguage)});
const caseThemeButton=document.querySelector("#theme-toggle");const applyCaseTheme=theme=>{document.documentElement.dataset.theme=theme;caseThemeButton.textContent=theme==="dark"?"☀":"☾";localStorage.setItem("portfolio-theme",theme)};caseThemeButton.addEventListener("click",()=>applyCaseTheme(document.documentElement.dataset.theme==="light"?"dark":"light"));applyCaseTheme(localStorage.getItem("portfolio-theme")||"dark");applyCaseLanguage(caseLanguage);
