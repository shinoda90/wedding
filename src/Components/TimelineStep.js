export default function TimelineStep({
  containerClass,
  time,
  step,
  descr,
  Icon,
  isLast,
}) {
  return (
    <li className="timeline-item mt-4 mb-4">
      {/* Icon in der Mitte */}
      <div className="timeline-middle relative lg:mr-0 mr-2">
        <div className="bg-gray-200 p-2 rounded-full shadow-md -mt-4">
          <Icon className="w-8 h-8 text-secondary" />
        </div>

        {/* Linie unter dem Icon, nur wenn nicht letztes Element */}
        {!isLast && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-20 bg-secondary"></div>
        )}
      </div>

      {/* Texte links oder rechts */}
      <div className={`${containerClass} lg:mr-4 lg:ml-4`}>
        <time className="block font-tl-time mb-1">{time}</time>
        <div className="text-lg font-tl-title">{step}</div>
        <i className="font-tl-text">{descr}</i>
      </div>
    </li>
  )
}
