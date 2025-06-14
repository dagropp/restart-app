import TimeDisplay, { CurrentTimeDisplay } from './TimeDisplay';

export const TimeDisplayList = () => {
  return (
    <div className="w-fit mx-auto grid grid-cols-[repeat(3,_auto)] gap-2">
      <CurrentTimeDisplay />
      <TimeDisplay hour={8} />
      <TimeDisplay hour={12} />
      <TimeDisplay hour={17} />
      <TimeDisplay hour={20} />
      <TimeDisplay hour={0} />
    </div>
  );
};
