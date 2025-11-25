
type Props = {
  css?: string;
  children?: React.ReactNode;
}

export default function WebTool({ css, children }: Props) {
  return (
  <div className={`tool-content ${css ?? ''}`}>
    {children}
  </div>
  );
}
