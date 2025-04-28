"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import LoadingSpinner from "../components/LoadingSpinner";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonType {
  name: string;
  url: string;
}

export default function PokedexPage() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pokemonResponse, typesResponse] = await Promise.all([
          fetch("https://pokeapi.co/api/v2/pokemon?limit=151"),
          fetch("https://pokeapi.co/api/v2/type"),
        ]);

        const pokemonData = await pokemonResponse.json();
        const typesData = await typesResponse.json();

        setPokemonList(pokemonData.results);
        setAllPokemon(pokemonData.results);
        setTypes(typesData.results);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchPokemonByType() {
      if (selectedType === "") {
        setPokemonList(allPokemon);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/type/${selectedType}`
        );
        const data = await response.json();
        const pokemonsOfType: PokemonListItem[] = data.pokemon
          .map((p: any) => p.pokemon)
          .filter((p: PokemonListItem) => {
            // Filtra apenas os que estão entre os 151 primeiros
            const id = Number(p.url.split("/")[6]);
            return id <= 151;
          });

        setPokemonList(pokemonsOfType);
      } catch (error) {
        console.error("Erro ao buscar pokémons por tipo:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonByType();
  }, [selectedType, allPokemon]);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 p-8 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900">
      <h1 className="text-5xl font-bold text-center text-white mb-12">
        Pokédex
      </h1>

      {/* Busca e filtro */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md w-80 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 rounded-md w-80 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Todos os Tipos</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Grid de pokemons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredPokemon.map((pokemon, index) => {
          const id = Number(pokemon.url.split("/")[6]); // Pega ID real do Pokémon
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

          return (
            <Link key={pokemon.name} href={`/pokedex/${id}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 rounded-lg p-4 flex flex-col items-center shadow-lg hover:shadow-2xl transition dark:bg-gray-800/70"
              >
                <img
                  src={imageUrl}
                  alt={pokemon.name}
                  className="w-24 h-24 mb-4"
                />
                <h2 className="text-lg font-bold capitalize">{pokemon.name}</h2>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
