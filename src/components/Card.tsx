interface CardProps {
  title: string
  imgUrl: string
  bodyText: string
  btnText: string
}
export default function Card({ title, imgUrl, bodyText, btnText }: CardProps) {
  return (
    <div className="card image-full col-span-1 bg-base-100 shadow-xl">
      <figure>
        {/* TODO: conver to next <Image/> */}
        <img src={imgUrl} alt={`${title} `} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{bodyText}</p>
        <div className="card-actions justify-end">
          <button className="btn-primary btn">{btnText}</button>
        </div>
      </div>
    </div>
  )
}
