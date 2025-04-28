export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
      <main className="flex flex-col gap-[13px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <h1 className="text-center text-3xl font-semibold">
            Bem-Vindos, essa é a minha Pokédex!
          </h1>
        </div>
        <p>Está Pokédex foi desenvolvida utilizando React.</p>
      </main>
    </div>
  );
}
