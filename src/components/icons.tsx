type IconPropType = {
  className?: string;
};

const Icons = {
  NextIcon: ({ className }: IconPropType) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8 9L0 9L0 7L8 7L8 0L16 8L8 16L8 9Z" fill="#33272A" />
    </svg>
  ),
};

export default Icons;
