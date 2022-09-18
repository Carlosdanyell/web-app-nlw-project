
interface gameBannerProps {
    bannerUrl: string,
    title: string,
    adsCount: number
}


export function GameBanner (props: gameBannerProps){
    return(
        <a href="" className='relative rounded-lg overflow-hidden'>
          
        <img src={props.bannerUrl} />

        <div className='w-full pt-16 pb-6 px-4 bg-game-gradiente absolute bottom-0 left-0 right-0'>
          <strong className=' font-bold text-white block'>{props.title}</strong>
          <span className='text-zinc-300 text-sm block'>{props.adsCount} anúncio(s)</span>
        </div>
      </a>
    )
}