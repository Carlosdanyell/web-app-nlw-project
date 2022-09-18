import { FormEvent, useEffect, useState } from "react";
import axios from'axios'

import * as  Dialog from "@radix-ui/react-dialog";
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { GameController, Check, CaretDown, CaretUp } from "phosphor-react";

import { Input } from "../Form/Input";

interface Game {
    id: string,
    title: string,
  }
  

export function CreateAdForm() {

    const [ game , setGame ] = useState<Game[]>([]);
    const [ weekDays, setWeekDays ] = useState<string[]>([]);
    const [ useVoiceChannel, setUseVoiceChannel] = useState(false);
    const [ onValueChange, setOnValueChange ] = useState<string>();

    useEffect(() => {
        axios('http://localhost:3333/games/').then(response =>{
          setGame(response.data)
        })
      },[])

     async function handleCreateAd(event: FormEvent){
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data  = Object.fromEntries(formData)
       
        if(!data.name){
            return;
        }

        try {
            await axios.post(`http://localhost:3333/games/${onValueChange}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            });
            alert("Anúncio criado com sucesso!")
        } catch(err){
            console.log(err);
            alert("Erro ao criar seu anúncio")
        }

      }


  return (
    <Dialog.Portal>
    <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

    <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[520px] shadow-lg shadow-black/25'>
      <Dialog.Title className='text-3xl font-black'>
        Publique um Anúncio
      </Dialog.Title>

        <form 
        onSubmit={handleCreateAd}
        className='mt-8 flex flex-col gap-4 box-border'
        >

          <div className='flex flex-col gap-2'>
            <label htmlFor='game' className='font-semibold'>Qual o game?</label>
            <Select.Root 
            onValueChange={(valueChange) => {
                setOnValueChange(valueChange)
            }}>
                <Select.Trigger 
                name="game"
                className='flex justify-between bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500' 
                aria-label="games"
                >
                    <Select.Value placeholder="Selecione o game que deseja jogar">
                        
                    </Select.Value>
                    <Select.Icon>
                        <CaretDown className="w-6 h-6 text-zinc-400"/>
                    </Select.Icon>
                </Select.Trigger>

                <Select.Portal className="bg-zinc-900 rounded py-4 shadow-md shadow-zinc-800">
                    <Select.Content className="gap-1">
                        <Select.ScrollUpButton>
                            <CaretUp className="w-6 h-6 text-zinc-400"/>
                        </Select.ScrollUpButton>
                        <Select.Viewport>
                            <Select.Group className="text-zinc-400">
                                <Select.Label className="text-zinc-600 mx-2 px-2 my-2">
                                    Games
                                </Select.Label>
                                {game.map(game => {
                                    return(                         
                                        <Select.Item 
                                        key={game.id}
                                        value={game.id} 
                                        className="flex justify-between mx-2 my-1 px-2 rounded items-center hover:bg-zinc-200 hover:text-zinc-800 "
                                        >
                                            <Select.ItemText>
                                                {game.title}
                                            </Select.ItemText>
                                            <Select.ItemIndicator className="left-0 w-6 inline-flex ">
                                                <Check/>
                                            </Select.ItemIndicator>
                                        </Select.Item>          
                                    )
                                })}
  
                                
                                <Select.Item 
                                value="minecraft" 
                                className="flex justify-between mx-2 my-1 px-2 rounded items-center hover:bg-zinc-200 hover:text-zinc-800 "
                                >
                                    <Select.ItemText>
                                        Minecraft
                                    </Select.ItemText>
                                    <Select.ItemIndicator 
                                    className="left-0 w-6 inline-flex ">
                                        <Check/>
                                    </Select.ItemIndicator>
                                </Select.Item>

                            </Select.Group>
                        </Select.Viewport>
                        <Select.ScrollDownButton>
                        <CaretDown className="w-4 h-4 text-zinc-400"/>
                        </Select.ScrollDownButton>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='name'>Seu nome (ou nickname)</label>
            <Input name="name" id='name' placeholder='Como te chamam dentro do game?'></Input>
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
              <Input name="yearsPlaying" id='yearsPlaying' type='number' placeholder='Tudo bem ser ZERO'></Input>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='discord'>Qual seu discord?</label>
              <Input name="discord" id='discord' placeholder='Usuário#0000'></Input>
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='weekDays'>Quando costuma jogar?</label>
            
              <ToggleGroup.Root
              type='multiple' 
              className=' gap-1 grid grid-cols-4'
              value={weekDays}
              onValueChange={setWeekDays}
              >
                    <ToggleGroup.Item 
                    value="0"
                    title='Domingo'
                    className={`w-8 h-8 rounded px-1 py-1 ${weekDays.includes('0') ? 'bg-violet-500': 'bg-zinc-900'}`}
                    >
                        D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                    value="1"
                    title='Segunda'
                    className={`w-8 h-8 rounded px-1 py-1 ${weekDays.includes('1') ? 'bg-violet-500': 'bg-zinc-900'}`}
                    >
                        S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                    value="2"
                    title='Terça'
                    className={`w-8 h-8 rounded px-1 py-1 ${weekDays.includes('2') ? 'bg-violet-500': 'bg-zinc-900'}`}
                    >
                        T
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                    value="3"
                    title='Quarta'
                    className={`w-8 h-8 rounded px-1 py-1 ${weekDays.includes('3') ? 'bg-violet-500': 'bg-zinc-900'}`}
                    >
                        Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                    value="4"
                    title='Quinta'
                    className={`w-8 h-8 rounded px-1 py-1 ${weekDays.includes('4') ? 'bg-violet-500': 'bg-zinc-900'}`}
                    >
                        Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                    value="5"
                    title='Sexta'
                    className={`w-8 h-8 rounded px-1 py-1 ${weekDays.includes('5') ? 'bg-violet-500': 'bg-zinc-900'}`}
                    >
                        S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                    value="6"
                    title='Sábado'
                    className={`w-8 h-8 rounded px-1 py-1 ${weekDays.includes('6') ? 'bg-violet-500': 'bg-zinc-900'}`}
                    >
                        S
                    </ToggleGroup.Item>
                </ToggleGroup.Root>
            </div>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='hourStart'>Quando costuma jogar?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input name="hourStart" id='hourStart' type='time' placeholder='De'/>
                <Input name="hourEnd" id='hourEnd' type='time' placeholder='Até'/>
              </div>
            </div>
          </div>

          <label className='mt-2 flex gap-2 text-sm items-center'>
            <Checkbox.Root 
            onCheckedChange={(checked) =>{
                if(checked == true){
                    setUseVoiceChannel(true)
                }else{
                    setUseVoiceChannel(false)
                }
            }}
            className="w-6 h-6 bg-zinc-900 rounded"
            >
             <Checkbox.Indicator className="flex items-center justify-center">
               <Check className="w-4 h-4 text-emerald-400"/>
             </Checkbox.Indicator> 
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close 
            type='button'
            className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
              Cancelar
            </Dialog.Close>
            <button 
            type='submit' 
            className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex gap-1 items-center hover:bg-violet-600'
            >
              <GameController className='w-6 h-6'/>
              Encontrar duo
            </button>
          </footer>
        </form>
    </Dialog.Content>
    </Dialog.Portal>
  );
}