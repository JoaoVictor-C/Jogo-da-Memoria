export default function Header({timer, moves, startGame}) {
  return (
    <header>
        <h1>Jogo da memória - Pokémon</h1>
        <div className="header-info">
            <button onClick={() => {
                startGame()
            }}>
                <span>Novo jogo</span>
            </button>
             <p>
              {/* Se o tempo for menor que um minuto usa segundos caso contrário usa minutos */}
              Tempo: {timer < 60 ? `${timer}s` : `${Math.floor(timer / 60)}m ${timer % 60}s`}
             </p>
            <p>Movimentos: {moves}</p>
        </div>
    </header>
  )
}