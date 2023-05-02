// Super expensive... will improve.
// TODO: Improve performance of starfield (read: canvas?)
interface StarfieldProps {
  numStars?: number
  minDuration?: number
  maxDuration?: number
  chanceAnimated?: number
}

export default function Starfield({
  numStars = 600,
  minDuration = 30,
  maxDuration = 120,
  chanceAnimated = 0.3,
}: StarfieldProps) {
  const maxShootingStarCount = 3
  let numShootingStars = 0

  return (
    <div className="starfield pointer-events-none absolute bottom-0 left-0 right-0 top-0 h-full overflow-hidden">
      {[...Array<number>(numStars)].map((s) => {
        const startPos = {
          x: Math.random() * 100,
          y: Math.random() * 100,
        }
        let animationDuration =
          Math.floor(Math.random() * maxDuration) + minDuration
        const isAnimated = Math.random() > chanceAnimated
        const isShootingStar =
          Math.random() > 0.1 && numShootingStars < maxShootingStarCount

        if (isShootingStar) {
          numShootingStars++
          animationDuration = 1
        }

        return (
          <div
            key={startPos.y + startPos.x + animationDuration}
            style={{
              top: `${startPos.x}%`,
              left: `${startPos.y}%`,
              animationDuration: `${animationDuration}s`,
            }}
            className={
              "pointer-events-none absolute h-0.5 w-0.5 rounded-full bg-white/60 shadow-2xl" +
              " " +
              (isAnimated && !isShootingStar ? "animated-star" : "") +
              " " +
              (isShootingStar ? "shooting-star" : "")
            }
          ></div>
        )
      })}
    </div>
  )
}
