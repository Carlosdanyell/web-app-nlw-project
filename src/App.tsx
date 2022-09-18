import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import axios from'axios'

import logoImage from './assets/logo.svg'

import { GameBanner } from './components/GameBanner/GameBanner'
import { CreateAdBanner } from './components/CreatedAdBanner/CreateAdBanner'
import { CreateAdForm } from './components/createAdForm/CreateAdForm'

import './styles/main.css'


interface Game {
  id: string,
  bannerUrl: string,
  title: string,
  _count: {
    Ads: number
  }
}


function App() {

  const [game , setGame] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games/').then(response =>{
      setGame(response.data)
    })
  },[])


  return (  
    <div className='max-w-[1200px] mx-auto flex flex-col items-center my-20'>
    
      <img src={logoImage} />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradiente bg-clip-text'>duo</span> esta aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {game.map(game => {
          return(
              <GameBanner 
                key={game.id}
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.Ads}
              />
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdForm />
      </Dialog.Root>

    </div>
  )
}

export default App
