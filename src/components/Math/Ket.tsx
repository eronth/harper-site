import MNum from "./MNum";
import MVar from "./MVar";

type Props = {
  children?: React.ReactNode;
  isVariable?: boolean;
};

export default function Ket({ children, isVariable }: Props) {
  return (<>
    |{
      isVariable
      ? <MVar>{children}</MVar>
      : <MNum>{children}</MNum>
    }⟩
  </>);
};
