import { PropsWithChildren } from "react"

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
    <div className="card col-span-12 bg-base-100 shadow-xl sm:col-span-4">
      <figure>
        {/* TODO: conver to next <Image/> */}
        <img src={imgUrl} alt={`${title} `} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl uppercase">{title}</h2>
        {children}
        <div className="card-actions justify-center">
          <button className="btn-primary btn">{btnText}</button>
        </div>
      </div>
    </div>
  )
}
