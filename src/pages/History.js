import TimelineSymbol from '../Components/TimelineSymbol';

function History() {
  return (
    <div className="pt-20">
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        <li>
          <TimelineSymbol />
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">2019 April</time>
            <div className="text-lg font-black">Let the journey begin</div>
            We meet in Hamburg and became a couple.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <TimelineSymbol />
          <div className="timeline-end md:mb-10">
            <time className="font-mono italic">2021 September</time>
            <div className="text-lg font-black">New Family Member</div>
            We found on our roadtrip in croatia our new family member Jamie.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <TimelineSymbol />
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">2022 January</time>
            <div className="text-lg font-black">Lets go South</div>
            We moved from Hamburg to Stuttgart.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <TimelineSymbol />
          <div className="timeline-end md:mb-10">
            <time className="font-mono italic">2023 July</time>
            <div className="text-lg font-black">Prepare for climbing</div>
            We moved to Zurich and found pure nature.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <TimelineSymbol />
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">2024 December</time>
            <div className="text-lg font-black">Yes!</div>
            Michel finally proposed to Dani at Costa del Sol in El Salvador.
          </div>
        </li>
      </ul>
    </div>
  );
}

export default History;
