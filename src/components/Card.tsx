import { PropsWithChildren } from "react"
import { Bruno_Ace_SC } from "next/font/google"

const bruno = Bruno_Ace_SC({ subsets: ["latin"], weight: "400" })

interface CardProps {
  title: string
  imgUrl: string
  btnText: string
}
export default function Card({
  title,
  imgUrl,
  btnText,
  children,
}: PropsWithChildren<CardProps>) {
  return (
    <div className="card image-full col-span-12 max-h-[400px] bg-base-100 shadow-xl lg:col-span-4">
      <figure>
        {/* TODO: convert to next <Image/> */}
        <img className="w-full object-fill" src={imgUrl} alt={`${title} `} />
      </figure>
      {/* <div style={abel.style} className="card-body m-5 rounded bg-base-300/60"> */}
      <div className="card-body rounded bg-base-300/70">
        <h2
          style={bruno.style}
          className="bold card-title text-2xl sm:text-3xl"
        >
          {title}
        </h2>
        {children}
        <div className="card-actions justify-center">
          <button className="btn-primary btn">{btnText}</button>
        </div>
      </div>
    </div>
  )
}
