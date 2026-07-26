"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const services = [
  {
    id: "estrategia",
    number: "01",
    icon: "↗",
    title: "Estratégia",
    line: "Direção antes da execução.",
    services: "Gestão de redes sociais · Planejamento de conteúdo · Consultoria de posicionamento · Análise de mercado · Calendário editorial",
    deliver: "Diagnóstico de marca, plano editorial, direcionamento de canais, métricas de evolução e rotina de conteúdo alinhada ao posicionamento.",
    ideal: "Empresas que precisam sair do improviso, organizar a comunicação e ocupar uma posição clara no mercado.",
  },
  {
    id: "design",
    number: "02",
    icon: "□",
    title: "Design",
    line: "Identidade que gera conexão.",
    services: "Identidade visual · Branding · Edição de vídeo · Peças para redes sociais · Manual de marca",
    deliver: "Sistema visual completo, aplicações de marca, conteúdo com consistência e materiais prontos para todos os pontos de contato.",
    ideal: "Negócios que querem elevar percepção, gerar confiança e construir autoridade visual no digital.",
  },
  {
    id: "tecnologia",
    number: "03",
    icon: "</>",
    title: "Tecnologia",
    line: "Soluções que geram escala.",
    services: "Sites de alta conversão · Automações · Integrações · Landing pages · Funis e CRM digital",
    deliver: "Experiências digitais rápidas, fluxos automatizados, integrações entre ferramentas e tecnologia conectada à operação comercial.",
    ideal: "Empresas que querem transformar presença digital em eficiência, escala e crescimento mensurável.",
  },
];

const cases = [
  { tag: "Tecnologia", size: "Médio", title: "Atlas Engenharia", problem: "Baixa geração de oportunidades", solution: "Novo site + automação comercial", result: "+184%", metric: "em leads qualificados", className: "case-atlas" },
  { tag: "Design", size: "Pequeno", title: "Casa Nativa", problem: "Marca sem diferenciação", solution: "Reposicionamento + identidade", result: "3,2×", metric: "mais interações orgânicas", className: "case-nativa" },
  { tag: "Estratégia", size: "Grande", title: "Norte Saúde", problem: "Comunicação fragmentada", solution: "Estratégia editorial integrada", result: "+67%", metric: "em alcance local", className: "case-norte" },
  { tag: "Tecnologia", size: "Pequeno", title: "Studio Uno", problem: "Atendimento manual", solution: "Landing page + automação", result: "−42%", metric: "no tempo de resposta", className: "case-uno" },
];

const steps = [
  ["01", "Diagnóstico", "Entendemos o negócio, o mercado e o ponto de partida."],
  ["02", "Estratégia", "Definimos direção, prioridades e indicadores de sucesso."],
  ["03", "Execução", "Design e tecnologia trabalham como uma única frente."],
  ["04", "Resultados", "Medimos, aprendemos e evoluímos o que gera impacto."],
];

export default function Home() {
  const [openService, setOpenService] = useState<string | null>(null);
  const [filter, setFilter] = useState("Todos");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".cursor-dot");
    if (!cursor) return;
    const move = (event: MouseEvent) => {
      cursor.style.setProperty("--x", `${event.clientX}px`);
      cursor.style.setProperty("--y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const visibleCases = useMemo(
    () => (filter === "Todos" ? cases : cases.filter((item) => item.tag === filter)),
    [filter],
  );

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <>
      <div className="cursor-dot" aria-hidden="true" />
      <header className="site-header">
        <div className="shell nav-wrap">
          <a className="brand" href="#inicio" aria-label="NUAR — início">
            <img className="brand-logo" src="/logo.png" alt="NUAR" width={200} height={68} />
          </a>
          <nav className="nav-links" aria-label="Navegação principal">
            <a href="#servicos">Serviços</a>
            <a href="#cases">Cases</a>
            <a href="#sobre">Sobre</a>
            <a className="nav-cta" href="#contato">Iniciar projeto <span>↗</span></a>
          </nav>
        </div>
      </header>

      <main id="inicio">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="orbit-field" aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
            <span className="satellite" /><span className="cross cross-one">+</span><span className="cross cross-two">+</span><span className="cross cross-three">+</span>
          </div>
          <div className="hero-content">
            <p className="eyebrow">Tecnologia. Design. Resultados.</p>
            <div className="hero-icon-wrap" aria-hidden="true">
              <img className="hero-icon" src="/hero-icon.png" alt="" width={448} height={304} />
            </div>
            <h1 id="hero-title">Transformamos negócios tradicionais em marcas digitais de <em>sucesso.</em></h1>
            <p className="hero-purpose">Ajudamos empresas a crescerem através de estratégia, design e tecnologia.</p>
            <div className="hero-actions">
              <a className="button button-light" href="#servicos">Ver serviços <span>↓</span></a>
              <a className="button button-glass" href="#contato">Falar com a gente <span>↗</span></a>
            </div>
          </div>
          <span className="scroll-note" aria-hidden="true">Explore</span>
        </section>

        <section className="trust-strip" aria-label="Posicionamento NUAR">
          <div className="shell trust-track">
            <span>Estratégia que direciona</span><i>✦</i><span>Design que posiciona</span><i>✦</i><span>Tecnologia que escala</span><i>✦</i><span>Resultados que permanecem</span>
          </div>
        </section>

        <section className="section services" id="servicos">
          <div className="shell">
            <div className="section-heading" data-reveal>
              <div><p className="kicker">Uma visão integrada</p><h2>Três pilares.<br />Um objetivo.</h2></div>
              <p>Direção estratégica, identidade que conecta e soluções que transformam crescimento em escala.</p>
            </div>
            <div className="services-grid">
              {services.map((service) => {
                const open = openService === service.id;
                return (
                  <article className={`service-card ${open ? "is-open" : ""}`} key={service.id}>
                    <button type="button" aria-expanded={open} onClick={() => setOpenService(open ? null : service.id)}>
                      <span className="service-number">{service.number} /</span><span className="service-icon" aria-hidden="true">{service.icon}</span>
                      <span className="service-title">{service.title}</span><span className="service-line">{service.line}</span>
                      <span className="service-list">{service.services}</span><span className="service-toggle">{open ? "−" : "+"}</span>
                    </button>
                    <div className="service-details" aria-hidden={!open}>
                      <div><small>O que entregamos</small><p>{service.deliver}</p></div>
                      <div><small>Pra quem é indicado</small><p>{service.ideal}</p></div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section statement" id="sobre">
          <div className="statement-orbit" aria-hidden="true" />
          <div className="shell statement-grid" data-reveal>
            <p className="vertical-label">O que nos torna diferentes</p>
            <div className="statement-copy">
              <p className="kicker">Mais que presença digital</p>
              <h2>Não somos uma agência<br />de posts. Somos uma estrutura<br />de <em>crescimento digital.</em></h2>
              <div className="statement-detail">
                <p>Na NUAR, tecnologia não é um serviço acessório. É um pilar formal, com o mesmo peso de estratégia e design.</p>
                <p>Conectamos posicionamento, identidade e automação para gerar autoridade, eficiência e resultado mensurável.</p>
              </div>
            </div>
            <div className="statement-seal" aria-label="Tecnologia como pilar central"><span>&lt;/&gt;</span><p>Tecnologia<br />como pilar<br />central</p></div>
          </div>
        </section>

        <section className="section portfolio" id="cases">
          <div className="shell">
            <div className="section-heading compact" data-reveal>
              <div><p className="kicker">Trabalho que prova</p><h2>Cases em destaque.</h2></div>
              <div className="filters" role="group" aria-label="Filtrar cases por pilar">
                {["Todos", "Estratégia", "Design", "Tecnologia"].map((item) => <button key={item} className={filter === item ? "active" : ""} aria-pressed={filter === item} onClick={() => setFilter(item)} type="button">{item}</button>)}
              </div>
            </div>
            <div className="case-grid">
              {visibleCases.map((item) => (
                <article className={`case-card ${item.className}`} key={item.title}>
                  <div className="case-top"><span>{item.tag}</span><span>{item.size}</span></div>
                  <div className="case-orbit" aria-hidden="true"><i /><b>{item.title.slice(0, 1)}</b></div>
                  <div className="case-copy"><p>{item.title}</p><strong>{item.result}</strong><small>{item.metric}</small></div>
                  <div className="case-hover"><small>Problema</small><p>{item.problem}</p><small>Solução</small><p>{item.solution}</p><span>Ver case completo ↗</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process" id="processo">
          <div className="shell">
            <div className="section-heading" data-reveal>
              <div><p className="kicker">Clareza em cada etapa</p><h2>Do diagnóstico<br />ao resultado.</h2></div>
              <p>Um processo enxuto, transparente e orientado por decisões que fazem o negócio avançar.</p>
            </div>
            <ol className="timeline">
              {steps.map(([num, title, body]) => <li key={num} data-reveal><span>{num}</span><i /><h3>{title}</h3><p>{body}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="section contact" id="contato">
          <div className="contact-glow" aria-hidden="true" />
          <div className="shell contact-grid">
            <div className="contact-copy" data-reveal>
              <p className="kicker">Seu próximo movimento</p>
              <h2>Mais clientes.<br />Mais autoridade.<br /><em>Mais crescimento.</em></h2>
              <p>Ajudamos empresas locais a gerar mais clientes através de posicionamento digital e tecnologia.</p>
              <div className="contact-meta"><span>Projetos em todo o Brasil</span><span>Resposta em até 1 dia útil</span></div>
            </div>
            <form className="contact-form" onSubmit={submitContact} data-reveal>
              <label>Seu nome<input required name="name" placeholder="Como podemos te chamar?" /></label>
              <label>E-mail corporativo<input required type="email" name="email" placeholder="voce@empresa.com" /></label>
              <label>O que sua empresa precisa?<select required name="interest" defaultValue=""><option value="" disabled>Selecione uma frente</option><option>Estratégia e posicionamento</option><option>Identidade e branding</option><option>Site e tecnologia</option><option>Automação</option><option>Projeto integrado</option></select></label>
              <label>Conte um pouco<textarea required name="message" rows={4} placeholder="Onde sua empresa está e onde quer chegar?" /></label>
              <button className="button button-light submit" type="submit">Enviar projeto <span>↗</span></button>
              <p className={`form-status ${sent ? "show" : ""}`} aria-live="polite">Recebido. Vamos conversar sobre o próximo passo.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-main">
          <div className="footer-brand">
            <a className="brand" href="#inicio" aria-label="NUAR — início">
              <img className="brand-logo footer-logo" src="/logo.png" alt="NUAR" width={200} height={68} />
            </a>
            <p className="footer-desc">
              Transformamos negócios tradicionais em marcas digitais de sucesso. Estratégia, design e tecnologia — no mesmo time.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Navegação do rodapé">
            <p className="footer-label">Navegação</p>
            <ul>
              <li><a href="#servicos">Pilares</a></li>
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#cases">Portfólio</a></li>
              <li><a href="#processo">Processo</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </nav>

          <div className="footer-social">
            <p className="footer-label">Social</p>
            <div className="footer-social-links">
              <a href="https://www.instagram.com/nuarstartup/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.5 8.5h3v9h-3v-9Zm1.5-4.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM10.5 8.5h2.9v1.2h.04c.4-.75 1.38-1.55 2.84-1.55 3.04 0 3.6 2 3.6 4.6v4.75h-3v-4.2c0-1-.02-2.3-1.4-2.3-1.44 0-1.66 1.12-1.66 2.28v4.22h-3v-9Z" />
                </svg>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=%2B5581981367877&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 20Zm4.4-5.6c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.8.9-.1.1-.3.2-.6.1-.2-.1-1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.7-.1-.2 0-.3.1-.5l.3-.4c.1-.1.1-.2.2-.3 0-.1 0-.2 0-.3 0-.1-.1-.3-.2-.5-.1-.2-.5-1.3-.7-1.8-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1 0 1.2.9 2.4 1 2.5.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1 0-.1-.2-.1-.4-.2Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="shell footer-bottom">
          <span>© 2026 NUAR. Todos os direitos reservados.</span>
          <span>Tecnologia · Design · Resultados</span>
        </div>
      </footer>
    </>
  );
}
