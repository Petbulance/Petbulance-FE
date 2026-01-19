const SortDropdown = ({ color = 'currentColor' }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.25 13.75L12.1337 12.8663L14.375 15.1075V2.5H15.625V15.1075L17.8663 12.8663L18.75 13.75L15 17.5L11.25 13.75Z"
      fill={color}
    />
    <path d="M10 3.75H1.25V5H10V3.75Z" fill={color} />
    <path d="M10 7.5H3.75V8.75H10V7.5Z" fill={color} />
    <path d="M10 11.25H6.25V12.5H10V11.25Z" fill={color} />
  </svg>
);

export default SortDropdown;
