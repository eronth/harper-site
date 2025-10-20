
type Props = {
  children?: React.ReactNode;
};

export default function MSqRt({ children }: Props) {
  return (<>
    {/* @ts-expect-error This exists. */}
    <msqrt>{children}</msqrt>
  </>);
}
