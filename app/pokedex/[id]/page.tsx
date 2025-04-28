"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { motion } from "framer-motion";

interface PokemonDetails {
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export default function PokemonDetailPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!pokemon)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500">
        <h1 className="text-white text-3xl">Pokémon não encontrado!</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 p-8 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900">
      <Link
        href="/pokedex"
        className="text-white mb-8 inline-block text-lg hover:underline"
      >
        ← Voltar para a Pokédex
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white/90 rounded-lg shadow-2xl p-8 flex flex-col items-center dark:bg-gray-800/80"
      >
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-48 h-48 mb-6"
        />
        <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>

        <div className="flex gap-4 mb-6">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm capitalize dark:bg-blue-700"
            >
              {type.type.name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 w-full text-center text-lg">
          <div>
            <p className="text-gray-600 dark:text-gray-300">Altura</p>
            <p className="font-semibold">{pokemon.height / 10} m</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300">Peso</p>
            <p className="font-semibold">{pokemon.weight / 10} kg</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-600 dark:text-gray-300 mb-2">Habilidades</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {pokemon.abilities.map((ability) => (
                <span
                  key={ability.ability.name}
                  className="bg-green-400 px-3 py-1 rounded-full text-white text-sm capitalize dark:bg-green-600"
                >
                  {ability.ability.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
