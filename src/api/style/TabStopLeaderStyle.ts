export enum TabStopLeaderStyle {
  /** tab stop has no leader line */
  None = 'none',
  /** tab stop has a dashed leader line */
  Dash = 'dash',
  /** tab stop has a leader line whose repeating pattern is a dot followed by a dash */
  DotDash = 'dot-dash',
  /** tab stop has a leader line whose repeating pattern has two dots followed by a dash */
  DotDotDash = 'dot-dot-dash',
  /** tab stop has a dotted leader line */
  Dotted = 'dotted',
  /** tab stop has a dashed leader line whose dashes are longer than the ones from the dashed line for value dash */
  LongDash = 'long-dash',
  /** tab stop has a solid leader line */
  Solid = 'solid',
  /** tab stop has a wavy leader line */
  Wave = 'wave'
}
