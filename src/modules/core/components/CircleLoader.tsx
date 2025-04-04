import Lottie from "lottie-react"
import CircleLoadingAnimation from "@/assets/circle_progress_indicator.json"

interface CircleLoaderProps{
    width: number;
    height: number;
}

const CircleLaoder: React.FC <CircleLoaderProps> = ({
    width=150,
    height= 150,
})=>{
    return (
        <Lottie animationData={CircleLoadingAnimation} style={{ width: width, height: height }} />
    )
}
export default CircleLaoder;