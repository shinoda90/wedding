import TimelineSymbol from './TimelineSymbol'

export default function TimelineStep({ containerClass, time, step, descr }) {
  return (
    <li className="pb-5">
      <TimelineSymbol />
      <div className={containerClass}>
        <time className="font-tl-time">{time}</time>
        <div className="text-lg font-tl-title">{step}</div>
        <i className="font-tl-text">{descr}</i>
      </div>
      <hr />
    </li>
  )
}
