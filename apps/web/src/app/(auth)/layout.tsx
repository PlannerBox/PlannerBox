import Logo from '../components/Logo';
import styles from './styles.module.scss';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <Logo className={styles.logo} />
      {children}
    </div>
  );
}
