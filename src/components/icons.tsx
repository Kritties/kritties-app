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

  ConnectWallet: ({ className }: IconPropType) => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M24.0067 9.33285H28.0067C28.7431 9.33285 29.34 9.92979 29.34 10.6662V26.6662C29.34 27.4026 28.7431 27.9995 28.0067 27.9995H4.00667C3.2703 27.9995 2.67334 27.4026 2.67334 26.6662V5.33285C2.67334 4.59646 3.2703 3.99951 4.00667 3.99951H24.0067V9.33285ZM5.34001 11.9995V25.3329H26.6734V11.9995H5.34001ZM5.34001 6.66618V9.33285H21.34V6.66618H5.34001ZM20.0067 17.3329H24.0067V19.9995H20.0067V17.3329Z"
        fill="#33272A"
      />
    </svg>
  ),
};

export default Icons;
