export default function InfoSection() {
    return (
      <>
        <section className="infoSection__container">
          <h2 className="infoSection__title">
            Por que escolher <span className="bold">PowerSpot?</span>
          </h2>
          <p className="info-section__text">
            PowerSpot é a plataforma definitiva para{" "}
            <span className="bold">encontrar estações de recarga</span> de veículos
            elétricos de forma <span className="bold">rápida, prática e confiável</span>.
            Nosso site é <span className="bold">100% interativo e dinâmico</span>,
            oferecendo <span className="bold">mapas atualizados em tempo real</span>,
            artigos informativos, dicas e recursos para motoristas elétricos.
          </p>
          <p className="info-section__text">
            Cada clique é pensado para <span className="bold">simplificar sua experiência</span>,
            conectando você aos pontos de recarga mais próximos, mostrando{" "}
            <span className="bold">informações detalhadas</span> de cada estação e permitindo explorar
            conteúdos adicionais com facilidade.
          </p>
          <p className="info-section__text">
            A interface é moderna e intuitiva,{" "}
            <span className="bold">adaptando-se perfeitamente a qualquer dispositivo</span>. PowerSpot
            não é apenas um site — é <span className="bold">uma experiência completa</span>, combinando{" "}
            <span className="bold">tecnologia de ponta, design interativo e informações confiáveis</span>,
            para que você tenha <span className="bold">controle total sobre sua jornada elétrica</span>.
          </p>
        </section>
  
        <section className="info-section__container secondary-section">
          <h2 className="info-section__title">
            Descubra mais sobre <span className="bold">PowerSpot</span>
          </h2>
          <p className="info-section__text">
            Explore nossos <span className="bold">artigos, guias e dicas</span> para aproveitar ao máximo sua
            experiência com veículos elétricos. Navegue pelo mapa interativo e descubra as estações
            mais próximas com apenas alguns cliques.
          </p>
        </section>
      </>
    );
  }