import './KarButton.css';

type KarButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  danger?: boolean;
  small?: boolean;
};

export default function KarButton({
  children,
  onClick,
  className = '',
  danger = false,
  small = false,
  ...rest
}: KarButtonProps) {
  const buttonClasses: (string | null)[] = [
    `kar-btn`, 
    danger ? 'kar-btn-danger' : null,
    small ? 'kar-btn-sm' : null,
    className
  ];
  return (
    <button
      className={buttonClasses.filter(Boolean).join(' ')}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
