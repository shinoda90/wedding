import TimelineSymbol from './TimelineSymbol';

export default function TimelineStep({ containerClass, time, step, descr }) {
  return (
    <li className="pb-5">
      <TimelineSymbol />
      <div className={containerClass}>
        <time className="font-mono italic">{time}</time>
        <div className="text-lg font-black">{step}</div>
        <i>{descr}</i>
      </div>
      <hr />
    </li>
  );
}
