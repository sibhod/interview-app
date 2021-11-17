import { CSSProperties } from 'react';

const DEFAULT_ICON_SIZE = 24;

interface Props {
  className?: string;
  size?: number;
  onClick?: () => void;
  style?: CSSProperties;
}

export const OpenSpaceLogo = ({
  className,
  size = DEFAULT_ICON_SIZE,
  onClick,
  style = { fill: 'currentColor' },
}: Props) => (
  <svg
    className={className}
    height={size}
    onClick={onClick}
    style={style}
    version="1.1"
    viewBox="0 0 16 16"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M5.62681458,4.34639906 C5.74924293,4.29096532 5.88782374,4.38102212 5.8876402,4.51564691 L5.87772845,11.257568 C5.8775449,11.395876 5.73180561,11.4853803 5.60901015,11.42258 L3.65437826,10.4781807 C3.59362296,10.4470567 3.55471021,10.3849931 3.5536089,10.3162994 L3.55783056,5.51345417 C3.55654571,5.43941975 3.59931304,5.37164693 3.66667616,5.34107551 L5.62681458,4.34639906 Z M7.21805239,6.17596037 L7.21805239,2.41520329 C7.21805239,2.28072628 7.08014897,2.19113626 6.95815749,2.24632518 L2.47080963,4.41561773 C2.40368689,4.44597164 2.36107216,4.51367004 2.36235243,4.58780716 L2.37515514,11.2051429 C2.37643541,11.2735771 2.41502642,11.3357566 2.47574782,11.3668463 L6.93566131,13.6157949 C7.05801859,13.6785264 7.20305493,13.5893042 7.20342072,13.451148 L7.21805239,6.17596037 Z M14.4636515,2.81624279 C14.925829,3.02301728 15.2237663,3.4842127 15.2237663,3.99323852 L15.2237663,11.7349564 C15.2237663,12.2235624 14.9488739,12.6702248 14.5139477,12.888037 L8.57166402,15.8649274 C8.19544741,16.0533057 7.75137647,16.0442914 7.38302438,15.8400925 L1.43799719,12.5482573 C1.02904223,12.3216147 0.775,11.8893015 0.775,11.4196438 L0.775,3.98293658 C0.775,3.4792457 1.06671876,3.02172954 1.52194635,2.81182767 L7.36436901,0.117136593 C7.69870248,-0.0368404987 8.08278361,-0.0392320186 8.41876315,0.111249774 L14.4636515,2.81624279 Z" />
    </g>
  </svg>
);
