const Close = ({ ...restProps }: React.ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...restProps}
    >
      <path d="M4 4h2v2H4V4Zm14 0h2v2h-2V4ZM6 6h2v2H6V6Zm10 0h2v2h-2V6ZM8 8h2v2H8V8Zm6 0h2v2h-2V8ZM10 10h4v4h-4V10ZM8 14h2v2H8V14ZM14 14h2v2h-2V14ZM6 16h2v2H6V16ZM16 16h2v2h-2V16ZM4 18h2v2H4V18ZM18 18h2v2h-2V18Z" />
    </svg>
  );
};

export { Close };
