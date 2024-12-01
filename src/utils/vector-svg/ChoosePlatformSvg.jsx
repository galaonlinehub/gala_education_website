import Image from "next/image";

const ChoosePlatformSvg = ()=>{
    return(
        <div className={'w-screen bg-green-300'}>
            <Image src={'/svg/choose-platform.svg'} width={1920} height={1080} alt={'choose platform1'} className={'sm:h-[34rem] h-[13rem] sm:w-[36rem] w-[15rem] object-cover absolute top-6 sm:top-12   left-4'} />
            <Image src={'/svg/choose-platform2.svg'} width={1920} height={1080} alt={'choose platform2'} className={'sm:h-[34rem] h-[13rem] sm:w-[36rem] w-[15rem] object-cover absolute   -bottom-24 sm:right-20 right-4'} />
        </div>
    )
}

export default ChoosePlatformSvg