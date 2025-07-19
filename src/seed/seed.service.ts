import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interfaces';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,
      ) {}

  async executeSeed() {

    await this.pokemonModel.deleteMany({});
    
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    // Opción 2
    // const insertPromisesArray = [];

    // Opción 3
    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(async({ name, url }) => {
    
      const segments = url.split('/');
      const no: number = +segments[ segments.length - 2 ];

      // Opción 1 No recomendada para bloques muy grandes
      /*
        try {
        const pokemon = await this.pokemonModel.create({ name, no });
        return pokemon;
      } catch (error) {
       console.log({ error })
      }
      */
      // Opción 2
      /*
      insertPromisesArray.push(
          this.pokemonModel.create({ name, no })
        );
      */

      // Opción 3
      pokemonToInsert.push({ name, no });

    });

    // Opción 2
      /*
    await Promise.all( insertPromisesArray );
    */

    // Opción 3
    await this.pokemonModel.insertMany(pokemonToInsert);

      return 'Seed Executed';
    }

}
